import { Component, OnInit } from '@angular/core';
import { FormdataService } from '../../../services/formdata.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss']
})
export class FormDetailsComponent implements OnInit {
  formData: any;

  constructor(
    private formdataService: FormdataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.getData(params['id']);
      }
    });
  }

  getData(id: string) {
    this.formdataService.getFormDetails(id).subscribe({
      next: (data) => {
        this.formData = data?.data;
      },
      error: (error) => {
        console.error('Error loading form data:', error);
      }
    });
  }
}
