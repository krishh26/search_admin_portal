import { Component } from '@angular/core';
import { FormdataService } from 'src/app/services/formdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-it-subcontract-deck',
  templateUrl: './it-subcontract-deck.component.html',
  styleUrls: ['./it-subcontract-deck.component.scss']
})
export class ItSubcontractDeckComponent {
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
    this.formdataService.getFormData('itSubcontractingDeckForm').subscribe((response) => {
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
