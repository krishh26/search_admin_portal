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

  constructor(
    private formdataService: FormdataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.data = [];
    this.formdataService.getFormData('workAwayForm').subscribe((response) => {
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
