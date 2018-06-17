import { Component, OnInit } from '@angular/core';
import { Crumb } from '@kube-cockpit/breadcrumbs';
import { List } from 'immutable';

@Component({
  selector: 'ngx-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  crumbs: List<Crumb> = List([{ name: 'Dashboard', link: '/dashboard' }]);

  constructor() {}

  ngOnInit() {}
}
