import { Component, OnInit } from '@angular/core';
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
  submissionsByType: { [key: string]: any[] } = {};
  email: string = '';
  formData: any[] = [];

  constructor(
    private formdataService: FormdataService,
    private route: ActivatedRoute
  ) { }

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
        data?.data?.submissions?.map((element: any) => {
          if (element?.anonymousUserId) {
            this.getSupplierData(element?.anonymousUserId);
          }
        })
      },
      error: (error) => {
        this.submissionsByType[formType] = [];
        this.openSection = formType;
        console.error('Error loading form data:', error);
      }
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
