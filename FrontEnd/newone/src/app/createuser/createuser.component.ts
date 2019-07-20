import { Component, OnInit } from '@angular/core';
//import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
  regform: FormGroup;
  temp=false;
  // URL:"http://localhost:3000/employe";
  // public uploader:FileUploader = new FileUploader({url: URL});
  checkcounthobbies=0;
  err=false;
  imgpath:any="/assets/emptyImage.jpeg";
  imgcheck=true;
  countryList: Array<any> = [
    { name: 'Maharashtra', cities: ['Pune', 'Nashik', 'Solapur', 'Jalgaon', 'Amravati', 'Akola', 'Latur', 'Dhule', 'Parbhani', 'Ahmadnagar', 'Jalna'] },
    { name: 'Hariyana', cities: ['Panipat', 'Ambala', 'Rohtak', 'Sonipat', 'Hisar', 'Palwai', 'Kosli', 'Thanesar', 'Sirsa'] }
  ];
  cities: Array<any>;
  changecountrycount(count) {
    this.cities = this.countryList.find(con => con.name == count).cities;
  }

  //-----------------------------File--Uploading---------------------------------------

  onFleLoad(event){
    if(event.target.files.length>0)
    {
      const img=event.target.files[0];
      this.regform.patchValue({profpic:img});
      this.imgcheck=false;
      if(event.target.files && event.target.files[0]){
        var reader=new FileReader;
        reader.readAsDataURL(event.target.files[0]);
        reader.onload=(event)=>{
          this.imgpath=reader.result;
        } 
      }

    }
    console.log(this.regform.get('profpic').value)
  }
// selectedFile:File= null;
// addfile(e){
// this.selectedFile =<File>e.target.files[0];
// }
// uploadImage(){

//   const httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json'
//     })
//   }
//   const url="http://localhost:3000/employee"
//   const fd=new FormData();
//   fd.append('image',this.selectedFile,this.selectedFile.name,);
//   this.http.post(url,fd).subscribe(event=>{console.log(event)});
// }
  //----------------------------------------------------------------------------------


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,private httpservice:HttpService) {}

  ngOnInit() {
    
      


    this.regform = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      gender: ['Male', Validators.required],
      email: ['', [Validators.required,Validators.pattern(this.emailRegex)]],
      qualification: ['',Validators.required],
      hobbies: [''],
      address: ['',Validators.required],
      calnder:['',Validators.required],
      setage:[''],
      profpic:['',Validators.required],
      state: ['',Validators.required],
      city: ['',Validators.required],
      pin: ['',[Validators.required, Validators.min(111111), Validators.max(999999),Validators.nullValidator]],
      isSinging: [''],
      isReading: [''],
      isTravelling: [''],
      isCooking: [''],
      isDancing: [''],
      isSwimming: [''],
      contact:['',[Validators.required,Validators.min(1111111111),Validators.max(9999999999),Validators.minLength(10)]]


    });

  }
 
  onExit(){
    this.router.navigate(['/displayuser']);
  }
  setage(e){
   this.temp=false;
    let age=e.split('-');
     let d=new Date().getFullYear();
    this.regform.patchValue({setage:d-age[0]});
    if((d-age[0])<0){this.temp=true}
  }
  onclick() {
   
    const hobbies = [];
    let uservalue = this.regform.value;
    console.log(this.regform.value);
    if (uservalue.isSinging == true) {
      hobbies.push('singing');
    }
    if (uservalue.isReading == true) {
      hobbies.push('reading');
    }
    if (uservalue.isTravelling == true) {
      hobbies.push('travelling');
    }
    if (uservalue.isCooking == true) {
      hobbies.push('cooking');
    }
    if (uservalue.isDancing == true) {
      hobbies.push('dancing');
    }
    if (uservalue.isSwimming == true) {
      hobbies.push('swimming');
    }///

    if (hobbies.length < 2) {
      alert("At least two Hobbies are required");
    }
    //console.log(hobbies);
    // else {
    let url = 'http://localhost:3000/employe';
    //   let data = {
    //     fname: this.regform.get("fname").value,
    //     lname: this.regform.get("lname").value,
    //     gender: this.regform.get("gender").value,
    //     email: this.regform.get("email").value,
    //     calnder:this.regform.get("calnder").value,
    //     qualification: this.regform.get("qualification").value,
    //     hobbies: hobbies,
    //     address: this.regform.get("address").value,
    //     state: this.regform.get("state").value,
    //     city: this.regform.get("city").value,
    //     pin: this.regform.get("pin").value,
    //     contact:this.regform.get("contact").value
      


    //   }
    //   if (data.fname == '' || data.lname == '' || data.gender == '' || data.email == '') {
    //     alert("Please enter all fields");
    //   }
    //   else {

        
    //     console.log(this.dt-age[0]);
    //    let dat = JSON.stringify(data);
    //    console.log(dat);
    //     const httpOptions = {
    //       headers: new HttpHeaders({
    //         'Content-Type': 'application/json',

    //       })

    //     }
    //     this.http.post<any>(url, dat, httpOptions).subscribe(data => {
    //       console.log("User Created");
    //       this.router.navigate(['/displayuser'])
    //     }
    //       , error => { console.log(error) });

    //    }


    // }

    const formData = new FormData();
    formData.append('fname', this.regform.get("fname").value);
    formData.append('lname', this.regform.get("lname").value);
    formData.append('gender', this.regform.get("gender").value);
    formData.append( 'profpic', this.regform.get('profpic').value,(this.regform.get('profpic').value).name);
    formData.append('email', this.regform.get("email").value);
    formData.append('calnder', this.regform.get("calnder").value);
    formData.append('qualification', this.regform.get("qualification").value);
    formData.append('address', this.regform.get("address").value);
    formData.append('state', this.regform.get("state").value);
    formData.append('city', this.regform.get("city").value);
    formData.append('pin', this.regform.get("pin").value);
    formData.append('contact', this.regform.get("contact").value);
    for (var i = 0; i < hobbies.length; i++) {
      formData.append('hobbies[]', hobbies[i]);
  }
    //formData.append('hobbies',this.hobbies);
    
    this.httpservice.postdata(formData).subscribe((res)=>{
      console.log(res),this.router.navigate(['/displayuser']);},(err)=>console.log(err));

    






  }
}
