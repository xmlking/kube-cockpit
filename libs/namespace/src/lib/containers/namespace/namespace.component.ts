import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import {NamespaceService} from '../../services/namespace.service';
import { V1Namespace, V1NamespaceList } from '@kube-cockpit/k8s';
import { EntitiesComponent, EntityColumnDef } from '@kube-cockpit/shared';
import { AppConfirmService } from '@kube-cockpit/app-confirm';
import { catchError, concatMap, filter, map, mergeMap, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as moment from 'moment';
import { List } from 'immutable';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { NamespaceEditComponent } from '../../components/namespace-edit/namespace-edit.component';

@Component({
  selector: 'ngx-namespace',
  templateUrl: '../../../../../shared/src/lib/containers/entity/entity.component.html',
  styleUrls: ['../../../../../shared/src/lib/containers/entity/entity.component.scss']
})
export class NamespaceComponent extends EntitiesComponent<V1Namespace, NamespaceService> {
  crumbs = List([
    { name: 'Dashboard', link: '/dashboard' },
    // { name: 'Namespace', link: '/dashboard/namespace' },
    { name: 'Namespace' }
  ]);

  readonly columns = [
    // prettier-ignore
    new EntityColumnDef<V1Namespace>({ property: 'uid',  header: 'No.',    displayFn: (entity) => `${entity.metadata.uid}` }),
    // prettier-ignore,
    new EntityColumnDef<V1Namespace>({ property: 'name', header: 'Name', displayFn: entity => `${entity.metadata.name}` }),
    // prettier-ignore,
    new EntityColumnDef<V1Namespace>({ property: 'resourceVersion', header: 'Version', displayFn: entity => `${entity.metadata.resourceVersion}` }),
    // prettier-ignore,
    new EntityColumnDef<V1Namespace>({ property: 'selfLink',    header: 'Link',   displayFn: (entity) => `${entity.metadata.selfLink} `, visible: false  }),
    // prettier-ignore
    new EntityColumnDef<V1Namespace>({ property: 'creationTimestamp',     header: 'Created At',    displayFn: (entity) => `${moment(entity.metadata.creationTimestamp).format('LL')}` }),
    // prettier-ignore,
    new EntityColumnDef<V1Namespace>({ property: 'status', header: 'Status', displayFn: entity => `${entity.status.phase}` })
  ] as EntityColumnDef<V1Namespace>[];

  // optional
  readonly showActionColumn = true;
  readonly showColumnFilter = true;
  readonly showToolbar = true;

  readonly formRef = NamespaceEditComponent;

  constructor(
    namespaceService: NamespaceService,
    private store: Store,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private confirmService: AppConfirmService
  ) {
    super(namespaceService);
  }

  // optional
  delete(item: V1Namespace) {
    return this.confirmService.confirm('Confirm', `Delete ${item.metadata.name} ?`).pipe(
      filter(confirmed => confirmed === true),
      mergeMap(_ => super.delete(item)),
      tap(_ => {
        this.snack.open('Namespace Deleted!', 'OK', { duration: 5000 })
        this.store.dispatch(new Navigate([`/dashboard/namespace`]));
      }),
      catchError(error => {
        this.snack.open(error, 'OK', { duration: 10000 });
        return throwError('Ignore Me!');
      })
    );
  }

  // required to override
  getNewEntity(): V1Namespace {
    const entity = new V1Namespace();
    return entity;
  }

  // optional
  showDetails(entity: V1Namespace) {
    if(entity) {
      this.store.dispatch(new Navigate([`/dashboard/k8s/namespace/${entity.id}`]));
    } else {
      this.store.dispatch(new Navigate(['/dashboard/k8s/namespace']));
    }
  }

  openPopUp(entity: V1Namespace) {
    let isNew = false;
    if (!entity) {
      isNew = true;
      entity = this.getNewEntity();
    }
    const title = isNew ? 'Add Namespace' : 'Update Namespace';

    const dialogRef = this.dialog.open(this.formRef, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: entity }
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(res => res !== false),
        // tap(res => console.log(res)),
        // map((res: V1Namespace) => {
        //   if (!isNew) res.id = entity.id;
        //   return res;
        // }),
        concatMap((res: V1Namespace) => super.updateOrCreate(res, isNew))
      )
      .subscribe(
        _ => {
          this.snack.open(isNew ? 'Namespace Created!' : 'Namespace Updated!', 'OK', { duration: 5000 });
          this.store.dispatch(new Navigate([`/dashboard/k8s/namespace`]))
        },
        error => this.snack.open(error, 'OK', { duration: 10000 })
      );
  }
}
