import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatasService } from '../datas.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private fb: FormBuilder, private http : HttpClient, private router: Router, private datas:DatasService) { }

  config :any;
  errPwd = false;

  newUser: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
    passwordConfirm: ['', [Validators.required]]
  })

  signIn = () => {
    if (this.newUser.value.password === this.newUser.value.passwordConfirm) {
      this.datas.postApi('addUser', {
        login : this.newUser.value.login,
        password : this.newUser.value.password
      }).subscribe((res: any) => {
        if (res.error == false) {
          this.datas.observableUserId.next(res.id);
          this.datas.obsevableUserLogin.next(res.login);
          this.router.navigate(['/']);
        } else {
          alert("cet utilisateur existe déja !");
          
          this.newUser.patchValue({
            login: "",
            password: "",
            passwordConfirm: ""
          });
        }

      })
    } else {
      this.errPwd = true;
    }
  }


  ngOnInit() {
  }

}
