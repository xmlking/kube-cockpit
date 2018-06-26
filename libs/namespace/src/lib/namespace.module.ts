import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { SharedModule } from '@kube-cockpit/shared';
import { AppConfirmModule } from '@kube-cockpit/app-confirm';
import { DraggableModule } from '@kube-cockpit/draggable';
import { NgxPipesModule } from '@kube-cockpit/ngx-pipes';
import { NamespaceComponent } from './containers/namespace/namespace.component';
import { NamespaceDetailComponent } from './components/namespace-detail/namespace-detail.component';
import { NamespaceEditComponent } from './components/namespace-edit/namespace-edit.component';
import { NamespaceService } from './services/namespace.service';

@NgModule({
  imports: [
    SharedModule,
    DraggableModule,
    AppConfirmModule,
    NgxPipesModule,
    MomentModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
      { path: '', redirectTo: 'namespace', pathMatch: 'full', data: { animation: 'namespace' } },
      {
        path: 'namespace', component: NamespaceComponent, data: { animation: 'namespace', roles: ['ROLE_USER', 'ROLE_ADMIN'] },
        children: [
          { path: ':name', component: NamespaceDetailComponent, data: { animation: 'namespace-detail' } },
        ],
      },
    ]),
  ],
  declarations: [NamespaceComponent, NamespaceDetailComponent, NamespaceEditComponent],
  entryComponents: [NamespaceEditComponent],
  providers: [NamespaceService]
})
export class NamespaceModule {
}
