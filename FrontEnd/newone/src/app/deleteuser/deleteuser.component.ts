import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent implements OnInit {
  deleteuser: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient,private httpservice:HttpService) { }

  ngOnInit() {
    this.deleteuser = this.fb.group({
      email: ['', Validators.required]
    });
  }
  onClick() {
    const emailid = this.deleteuser.get("email").value;
    console.log(emailid);

    if (emailid=='') {
      alert("Please Enter Valid Email")
    }
    else {
     // let url = 'http://localhost:3000/employe/';
      this.httpservice.deletedata(emailid).subscribe(result => {
        console.log("User Deleted");
      }, error => { console.log(error) })
    }
  }
}


