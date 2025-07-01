import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkawayComponent } from './workaway/workaway.component';
import { RouterModule, Routes } from '@angular/router';
import { E2eQaSeviceComponent } from './e2e-qa-sevice/e2e-qa-sevice.component';
import { E2eQaResourcesComponent } from './e2e-qa-resources/e2e-qa-resources.component';
import { ItSubcontractComponent } from './it-subcontract/it-subcontract.component';
import { ItSubcontractDeckComponent } from './it-subcontract-deck/it-subcontract-deck.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FormDetailsComponent } from './form-details/form-details.component';
import { SearchComponent } from './search/search.component';
import { UserSearchDetailsComponent } from './user-search-details/user-search-details.component';

const routes: Routes = [
  {
    path: "workaway",
    data: {
      title: "WorkAway Registration",
      urls: [{ title: "WorkAway Registration", url: "/form/workaway" }, { title: "WorkAway Registration" }],
    },
    component: WorkawayComponent,
  },
  {
    path: "e2e-qa-sevice",
    data: {
      title: "E2E QA Service",
      urls: [{ title: "E2E QA Service", url: "/form/e2e-qa-sevice" }, { title: "E2E QA Service" }],
    },
    component: E2eQaSeviceComponent,
  },
  {
    path: "e2e-qa-resources",
    data: {
      title: "E2E QA Resource",
      urls: [{ title: "E2E QA Resource", url: "/form/e2e-qa-resources" }, { title: "E2E QA Resource" }],
    },
    component: E2eQaResourcesComponent,
  },
  {
    path: "it-subcontract",
    data: {
      title: "IT SubContract",
      urls: [{ title: "IT SubContract", url: "/form/it-subcontract" }, { title: "IT SubContract" }],
    },
    component: ItSubcontractComponent,
  },
  {
    path: "it-subcontract-deck",
    data: {
      title: "IT SubContracting Deck",
      urls: [{ title: "IT SubContracting Deck", url: "/form/it-subcontract-deck" }, { title: "IT SubContracting Deck" }],
    },
    component: ItSubcontractDeckComponent,
  },
  {
    path: "contact-us",
    data: {
      title: "Contact Us",
      urls: [{ title: "Contact Us", url: "/form/contact-us" }, { title: "Contact Us" }],
    },
    component: ContactUsComponent,
  },
  {
    path: "search",
    data: {
      title: "Search",
      urls: [{ title: "Search", url: "/form/search" }, { title: "Search" }],
    },
    component: SearchComponent,
  },
  {
    path: "details/:id",
    component: FormDetailsComponent,
  },
  {
    path: "search/:id",
    component: UserSearchDetailsComponent,
  },
];


@NgModule({
  declarations: [
    WorkawayComponent,
    E2eQaSeviceComponent,
    E2eQaResourcesComponent,
    ItSubcontractComponent,
    ItSubcontractDeckComponent,
    ContactUsComponent,
    FormDetailsComponent,
    SearchComponent,
    UserSearchDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class FormdataModule { }
