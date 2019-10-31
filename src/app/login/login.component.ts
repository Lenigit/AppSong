import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatasService } from '../datas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private datas: DatasService) { }

  config: any;
  errPwd = false;

  logUser: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  logIn = () => {
    this.datas.postApi('login', {
      login: this.logUser.value.login,
      password: this.logUser.value.password
    }).subscribe((res: any) => {
      if (res.logged == true) {
        this.datas.observableUserId.next(res.id);
        this.datas.obsevableUserLogin.next(res.login);
        this.datas.observableUserToken.next(res.token);
        this.router.navigate(['/']);
        localStorage['id']  = JSON.stringify(res.id);
        localStorage['login']  = JSON.stringify(this.logUser.value.login );
        localStorage['token']  = JSON.stringify(res.token);
      } else {
        this.errPwd = true;
      }
    })
  }


  ngOnInit() {
  }

}
