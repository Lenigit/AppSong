import { Component, OnInit, ElementRef, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SigninComponent } from '../signin/signin.component';
import { DatasService } from '../datas.service';
import { PlaylistListComponent } from '../playlist-list/playlist-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @ViewChild("logForm", { static: false, read: ViewContainerRef }) logForm: ViewContainerRef;
  @ViewChild("playlists", { static: false, read: ViewContainerRef }) playlists: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver, private datas: DatasService, private router:Router) { }

  login;
  idUser = undefined;
  affPl: Boolean = false;
  userPl;

  loadFormLogIn = () => {
    this.logForm.clear();
    const factory = this.resolver.resolveComponentFactory(LoginComponent);

    const element = this.logForm.createComponent(factory);
    element.instance.config = {idUser : this.idUser}; //if passing parameters is needed
  }

  loadFormSignIn = () => {
    this.logForm.clear();
    const factory = this.resolver.resolveComponentFactory(SigninComponent);

    const element = this.logForm.createComponent(factory);
    element.instance.config = {idUser : this.idUser}; //if passing parameters is needed
  }

  logOut = () => {
    this.datas.postApi('logout', {id : this.idUser}).subscribe((res : any) => { })
    this.idUser = undefined;
    this.datas.observableUserId.next(undefined);
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("login");
    this.router.navigate(['/']);
  }

  showPlaylists = () => {
    this.playlists.clear();
    if (!this.affPl) {
      const factory = this.resolver.resolveComponentFactory(PlaylistListComponent);

      const element = this.playlists.createComponent(factory);
      element.instance.config = {idUser : this.idUser}; //if passing parameters is needed
      this.affPl = true;
    } else {
      this.affPl = false;
    }
  }

  ngOnInit() {
    this.datas.observableUserId.subscribe((a) => {
      this.idUser = a;
    })
    this.datas.obsevableUserLogin.subscribe((a) => {
      this.login = a;
    })
    this.datas.isLogged().subscribe((res:any)=> {
      if(res.access){
        this.idUser=res.id;
        this.login=res.login;
        this.datas.observableUserId.next(res.id);
        this.datas.obsevableUserLogin.next(res.login);
      } else {
        this.router.navigate(['/']);
      }
    })
    this.datas.obsevableUserPlaylists.subscribe((a) => {
      this.userPl = a;
    })
  }
}
