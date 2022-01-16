import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});
  error:string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'fullName': new FormControl('', Validators.required),
      'number': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe((res) => {
      const user =  res.find((a:any) => {
       return  a.email === this.signupForm.value.email;
      })
      if(user){
        alert("Users Already Exist");
      }
      else{
        this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
    .subscribe((res) => {
      alert("Signup Successfull");
      this.signupForm.reset();
      this.router.navigate(['login']);
    },err => {
      alert("Something went wrong");
    })
      }
    }, err =>{
      this.error = err.message;
      alert(this.error);
    })







    // this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
    // .subscribe((res) => {
    //   alert("Signup Successfull");
    //   this.signupForm.reset();
    //   this.router.navigate(['login']);
    // },err => {
    //   alert("Something went wrong");
    // })
  }

}
