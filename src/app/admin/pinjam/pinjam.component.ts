import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { PinjamDetailComponent } from '../pinjam-detail/pinjam-detail.component';
@Component({
  selector: 'app-pinjam',
  templateUrl: './pinjam.component.html',
  styleUrls: ['./pinjam.component.scss']
})
export class PinjamComponent implements OnInit {
  title:any;
  Pinjams:any=[];
  userData : any ={};
  constructor(   
    public dialog:MatDialog,
     public db : AngularFirestore,
    public auth : AngularFireAuth
  ){
  }
  ngOnInit(): void {
    this.title='Peminjam';
    this.auth.user.subscribe(user=>{
      this.userData = user;
    this.getPinjams();
});
}
loading:boolean ;
  getPinjams()
  {
    this.loading=true;
    //this.api.get('bookswithauth').subscribe(result=>{
    this.db.collection('Pinjams',ref=>{
      return ref.where ('uid','==',this.userData.uid);
    }).valueChanges({idField : 'id'}).subscribe(res=>{
      console.log(res);
      this.Pinjams=res;
      this.loading=false;
    },err=>{
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
         return;
        });
      }

  loadingDelete:any={};
  DeleteProduct(id: any,idx: any)
  {
    var conf=confirm('Delete item?');
        if(conf)
        {
          //this.api.delete('bookswithauth/'+id).subscribe(result=>{
            this.db.collection('Pinjams/').doc(id).delete().then(result=>{
            this.Pinjams.splice(idx,1);
            this.loadingDelete[idx]=false;
          }).catch(error=>{
            this.loadingDelete[idx]=false;
            alert('Tidak dapat menghapus data');
          });
        }
      }
}
