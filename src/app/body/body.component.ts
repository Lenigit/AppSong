import { Component, OnInit } from '@angular/core';
import { DatasService } from '../datas.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor(private datas : DatasService) { }

  ngOnInit() {
  }
  like = () => {
this.datas.getApi('like/songs/:id')
  }
}
