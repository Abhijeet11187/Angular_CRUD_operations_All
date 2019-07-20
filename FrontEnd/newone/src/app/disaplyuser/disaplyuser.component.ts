import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-disaplyuser',
  templateUrl: './disaplyuser.component.html',
  styleUrls: ['./disaplyuser.component.css']
})
export class DisaplyuserComponent implements OnInit {
  FormGroup="displayuser";
  public users=[];
  public id=1;
 
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
    let url="http://localhost:3000/employe";
    this.http.get(url).subscribe((data:any)=>{
      console.log(data);
      console.log(typeof(data));
      this.users=data;
    })
   
  }
  onclick(email){
    console.log(email);
    if (confirm("Delete Confirm ?")) {
      let url = 'http://localhost:3000/employe/';
      this.http.delete(url + email).subscribe(result => {
        console.log("User Deleted");
        this.ngOnInit();
      }, error => { console.log(error) })
      
    }
    else {
      this.ngOnInit();
    
    }
    
  }

  onUpdate(id){
       console.log(id);
   this.router.navigate(['/updateuser',id]);
  }
  routing(){
    this.router.navigate(['/createuser']);
  }


}
