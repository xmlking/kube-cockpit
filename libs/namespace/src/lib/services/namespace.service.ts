import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { V1Namespace, V1NamespaceList }   from '@kube-cockpit/k8s';
import { Subject } from 'rxjs/Subject';
import { environment } from '@env/environment';
import { EntityService } from '@kube-cockpit/shared';
import { map, catchError, finalize, retry, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class NamespaceService extends EntityService<V1Namespace> {
  public baseUrl = environment.K8S_API_BASE_URL;
  globalNamespace = 'all';
  readonly entityPath = 'api/v1/namespaces';
  namespace: Subject<string> = new Subject<string>();
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getAll(): Observable<V1Namespace[]> {
    this.loadingSubject.next(true);
    return this.httpClient.get<V1NamespaceList>(`${this.baseUrl}/${this.entityPath}`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false)),
      map(data => data.items.map(v => new V1Namespace(v)))
    );
  }

  delete(id: number | string) {
    console.log('dont be evil yet...');
    return  of('Ok').pipe(
      delay(2000)
    )
  }
}
