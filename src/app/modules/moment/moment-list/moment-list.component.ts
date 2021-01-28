import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-moment-list',
  templateUrl: './moment-list.component.html',
  styleUrls: ['./moment-list.component.scss']
})
export class MomentListComponent implements OnInit {
  momentList = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = null
  displayedColumns: string[] = ['SrNo','title','Image','tags','Action'];

  constructor(private httpService : HttpService,private router:Router) { }

  ngOnInit(): void {
    this.getEventList();
  }
  
  getEventList() {
    this.httpService.apiGet('GET_MOMENTS').subscribe((res:any)=>{
      this.momentList = res.data;
      this.dataSource = new MatTableDataSource<any>(this.momentList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  onRowClicked(item){
    console.log(item)
  }

  editMoment(element){
    this.router.navigateByUrl('moment/edit/'+element._id);
  }

  
  deleteMoment(element){
    // this.httpService.apiDelete().subscribe(res=>{

    // });
  }

}
