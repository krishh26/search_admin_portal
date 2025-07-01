import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormdataService } from 'src/app/services/formdata.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
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
    this.formdataService.getCandidateSearchUser().subscribe((response) => {
      if (response?.success) {
        this.data = response?.data;
      } else {
        this.data = [];
      }
      this.getDataSupplier();
    });
  }

  getDataSupplier() {
    this.formdataService.getSupplierSearchUser().subscribe((response) => {
      if (response?.success) {
        const data = response?.data || [];
        data?.map((element : string) => {
          if(!this.data.find((ele) => ele == element)) {
            this.data.push(element);
          }
        })
      } else {
        this.data = [];
      }
    });
  }

  redirectToDetailsPage(id: string) {
    this.router.navigateByUrl(`/form/search/${id}`);
  }
}
