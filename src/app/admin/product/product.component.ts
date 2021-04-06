import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    public dialog:MatDialog 
  )
  {
    this.title='Produk';
    this.getBooks();
  }
  ngOnInit(): void {
    
  }
  getBooks()
  {
    this.books=[
      {
        title:'Angular untuk Pemula',
        author:'Farid Suryanto',
        publisher:'Sunhouse Digital',
        year:2020,
        isbn:'8298377474',
        price:70000
      },
      {
        title:'Membuat Aplikasi Maps menggunakan Angular',
        author:'Farid Suryanto',
        publisher:'Sunhouse Digital',
        year:2020,
        isbn:'82983323455',
        price:75000
      }
    ];
  }
  
productDetail(data,idx)
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
      else this.books[idx]=res; 
    }
  })
}

deleteProduct(idx)
 {
   var conf=confirm('Delete item?');
   if(conf)
   this.books.splice(idx,1);
 }
}
