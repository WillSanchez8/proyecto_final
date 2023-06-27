import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from 'src/app/models/producto';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.scss'],
})
export class ListarProductoComponent implements OnInit {
  listProductos: Producto[] = [];

  constructor(
    private _productoService: ProductoService,
    private toastr: ToastrService
    
  ) {}
   
  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe(
      (data) => {
        console.log(data);
        this.listProductos = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarProducto(id: any) {
    this._productoService.eliminarProducto(id).subscribe(
      (data) => {
        Swal.fire({
          title: 'Éxito',
          text: 'Producto eliminado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.obtenerProductos();
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

