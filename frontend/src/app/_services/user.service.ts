import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dataUser = new BehaviorSubject<DataUser>(new DataUser());
  currentDataUser = this.dataUser.asObservable();

  constructor() {}

  changeDataUser(data: DataUser) {
    let user = this.dataUser.value;
    console.log('<----- Old data user----->', user);

    // user.push(data);
    console.log(user);

    this.dataUser.next(data);
  }


}
