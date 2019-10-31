import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route} from "@angular/router";
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BodyComponent } from './body/body.component';
import { PlayerComponent } from './player/player.component';
import { TopComponent } from './top/top.component';
import { StreamComponent } from './stream/stream.component';
import { LikesComponent } from './likes/likes.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { DatasService } from './datas.service';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { FilterPipe } from './filter.pipe'

const mesRoutes = [
  {path: '', redirectTo:'/stream', pathMatch: 'full'},
  {path: 'stream',component: StreamComponent},
  {path: 'stream/:id',component: StreamComponent},
  {path: 'top',component: TopComponent},
  {path: 'likes',component: LikesComponent},
  {path: 'playlists/:id',component: PlaylistsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    BodyComponent,
    PlayerComponent,
    TopComponent,
    StreamComponent,
    LikesComponent,
    PlaylistsComponent,
    LoginComponent,
    SigninComponent,
    PlaylistListComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(mesRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DatasService],
  entryComponents : [LoginComponent, SigninComponent, PlaylistListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
