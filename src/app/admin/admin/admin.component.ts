import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public api:ApiService,
    public router :Router
  ) { }

  ngOnInit(): void {
    //this.chockLogin();
  }
mode:string='side';

chockLogin()
{
  this.api.get('books/status').subscribe(res=>{
    return;
  },err=>{
    this.router.navigate(['/login']);
  })
}

loading:boolean;
logout()
{
  this.loading=true;
  let conf=confirm('keluar aplikasi?');
  if (conf)
  {
    localStorage.removeItem('appToken');
    this.router.navigate(['/login']);
  }
}
}