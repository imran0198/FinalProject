
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Employee } from '../model/employee';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 headValue:string='Add Employee'
  empDetail!: FormGroup;
  empObj:any
  empObjArr: any
  toeditval:any
  editbutt:boolean=true
  updatebutt:boolean=false
  constructor(private toServerData: ServicesService) { }
  employee = new FormGroup({
    user: new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z]+$"), Validators.minLength(4), Validators.maxLength(14)]),
    email: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
    pass: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
    age: new FormControl("", [Validators.required, Validators.min(1), Validators.max(110)]),
    salary: new FormControl("", [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(5), Validators.maxLength(7)])

  })
  get user() {
    return this.employee.get('user')
  }
  get email() {
    return this.employee.get('email')
  }
  get pass() {
    return this.employee.get('pass')
  }
  get age() {
    return this.employee.get('age')
  }
  get salary() {
    return this.employee.get('salary')
  }
  
    ngOnInit(): void {
      this.getEmployeeData()
    }
  employeeform() {
    this.empObj = {
      user: this.user?.value,
      email: this.email?.value,
      pass: this.pass?.value,
      age: this.age?.value,
      salary: this.salary?.value
    }
    this.postEmployeeData(this.empObj)
  this.getEmployeeData()
  }
  getEmployeeData() {
    this.toServerData.getEmployee().subscribe(y => {
      return this.empObjArr = y
    })
  }
  postEmployeeData(val:any){
    this.toServerData.putEmployee(val).subscribe(x=>{
      console.log(x);
    this.getEmployeeData()  
    })
    const buttonVal=document.getElementById('close')
    buttonVal?.click()
    this.employee.reset()

  }

  toDeletedata(id:number){
    this.toServerData.deleteEmployee(id).subscribe(r=>{
      console.log(r);
      this.getEmployeeData()
    })
  }
  toEditData(data:any){
    this.headValue='Edit Employee'
    this.editbutt=false
  this.updatebutt=true
    this.toeditval=data.id
this.user?.patchValue(data.user),
this.email?.patchValue(data.email),
this.pass?.patchValue(data.pass),
this.salary?.patchValue(data.salary),
this.age?.patchValue(data.age)   
  }
  toUpdateData(){
    this.empObj = {
      user: this.user?.value,
      email: this.email?.value,
      pass: this.pass?.value,
      age: this.age?.value,
      salary: this.salary?.value
    }
    this.toServerData.updateEmployee(this.empObj,this.toeditval).subscribe(d=>{
      console.log(d);
      this.getEmployeeData()
    })
    this.editbutt=true
    this.updatebutt=false
    this.headValue='Add Employee'
    const buttonVal=document.getElementById('close')
    buttonVal?.click()
    this.employee.reset()
  }

}