import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title:any;
  books:any=[];
  userData : any = {};
  constructor(   
    public dialog:MatDialog,
    public db: AngularFirestore,
    public auth: AngularFireAuth
  ){
  }
  ngOnInit(): void {
    this.title='Produk';
    this.auth.user.subscribe(user=>{
      this.userData = user;
      this.getBooks();
    });    
}
loading:boolean ;
  getBooks()
  {
    this.loading=true;
    this.db.collection('books', ref=>{
      return ref.where ('uid','==',this.userData.uid);
    }).valueChanges({idField : 'id'}).subscribe(res=>{
      console.log(res);
      this.books=res;
      this.loading=false;
    },err=>{
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
            this.db.collection('books/').doc(id).delete().then(result=>{
            this.books.splice(idx,1);
            this.loadingDelete[idx]=false;
          }).catch(error=>{
            this.loadingDelete[idx]=false;
            alert('Tidak dapat menghapus data');
          });
        }
      }
    }