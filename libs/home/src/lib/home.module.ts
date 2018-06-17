import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@kube-cockpit/shared';
import { ThemePickerModule } from '@kube-cockpit/theme-picker';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeLayoutComponent } from './containers/home-layout/home-layout.component';
import { LandingComponent } from './containers/landing/landing.component';
import { BlogComponent } from './containers/blog/blog.component';
import { AboutComponent } from './containers/about/about.component';
import { ScrollToTopModule } from '@kube-cockpit/scroll-to-top';
import { SvgViewerModule } from '@kube-cockpit/svg-viewer';
import { FeaturesComponent } from './containers/features/features.component';

@NgModule({
  imports: [
    SharedModule,
    ScrollToTopModule,
    ThemePickerModule,
    SvgViewerModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
      {
        path: '',
        component: HomeLayoutComponent,
        data: { animation: 'home' },
        children: [
          {
            path: '',
            component: LandingComponent,
            data: { animation: 'home' }
          },
          {
            path: 'blog',
            component: BlogComponent,
            data: { animation: 'blog' }
          },
          {
            path: 'about',
            component: AboutComponent,
            data: { animation: 'about' }
          },
          {
            path: 'features',
            component: FeaturesComponent,
            data: { animation: 'features' }
          }
        ]
      }
    ])
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeLayoutComponent,
    LandingComponent,
    BlogComponent,
    AboutComponent,
    FeaturesComponent
  ]
})
export class HomeModule {}
