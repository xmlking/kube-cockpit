import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

import { NamespaceService } from '../../services/namespace.service';
import { V1Namespace } from '@kube-cockpit/k8s';
import { fadeAnimation } from '@kube-cockpit/animations';

@Component({
  selector: 'ngx-namespace-detail',
  templateUrl: './namespace-detail.component.html',
  styleUrls: ['./namespace-detail.component.scss'],
  animations: [fadeAnimation]
})
export class NamespaceDetailComponent implements OnInit, OnDestroy {
  namespace: V1Namespace;
  sub: Subscription;
  animationTrigger$ = new BehaviorSubject<string>('');

  constructor(private namespaceService: NamespaceService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.namespaceService.getById(params['name']).subscribe(data => {
        this.animationTrigger$.next(params['name']);
        this.namespace = data;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
