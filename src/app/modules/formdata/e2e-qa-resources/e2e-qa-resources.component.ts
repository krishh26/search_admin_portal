import { Component } from '@angular/core';
import { FormdataService } from 'src/app/services/formdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-e2e-qa-resources',
  templateUrl: './e2e-qa-resources.component.html',
  styleUrls: ['./e2e-qa-resources.component.scss']
})
export class E2eQaResourcesComponent {
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
    this.formdataService.getFormData('e2eQaResourceForm').subscribe((response) => {
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
