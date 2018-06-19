import { Component, OnDestroy, OnInit } from '@angular/core';
import { NamespaceService } from '../../services/namespace.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { V1Namespace } from '@kube-cockpit/k8s';

@Component({
  selector: 'ngx-namespace-detail',
  templateUrl: './namespace-detail.component.html',
  styleUrls: ['./namespace-detail.component.scss']
})
export class NamespaceDetailComponent implements OnInit, OnDestroy {
  namespace: V1Namespace;
  sub: Subscription;

  constructor(private namespaceService: NamespaceService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.namespaceService.getById(params['name']).subscribe(data => {
        this.namespace = data;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
