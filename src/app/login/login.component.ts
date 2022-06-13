import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { min } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //prpoerties
aim="Perfect Banking Partner"
accno="account number please"
acno=""
pswd=""

loginForm=this.fb.group({
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
})

  constructor(private router:Router, private ds:DataService,private fb:FormBuilder ) { }

  ngOnInit(): void {
  }
//userdefined functions
login(){
  var acno=this.loginForm.value.acno
  var pswd=this.loginForm.value.pswd
  if(this.loginForm.valid){
  const result =this.ds.login(acno,pswd)
  if(result){
      alert("login succesfull")
      this.router.navigateByUrl(`dashboard`)
  }
  else{
    alert("invalid form")
  }
    }
  }
acnoChange(event:any){
this.acno=event.target.value

}
pswdChange(event:any){
  this.pswd=event.target.value
  
  
}

//template referencing variable
// login(a:any,p:any){
//   var acno=a.value
//   var pswd=p.value
//   let db=this.db
//   if(acno in db){
//     if(pswd==db[acno]["password"]){
//       alert("login succesfull")
//     }
//     else{
//       alert("incorrect passsword")
//     }
//   }
//   else{
//     alert("user doesnot exist !!!")
//   }
 
// }
}
