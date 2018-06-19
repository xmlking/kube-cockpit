import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { EntityFormComponent } from '@kube-cockpit/shared';
import * as moment from 'moment';
import { V1Namespace } from '@kube-cockpit/k8s';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-namespace-edit',
  templateUrl: './namespace-edit.component.html',
  styleUrls: ['./namespace-edit.component.scss']
})
export class NamespaceEditComponent extends EntityFormComponent<V1Namespace> {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; payload: V1Namespace },
    public dialogRef: MatDialogRef<NamespaceEditComponent>,
    private fb: FormBuilder
  ) {
    super(data, dialogRef);
  }

  /* Optional */
  // tslint:disable-next-line
  ngOnInit() {
    super.ngOnInit();
  }

  buildForm(item: V1Namespace) {
    // this.entityForm = this.fb.group(item);
    this.entityForm = this.fb.group(
      {
        name: [item.metadata.name || '', Validators.required],
        cluster_name: [item.metadata.clusterName || '', Validators.required],
      },
      { updateOn: 'blur' }
    );
  }
}
