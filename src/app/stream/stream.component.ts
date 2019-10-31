import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatasService } from '../datas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
  search
  albums
  songs
  notFound = false;
  view = "stream";

  constructor(private data: DatasService, http: HttpClient, private maRoute: ActivatedRoute,) { }

  ngOnInit() {
    let id = this.maRoute.snapshot.params.id;
    if (id) {
      this.data.getApi('stream/'+id).subscribe((res:any) =>{
        this.songs = res.songsByAlbum;
      })
    }
    else {
      this.data.getApi('stream').subscribe((res: any) => {
        this.albums = res.albums;
        this.view="album"
      })
    }
  }

  load(){
    console.dir(this.search);
  }


}
