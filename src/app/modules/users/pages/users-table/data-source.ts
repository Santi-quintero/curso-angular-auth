import { DataSource } from '@angular/cdk/collections';
import { Users } from '@models/users';
import { BehaviorSubject, Observable } from 'rxjs';

export class DataSourceUser extends DataSource<Users> {

  data = new BehaviorSubject<Users[]>([]);
  originalData: any[]= [];

  connect(): Observable<Users[]> {
    return this.data;
  }

  init(data: Users[]) {
    this.originalData = data;
    this.data.next(data);
  }

  disconnect() { }

}
