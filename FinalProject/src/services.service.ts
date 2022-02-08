import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(private http:HttpClient) { }
  
  getEmployee(){
return this.http.get("http://localhost:3000/posts/")
  }
  putEmployee(value:any){
   return  this.http.post("http://localhost:3000/posts/",value)
  }

updateEmployee(value2:any,id:number){
  return this.http.put("http://localhost:3000/posts/"+id,value2)
}
deleteEmployee(id:number){
  return this.http.delete("http://localhost:3000/posts/"+id)
}
}


