import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = 'http://localhost:3000/employe';
  constructor(private http:HttpClient) {}
   postdata(formData){
 
    return this.http.post<any>(this.url,formData);


    
   }
   deletedata(emailid){
    return this.http.delete(this.url + emailid)
   }
    updatedata(emailroute,formData){
      let append=emailroute
     return this.http.patch<any>(this.url+append,formData)
    }
    
   

}
