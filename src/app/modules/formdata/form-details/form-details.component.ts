import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormdataService } from '../../../services/formdata.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss']
})
export class FormDetailsComponent implements OnInit {
  formTypes = [
    { key: 'workAwayForm', label: 'Work Away Form' },
    { key: 'e2eQaResourceForm', label: 'E2E QA Resource Form' },
    { key: 'e2eQaServiceForm', label: 'E2E QA Service Form' },
    { key: 'itSubcontractForm', label: 'IT Subcontract Form' },
    { key: 'itSubcontractingDeckForm', label: 'IT Subcontracting Deck Form' },
    { key: 'contactUsForm', label: 'Contact Us Form' }
  ];
  openSection: string = 'workAwayForm';
  openSubmissions: { [key: string]: boolean } = {};
  submissionsByType: { [key: string]: any[] } = {};
  email: string = '';
  formData: any[] = [];
  
  // Comment form properties
  commentForm: FormGroup;
  isSubmitting: boolean = false;
  selectedSubmission: any = null;
  showCommentModal: boolean = false;

  constructor(
    private formdataService: FormdataService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      status: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.email = params['id'];
        this.loadFormType('workAwayForm');
      }
    });
  }

  loadFormType(formType: string) {
    if (!this.email) return;
    this.formData = [];
    const payload: any = { email: this.email, formType };
    this.formdataService.getFormDetailsByEmail(payload).subscribe({
      next: (data) => {
        this.submissionsByType[formType] = data?.data?.submissions || [];
        this.openSection = formType;
        
        // Initialize openSubmissions for this form type
        if (this.submissionsByType[formType].length > 0) {
          this.submissionsByType[formType].forEach((submission, index) => {
            const key = `${formType}_${index}`;
            this.openSubmissions[key] = false; // Initially closed
          });
        }
        
        // Load related data for each submission
        this.submissionsByType[formType].forEach((submission) => {
          if (submission?.anonymousUserId) {
            this.getSupplierData(submission.anonymousUserId);
          }
        });
      },
      error: (error) => {
        this.submissionsByType[formType] = [];
        this.openSection = formType;
        console.error('Error loading form data:', error);
      }
    });
  }

  toggleSubmission(formType: string, index: number) {
    const key = `${formType}_${index}`;
    this.openSubmissions[key] = !this.openSubmissions[key];
  }

  openAddCommentModal(submission: any) {
    this.selectedSubmission = submission;
    this.commentForm.reset();
    
    // Set current status as default
    if (submission.status) {
      this.commentForm.patchValue({
        status: submission.status
      });
    }
    
    this.showCommentModal = true;
  }

  closeModal() {
    this.showCommentModal = false;
    this.commentForm.reset();
    this.selectedSubmission = null;
    this.isSubmitting = false;
  }

  saveComment() {
    if (this.commentForm.valid && this.selectedSubmission) {
      this.isSubmitting = true;
      
      const payload = {
        status: this.commentForm.value.status,
        comment: this.commentForm.value.comment
      };

      // Call the API to update status
      this.formdataService.updateSubmissionStatus(this.selectedSubmission._id, payload).subscribe({
        next: (response: any) => {
          console.log('Status updated successfully:', response);
          
          // Refresh the current form type to show updated data
          this.loadFormType(this.openSection);
          
          // Close modal
          this.closeModal();
        },
        error: (error: any) => {
          console.error('Error updating status:', error);
          this.isSubmitting = false;
          // You can add error handling here (show toast, alert, etc.)
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'new':
        return 'status-new';
      case 'inprogress':
      case 'in_progress':
      case 'in progress':
        return 'status-progress';
      case 'converted':
        return 'status-converted';
      case 'dropped':
        return 'status-dropped';
      case 'completed':
      case 'done':
        return 'status-completed';
      case 'cancelled':
      case 'cancelled':
        return 'status-cancelled';
      case 'pending':
        return 'status-pending';
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-default';
    }
  }

  getSortedStatusHistory(statusHistory: any[]): any[] {
    if (!statusHistory || statusHistory.length === 0) {
      return [];
    }
    return [...statusHistory].sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return dateB - dateA; // Descending order (latest first)
    });
  }

  openInNewTab(url: string) {
    window.open(url, '_blank', 'noopener');
  }

  getSupplierData(id: string) {
    this.formdataService.getSupplierFilterList(id).subscribe({
      next: (data) => {
        if (data?.data?.length > 0) {
          data?.data?.map((element: any) => {
            this.formData.push({ ...element, type: 'IT Subcontracting' })
          })
        }
        this.getCandidateData(id);
      },
      error: (error) => {
        console.error('Error loading form data:', error);
      }
    });
  }

  getCandidateData(id: string) {
    this.formdataService.getCandidateFilters(id).subscribe({
      next: (data) => {
        if (data?.data?.length > 0) {
          data?.data?.map((element: any) => {
            this.formData.push({ ...element, type: 'WorkAway' })
          })
        }
      },
      error: (error) => {
        console.error('Error loading form data:', error);
      }
    });
  }
}
