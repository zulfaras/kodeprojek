import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { PinjamDetailComponent } from '../pinjam-detail/pinjam-detail.component';
@Component({
  selector: 'app-pinjam',
  templateUrl: './pinjam.component.html',
  styleUrls: ['./pinjam.component.scss']
})
export class PinjamComponent implements OnInit {
  title:any;
  Pinjam:any={};
  Pinjams:any=[];
  constructor(   
    public dialog:MatDialog,
    public api:ApiService
  ){

  }

  ngOnInit(): void {
    this.title='Peminjam';
    this.Pinjam={
      IDTransaksi:'TRB31',
      IDAnggota:'AGT01',
      Nama:'Farid Suryanto',
      NoHp:'08512341513',
      Alamat:'jogja',
      JudulBuku:'ANGGULAR',
      KodeBuku:'BKT21',
      TanggalPinjam:'Date',
      TanggalKembali:'Date',
      Status:'kembali'
  };
  this.getPinjams();
}
loading:boolean ;
  getPinjams()
  {
    this.loading=true;
    //this.api.get('bookswithauth').subscribe(result=>{
    this.api.get('Pinjams').subscribe(result=>{
      this.Pinjams=result;
      this.loading=false;
    },error=>{
      this.loading=false;
    })
  }
    PinjamDetail(data: any,idx: number)
    {
      let dialog= this.dialog.open(PinjamDetailComponent, {
          width: '400px',
          data: data,
      });
        dialog.afterClosed().subscribe(result=> {
         if(result)
         {
          if(idx==-1)this.Pinjams.push(result);
          else this.Pinjams[idx]=data;
         }
        });
      }

  loadingDelete:any={};
  DeleteProduct(id: any,idx: any)
  {
    var conf=confirm('Delete item?');
        if(conf)
        this.loadingDelete[idx]=true;
        {
          //this.api.delete('bookswithauth/'+id).subscribe(result=>{
            this.api.delete('Pinjams/'+id).subscribe(result=>{
            this.Pinjams.splice(idx,1);
            this.loadingDelete[idx]=false;
          },error=>{
            this.loadingDelete[idx]=false;
            alert('Tidak dapat menghapus data');
          });
        }
      }
}
