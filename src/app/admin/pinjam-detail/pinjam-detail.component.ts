import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pinjam-detail',
  templateUrl: './pinjam-detail.component.html',
  styleUrls: ['./pinjam-detail.component.scss']
})
export class PinjamDetailComponent implements OnInit {

  userData: any = {};
  constructor(
    public dialogRef:MatDialogRef<PinjamDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    //public api:ApiService,
      public db: AngularFirestore,
      public auth : AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(res=>{
      this.userData = res;
    });
  }
  loading:boolean ;
  simpanData()
  {
    this.loading=true;
    if(this.data.id == undefined)
    {
      
      //this.api.post('bookswithauth', this.data).subscribe(result=>{

      let doc = new Date().getTime().toString();
      this.data.uid = this.userData.uid;
      this.db.collection('Pinjams').doc(doc).set(this.data).then(res=>{
        this.dialogRef.close(this.data);
        this.loading=false; 
      }).catch(er=>{
        console.log(er);
        this.loading=false;  
       alert('Tidak dapat menyimpan data');
     });
    }else{
        //this.api.put('bookswithauth/'+this.data.id,this.data).subscribe(result=>{
          this.db.collection('Pinjams/').doc(this.data.id).update(this.data).then(result=>{
            this.dialogRef.close(this.data);
            this.loading=false;
         }).catch(er=>{
          console.log(er);
          this.loading=false; 
       alert('Tidak dapat memperbarui data');
      })
    }
   }
 } 