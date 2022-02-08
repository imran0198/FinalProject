import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor() { }
  regForm= new FormGroup({
    cname: new FormControl("",[Validators.required,Validators.pattern("^[a-z A-Z]+$")]),
    uname: new FormControl("",[Validators.required,Validators.pattern("[a-z A-Z 0-9 _ ]+$")]),
    email: new FormControl("",[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
    pass:new FormControl("",[Validators.required,Validators.pattern((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/))]),
    cpass:new FormControl("",[Validators.required,Validators.pattern((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/)) ])

  })
  get  cname() {
   return this.regForm.get('cname')
  }
  get  uname() {
    return this.regForm.get('uname')
   }
   get  email() {
    return this.regForm.get('email')
   }
   get  pass() {
    return this.regForm.get('pass')
   }

   get  cpass() {
      return this.regForm.get('cpass')
   }

   onSubmit(){
    //  if((this.regForm.value.pass)===(this.regForm.value.cpass)){
    //    alert("happy")
    
    //  }else{
    //    alert("failed")
    //  }
    console.log(this.regForm.value);
    localStorage.setItem("regForm",JSON.stringify(this.regForm.value))
    
   }

  
   getlocal(){
     let localdata=JSON.parse(localStorage.getItem(("regForm")))
     console.log(localdata);
   }

  ngOnInit(): void {


  }

}

