import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pinjam-detail',
  templateUrl: './pinjam-detail.component.html',
  styleUrls: ['./pinjam-detail.component.scss']
})
export class PinjamDetailComponent implements OnInit {

  constructor(
    public dialogRef:MatDialogRef<PinjamDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public api:ApiService
  ) { }

  ngOnInit(): void {
  }
  loading:boolean ;
  simpanData()
  {
    this.loading=true;
    if(this.data.id == undefined)
    {
      
      //this.api.post('bookswithauth', this.data).subscribe(result=>{
       this.api.post('Pinjams', this.data).subscribe(result=>{
        this.dialogRef.close(result);
        this.loading=false; 
     }, error=>{
       this.loading=false; 
       alert('Tidak dapat menyimpan data');
     });
    }else{
        //this.api.put('bookswithauth/'+this.data.id,this.data).subscribe(result=>{
         this.api.put('Pinjams/'+this.data.id,this.data).subscribe(result=>{
         this.dialogRef.close(result);
         this.loading=false;
      },error=>{
       this.loading=false; 
       alert('Tidak dapat memperbarui data');
      })
    }
   }
 } 