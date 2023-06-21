import { Component } from '@angular/core';

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
      this.obtenerProductos();
    },error=>{
      console.log(error);
    }); 
  }
  
}
