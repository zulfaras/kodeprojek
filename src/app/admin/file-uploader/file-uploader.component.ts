import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  constructor(
    public api :ApiService,
    public dialogRef: MatDialogRef<FileUploaderComponent>
  ) { }

  ngOnInit(): void {
  }
  
selectedFile:any;   
onFileChange(event) {
   if(event.target.files.length > 0) {
       this.selectedFile=event.target.files[0];
       //if(this.selectedFile.type !='image/png') alert('file harus PNG');
       console.log(this.selectedFile);        
   }
}

loadingUpload: boolean;
 uploadFile() {
   let input = new FormData();
   input.append('file', this.selectedFile);
   this.loadingUpload = true;  
   this.api.upload(input).subscribe(data=>{    
     this.updateProduct(data);
     console.log(data);

   },error=>{
       this.loadingUpload = false;
       alert('Gagal mengunggah file');
   });
 }

 updateProduct(data)
 {
   if(data.status == true)
   {
     alert('File berhasil diungah');
     this.loadingUpload = false;
     this.dialogRef.close();
   }else{
     alert(data.message);
   }
 }
}
