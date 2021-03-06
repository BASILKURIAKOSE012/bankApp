import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


depositForm=this.fb.group({
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
})
withdrawForm=this.fb.group({
    pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]]

})
acno="";
user:any;
  lDate: Date;
  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) {
    this.user=this.ds.currentUser
    this.lDate=new Date()
   }

  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
      alert("please login")
      this.router.navigateByUrl("")
    }
  }

  deposit(){
    var acno=this.depositForm.value.acno
    var pswd=this.depositForm.value.pswd
    var amount=this.depositForm.value.amount
    if(this.depositForm.valid){
   const result= this.ds.deposit(acno,pswd,amount)
if(result){
  alert(amount+"deposited succesfullt and new balance is:"+result)
}
    }
    else{
      alert("invalid form")
    }
  }
  withdraw(){
    var acno=this.withdrawForm.value.acno1
    var pswd=this.withdrawForm.value.pswd1
    var amount=this.withdrawForm.value.amount1
    if(this.withdrawForm.valid){
   const result= this.ds.withdraw(acno,pswd,amount)
  
if(result){
  alert(amount+"debited succesfully and new balance is:"+result)
}
    }
    else{
      alert("invalid form")
    }
    
  }
  logout(){
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentAcno")
this.router.navigateByUrl("")
  }
  deleteAccount(){
    this.acno=JSON.parse(localStorage.getItem("currentAcno")||'')

  }
  cancel(){
    this.acno=""
  }
}
