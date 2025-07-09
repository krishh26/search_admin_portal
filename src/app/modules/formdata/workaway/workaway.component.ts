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

  constructor(
    private formdataService: FormdataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData(this.selectedFormType);
  }

  getData(formType: string) {
    this.data = [];
    this.formdataService.getFormData(formType).subscribe((response) => {
      if (response?.status) {
        this.data = response?.data?.data;
      } else {
        this.data = [];
      }
    });
  }

  onFormTypeChange(formType: any) {
    this.getData(formType?.target.value);
  }

  redirectToDetailsPage(id: string) {
    this.router.navigateByUrl(`/form/details/${id}`);
  }
}
