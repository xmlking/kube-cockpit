import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@kube-cockpit/shared';

import { AuthGuard } from '@kube-cockpit/auth';
import { ChatBotModule } from '@kube-cockpit/chat-bot';

import { DashboardLayoutComponent } from './containers/dashboard-layout/dashboard-layout.component';
import { OverviewComponent } from './containers/overview/overview.component';
import { RainbowComponent } from './components/rainbow/rainbow.component';
import { QuickpanelModule } from '@kube-cockpit/quickpanel';
import { ToolbarModule } from '@kube-cockpit/toolbar';
import { SidenavModule } from '@kube-cockpit/sidenav';

@NgModule({
  imports: [
    SharedModule,
    SidenavModule,
    ToolbarModule,
    QuickpanelModule,
    ChatBotModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
      {
        path: '',
        component: DashboardLayoutComponent,
        canActivate: [AuthGuard],
        data: { animation: 'dashboard' },
        children: [
          {
            path: 'overview',
            component: OverviewComponent,
            data: { animation: 'overview' }
          },
          {
            path: '',
            loadChildren: '@kube-cockpit/widgets#WidgetsModule',
            data: { animation: 'overview' }
          },
          {
            path: 'grid',
            loadChildren: '@kube-cockpit/grid#GridModule',
            data: { animation: 'grid' }
          },
          {
            path: 'experiments',
            loadChildren: '@kube-cockpit/experiments#ExperimentsModule',
            data: { animation: 'experiments' }
          },
          {
            path: 'namespace',
            loadChildren: '@kube-cockpit/namespace#NamespaceModule',
            data: { animation: 'namespace' }
          }
        ]
      }
    ])
  ],
  declarations: [DashboardLayoutComponent, OverviewComponent, RainbowComponent]
})
export class DashboardModule {}
