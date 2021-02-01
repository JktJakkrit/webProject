import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  public loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  showLoader(value: boolean) {
      this.loader.next(value);
  }

  setExpandDiv(id) {
      document.getElementById(id).setAttribute("class", "collapse show");
      document.getElementById(id).previousElementSibling.setAttribute("aria-expanded", "true");
  }

  getDropDownText(id, object){
    const selObj = _.filter(object, function (o) {
        return (_.includes(id,o.id));
    });
    return selObj;
  }

}