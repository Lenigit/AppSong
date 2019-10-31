import { Component, OnInit } from '@angular/core';
import{ CommonModule } from '@angular/common';
import { DatasService } from '../datas.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  topList = [];
  topListA = [];
  constructor(private datas: DatasService) { }

  ngOnInit() {
    this.datas.getApi('top').subscribe((res:any) => {
      console.dir(res.topList);
      this.topList = res.topList;
      console.dir(res.topListA);
      this.topListA=res.topListA;
    })
  }

}
