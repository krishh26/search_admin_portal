import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormdataService } from 'src/app/services/formdata.service';

@Component({
  selector: 'app-user-search-details',
  templateUrl: './user-search-details.component.html',
  styleUrls: ['./user-search-details.component.scss']
})
export class UserSearchDetailsComponent {
  formData: any;

  constructor(
    private formdataService: FormdataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.getSupplierData(params['id']);
      }
    });
  }

  getSupplierData(id: string) {
    this.formData = [];
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
        console.log("this.formData", this.formData);
      },
      error: (error) => {
        console.error('Error loading form data:', error);
      }
    });
  }

}
