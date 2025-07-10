import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormdataService } from 'src/app/services/formdata.service';

@Component({
  selector: 'app-workaway',
  templateUrl: './workaway.component.html',
  styleUrls: ['./workaway.component.scss']
})
export class WorkawayComponent implements OnInit {
  data: any[] = [];
  selectedFormType: string = '';
  selectedStatus: string = 'new';

  constructor(
    private formdataService: FormdataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData(this.selectedFormType);
  }

  getData(formType: string) {
    this.data = [];
    // Add status filter to the existing API call
    const params: any = { formType };
    if (this.selectedStatus) {
      params.status = this.selectedStatus;
    }
    
    this.formdataService.getFormData(formType).subscribe((response) => {
      if (response?.status) {
        // Filter data by status if status is selected
        let filteredData = response?.data?.data;
        if (this.selectedStatus && this.selectedStatus !== '') {
          filteredData = filteredData.filter((item: any) => 
            item.status && item.status.toLowerCase() === this.selectedStatus.toLowerCase()
          );
        }
        this.data = filteredData || [];
      } else {
        this.data = [];
      }
    });
  }

  onFormTypeChange(formType: any) {
    this.getData(formType?.target.value);
  }

  onStatusTabChange(status: string) {
    this.selectedStatus = status;
    this.getData(this.selectedFormType);
  }

  redirectToDetailsPage(id: string) {
    this.router.navigateByUrl(`/form/details/${id}`);
  }
}
