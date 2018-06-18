import { Component, OnDestroy, OnInit } from '@angular/core';
import {Namespace} from '../../models/namespace.model';
import {NamespaceService} from '../../services/namespace.service';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-namespace-detail',
  templateUrl: './namespace-detail.component.html',
  styleUrls: ['./namespace-detail.component.scss'],
  providers: [NamespaceService]
})
export class NamespaceDetailComponent implements OnInit, OnDestroy {
  namespace: Namespace;
  sub: Subscription;

  constructor(private ns: NamespaceService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.ns.getNamespace(params['name']).subscribe(data => {
        this.namespace = data;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
