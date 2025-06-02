import { Component } from '@angular/core';
import { FormdataService } from 'src/app/services/formdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
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
    this.formdataService.getFormData('contactUsForm').subscribe((response) => {
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
