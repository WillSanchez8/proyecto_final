import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.scss']
})
export class ListarProductoComponent {


  constructor(private _productoService:ProductoService,private toastr:ToastrService) {}

  eliminarProducto(id:any){
    this._productoService.eliminarProducto(id).subscribe(data=>{
      this.toastr.error('producto eliminado con exito',id);
      //this.obtenerProductos();
    },error=>{
      console.log(error);
    }); 
  }
  
}
