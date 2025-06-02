import { Component } from '@angular/core';
import { FormdataService } from 'src/app/services/formdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-it-subcontract',
  templateUrl: './it-subcontract.component.html',
  styleUrls: ['./it-subcontract.component.scss']
})
export class ItSubcontractComponent {
  data: any[] = [];

  constructor(
    private formdataService: FormdataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.data = [];
    this.formdataService.getFormData('itSubcontractForm').subscribe((response) => {
      if (response?.status) {
        this.data = response?.data?.data;
      } else {
        this.data = [];
      }
    });
  }

  redirectToDetailsPage(id: string) {
    this.router.navigateByUrl(`/form/details/${id}`);
  }
}
