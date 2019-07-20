import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  updateuser: FormGroup;
  updateForm: FormGroup;
  users;
  imgcheck=false;
  flag=false;
  emailroute;
  imgpath;
  updateemail;
  countryList: Array<any> = [
    { name: 'Maharashtra', cities: ['Pune', 'Nashik', 'Solapur', 'Jalgaon', 'Amravati', 'Akola', 'Latur', 'Dhule', 'Parbhani', 'Ahmadnagar', 'Jalna'] },
    { name: 'Hariyana', cities: ['Panipat', 'Ambala', 'Rohtak', 'Sonipat', 'Hisar', 'Palwai', 'Kosli', 'Thanesar', 'Sirsa'] }
  ];
  cities: Array<any>;
  changecountrycount(count) {
    this.cities = this.countryList.find(con => con.name == count).cities;
    this.updateForm.patchValue({city:''})
  }
//=====================================--------------=======================================


onFleLoad(event){
  if(event.target.files.length>0)
  {
    const img=event.target.files[0];
    this.updateForm.patchValue({profpic:img});
    this.imgcheck=true;
    if(event.target.files && event.target.files[0]){
      var reader=new FileReader;
      this.flag=true 
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event)=>{
        this.imgpath=reader.result;
      } 
    }

  }
  console.log(this.updateForm.get('profpic').value)
}


//------------------------------------------------------------------


  constructor(private fb: FormBuilder, private http: HttpClient, private activater: ActivatedRoute, private route: Router,private httpservice:HttpService) { }

  ngOnInit() {

    this.emailroute = this.activater.snapshot.paramMap.get('id');
    console.log(this.emailroute);
    this.updateForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      gender: ['', Validators.required],
      qualification: ['',Validators.required],
      nemail: ['', Validators.required],
      hobby: [''],
      isSinging: [''],
      isReading: [''],
      isTravelling: [''],
      isCooking: [''],
      isDancing: [''],
      isSwimming: [''],
      address: ['',Validators.required],
      state: ['',Validators.required],
      city: ['',Validators.required],
      pin: ['',Validators.required],
      contact:['',Validators.required],
      profpic:[''],
    })

    let urll = "http://localhost:3000/employe/";
    
    this.http.get((urll + this.emailroute)).subscribe((data: any) => {
      //console.log(data);
      //console.log(typeof(data));
      this.users = data;
      let sing, cook, dance, swim, read, travel;
      let length = this.users.hobbies.length;
      console.log(this.users.hobbies.length);
      console.log(this.users.profpic);
      this.imgpath="http://localhost:3000/"+this.users.profpic;
      console.log(this.imgpath);
      console.log("actual Path");
      console.log("/home/am-n4/CRUDoperations/ServerFolder/upload/2019-07-08T04:36:55.254ZIMG_20190704_161922.jpg")
      while (length >= 0) {
        let temp = this.users.hobbies[length];
        if (temp == 'singing') {
          if (sing == true) { }
          else { sing = true };
        }
        if (temp == 'cooking') {
          if (cook == true) { }
          else { cook = true };
        }
        if (temp == 'dancing') {
          if (dance == true) { }
          else { dance = true };
        }
        if (temp == 'swimming') {
          if (swim == true) { }
          else { swim = true };
        }
        if (temp == 'reading') {
          if (read == true) { }
          else { read = true };
        }
        if (temp == 'travelling') {
          if (travel == true) { }
          else { travel = true };
        }
        length--;
      }
      // this.updateForm.setValue
      // this.updateForm.setValue({
      //     city:this.users.city,
      // })
      //this.imgpath="http://localhost:3000/employe/"+this.updateForm.profpic;
      this.changecountrycount(this.users.state);
      this.updateForm.patchValue({
        fname: this.users.fname,
        lname: this.users.lname,
        gender: this.users.gender,
        nemail: this.users.email,
        address: this.users.address,
        state: this.users.state,
        city: this.users.city,
        qualification: this.users.qualification,
        pin: this.users.pin,
        contact:this.users.contact,
        profpic:this.users.profpic,
        isSinging: sing,
        isReading: read,
        isTravelling: travel,
        isCooking: cook,
        isDancing: dance,
        isSwimming: swim

      })

    })
  }



  updatefunction() {
   // console.log("updateFunction");
    let url = 'http://localhost:3000/employe/';

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'

    //   })
    // }
    const hobbies = [];
    let uservalue = this.updateForm.value;
    console.log(this.updateForm.value);
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
    }
    if (hobbies.length < 2) {
      alert("At least two Hobbies are required");
      
    } else {
      // let data = [
      //   { propName: "fname", value: this.updateForm.get("fname").value },
      //   { propName: "lname", value: this.updateForm.get("lname").value },
      //   { propName: "gender", value: this.updateForm.get("gender").value },
      //   { propName: "qualification", value: this.updateForm.get("qualification").value },
      //   { propName: "email", value: this.updateForm.get("nemail").value },
      //   { propName: "address", value: this.updateForm.get("address").value },
      //   { propName: "state", value: this.updateForm.get("state").value },
      //   { propName: "city", value: this.updateForm.get("city").value },
      //   { propName: "pin", value: this.updateForm.get("pin").value },
      //   {propName:"hobbies", value:hobbies}
      // ]
      // console.log(data);
      //let eemail = this.updateForm.get("nemail").value
      // if (this.updateForm.get("fname").value == '' || this.updateForm.get("lname").value == '' || this.updateForm.get("gender").value == '' || this.updateForm.get("nemail").value == '') {
      //   alert("Please enter all fields");
      // }
      // else {
      //   let dat = JSON.stringify(data);
      //   console.log(dat);

      //   this.http.patch<any>(url + this.emailroute, dat, httpOptions).subscribe(result => {
      //     console.log("Updates")
      //     if (result) { this.route.navigate(['/displayuser']) }
      //   },
      //     error => { console.log(error) });

      // }
       console.log(this.updateForm.value);  
       const oldlink=this.users.profpic;
      const formData = new FormData();
      formData.append('fname', this.updateForm.get("fname").value);
      formData.append('lname', this.updateForm.get("lname").value);
      formData.append('gender', this.updateForm.get("gender").value);
      formData.append('email', this.updateForm.get("nemail").value);
      if(this.flag==true){      formData.append( 'profpic', this.updateForm.get('profpic').value,(this.updateForm.get('profpic').value).name);
      formData.append('oldlink',oldlink);
    }
     // formData.set('calnder', this.updateForm.get("calnder").value);
      formData.append('qualification', this.updateForm.get("qualification").value);
      formData.append('address', this.updateForm.get("address").value);
      formData.append('state', this.updateForm.get("state").value);
      formData.append('city', this.updateForm.get("city").value);
      formData.append('pin', this.updateForm.get("pin").value);
      formData.append('contact', this.updateForm.get("contact").value);
      for (var i = 0; i < hobbies.length; i++) {
        formData.append('hobbies[]', hobbies[i]);
    }
    this.httpservice.updatedata(this.emailroute,formData).subscribe((res)=>{
      console.log(res), this.route.navigate(['/displayuser']);},(err)=>console.log(err));

   
    }



  }


}
