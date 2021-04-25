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
loading:boolean ;
  getBooks()
  {
    this.loading=true;
    this.api.get('bookswithauth').subscribe(result=>{
      this.books=result;
      this.loading=false;
    },error=>{
      this.loading=false;
    })
  }
    ProductDetail(data: any,idx: number)
    {
      let dialog= this.dialog.open(ProductDetailComponent, {
          width: '400px',
          data: data,
      });
        dialog.afterClosed().subscribe(result=> {
         if(result)
         {
          if(idx==-1)this.books.push(result);
          else this.books[idx]=data;
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
          this.api.delete('bookswithauth/'+id).subscribe(result=>{
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
        let dialog= this.dialog.open(FileUploaderComponent  , {
          width: '400px',
          data: data
      });
        dialog.afterClosed().subscribe(result=> {
        return;
        })      
      }
      downloadFile(data:any)
      {
        FileSaver.saveAs('http://api.sunhouse.co.id/bookstore/'+data.url);
      }
    }
