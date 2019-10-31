import { Component, OnInit } from '@angular/core';
import { DatasService } from '../datas.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {

  constructor(private datas: DatasService, private http: HttpClient, private router: Router, private fb:FormBuilder) { }

  config;
  idUser;
  userPlaylists = [];
  showAddPl : Boolean = false;
  supprPl : Boolean = false;
  supprPlId = undefined;

  newPlaylist: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
  })

  showAdd = () => {
    this.showAddPl = !this.showAddPl;
    this.supprPlId = undefined;
    this.supprPl = false;
  }

  addPlaylist = () => {
    this.datas.postApi('newPlaylist', {
      name : this.newPlaylist.value.name,
      iduser : this.idUser
    }).subscribe((res:any) => {
      this.userPlaylists.push(res.playlist);
      this.datas.obsevableUserPlaylists.next(this.userPlaylists);
      this.showAddPl = false;
    })
  }

  confirmDeletion(event, playlistId) {
    this.supprPlId = playlistId;
    this.supprPl = true;
    this.showAddPl = false;
  }

  supprNo = () => {
    this.supprPlId = undefined;
    this.supprPl = false;
  }

  deletePlaylist(event, playlistId) {
    this.datas.postApi('deletePlaylist', {
      user_playlists : this.userPlaylists,
      idpl : playlistId
    }).subscribe((res:any) => {
      if (res.error == false) {
        this.userPlaylists = res.playlists;
        this.datas.obsevableUserPlaylists.next(res.playlists);
      }
    })
  }


  ngOnInit() {
    this.idUser = this.config.idUser;
    this.datas.observableUserId.subscribe((a) => {
      this.idUser = a;
    })
    this.datas.obsevableUserPlaylists.subscribe((a) => {
      this.userPlaylists = a;
    })
    this.datas.getApi('userPlaylists/'+this.idUser).subscribe((res: any) => {
      if (res.error == false) {
        this.userPlaylists = res.playlists;
        this.datas.obsevableUserPlaylists.next(res.playlists);
      }
    })
  }

}
