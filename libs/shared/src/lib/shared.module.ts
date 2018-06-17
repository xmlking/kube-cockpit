import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@kube-cockpit/material';
import { MaterialDateModule } from '@kube-cockpit/material';
import { BreadcrumbsModule } from '@kube-cockpit/breadcrumbs';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MinValidatorDirective } from './directives/min/min.directive';
import { NgLetDirective } from './directives/ng-let.directive';

import {
  PerfectScrollbarModule,
  PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: true
};

const DIRECTIVES = [MinValidatorDirective, NgLetDirective];

@NgModule({
  imports: [
    CommonModule,
    // FIXME chatbot: input. depending  on https://github.com/angular/flex-layout/issues/778
    FlexLayoutModule.withConfig({ useColumnBasisZero: false })
  ],
  declarations: [...DIRECTIVES],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BreadcrumbsModule,
    MaterialModule,
    MaterialDateModule,
    PerfectScrollbarModule,
    ...DIRECTIVES
  ],
  providers: [{ provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }]
})
export class SharedModule {}
