import { Component } from '@angular/core';
import { FormdataService } from 'src/app/services/formdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-e2e-qa-sevice',
  templateUrl: './e2e-qa-sevice.component.html',
  styleUrls: ['./e2e-qa-sevice.component.scss']
})
export class E2eQaSeviceComponent {
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
    this.formdataService.getFormData('e2eQaServiceForm').subscribe((response) => {
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
