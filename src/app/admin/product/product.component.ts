import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as FileSaver from 'file-saver';
import { ApiService } from 'src/app/services/api.service';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title:any;
  book:any={};
  books:any=[];
  constructor(   
    public dialog:MatDialog,
    public api:ApiService
  ){

  }
  ngOnInit(): void {
    this.title='Produk';
    this.books={
        title:'Angular untuk Pemula',
        author:'Farid Suryanto',
        publisher:'Sunhouse Digital',
        year:2020,
        isbn:'8298377474',
        price:70000
  };
  this.getBooks();
}
loading:boolean;
getBooks()
  {
    this.loading=true;
    this.api.get('bookswithauth').subscribe(result=>{
      this.books=result;
      this.loading=false;
    },error=>{
      this.loading=false;
      alert('Ada masalah saat pengambilan data. Coba lagi');
    })
    /*
    this.loading=true;
    this.api.get('books').subscribe(result=>{
      this.books=result;
      this.loading=false;
    },error=>{
      this.loading=false;
      alert('Ada masalah saat pengambilan data. Coba lagi');
    })
    */
  }
  
productDetail(data:any,idx:number)
{
  let dialog=this.dialog.open(ProductDetailComponent, {
    width:'400px',
    data:data
  });
  dialog.afterClosed().subscribe(res=>{
    if(res)
    {
       //jika idx=-1 (penambahan data baru) maka tambahkan data
      if(idx==-1)this.books.push(res);      
       //jika tidak maka perbarui data  
      else this.books[idx]=data; 
    }
  })
}
loadingDelete:any={};
deleteProduct(id_buku:any, idx:any)
 {
   
   var conf=confirm('Delete item?');
   if(conf)
   {
    this.loadingDelete[idx]=true;
     this.api.delete('bookswithauth/'+id_buku).subscribe(res=>{
      this.books.splice(idx,1);
      this.loadingDelete[idx]=false;
     },error=>{
      this.loadingDelete[idx]=false;
       alert('Tidak dapat menghapus data');
     });
   }
 }

uploadFile(data: any)
{
  let dialog=this.dialog.open(FileUploaderComponent, {
    width:'400px',
    data:data
  });
  dialog.afterClosed().subscribe(res=>{
    return;
  })
}
download(data)
{
  FileSaver.saveAs('http://api.sunhouse.co.id/bookstore/'+data.url);
}
}
