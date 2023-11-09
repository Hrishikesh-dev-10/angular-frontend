import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cookie {

  constructor() { }

  async getCookies(name:any){
    let cookie:any = {};
    document.cookie.split(';').forEach(function(el) {
      let [k,v] = el.split('=');
      cookie[k.trim()] = v;
    })
    return cookie[name];
  }

}
