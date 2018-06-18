import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@kube-cockpit/shared';
import { NamespaceComponent } from './containers/namespace/namespace.component';
import { NamespaceDetailComponent } from './components/namespace-detail/namespace-detail.component';

@NgModule({
  imports: [
    SharedModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
      {
        path: '', component: NamespaceComponent, data: { animation: 'namespace' },
        children: [
          { path: ':name', component: NamespaceDetailComponent },
        ],
      },
      //
      // { path: ':name', component: NamespaceDetailComponent, data: { animation: 'namespace-detail' } },
    ]),
  ],
  declarations: [NamespaceComponent, NamespaceDetailComponent],
})
export class NamespaceModule {
}
