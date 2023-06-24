import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { Producto } from '../../models/producto';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
  export class CrearProductoComponent implements OnInit{
  productoForm:FormGroup;
  titulo='Agregar Producto';
  id: string | null;
    constructor(private fb : FormBuilder , private router:Router, private toastr: ToastrService, private _productoService:ProductoService, private aRouter:ActivatedRoute){
      this.productoForm=this.fb.group({
        producto:['',Validators.required],
        categoria:['',Validators.required],
        ubicacion:['',Validators.required],
        precio:['',Validators.required],
      });
      this.id=this.aRouter.snapshot.paramMap.get('id');
    }
    //variable
  agregarProducto(){
    console.log(this.productoForm);
    console.log(this.productoForm.get('producto')?.value);
    const PRODUCTO:Producto={
      nombre:this.productoForm.get('producto')?.value,
      categoria:this.productoForm.get('categoria')?.value,
      ubicacion:this.productoForm.get('ubicacion')?.value,
      precio:this.productoForm.get('precio')?.value,
    }
    if(this.id!==null){
      //EDITAMOS
      this._productoService.editarProducto(this.id,PRODUCTO).subscribe(data=>{
        this.toastr.success(PRODUCTO.nombre, 'Producto fue Actualizado con éxito');
        this.router.navigate(['/']);
      },error=>{
        console.log(error);
        this.productoForm.reset();
      })
    }else{
      console.log(PRODUCTO);
      this._productoService.registrarProducto(PRODUCTO).subscribe(data=>{
        this.toastr.success(PRODUCTO.nombre,'Producto Registrado');
        this.router.navigate(['/']);
      },error=>{
        console.log(error);
        this.productoForm.reset();
      })
    }
  }

  esEditar(){
    if(this.id!==null){
      this.titulo='Editar Producto';
      this._productoService.obtenerProducto(this.id).subscribe(data=>{
        console.log(data);
        this.productoForm.setValue({
          producto:data.nombre,
          categoria:data.categoria,
          ubicacion:data.ubicacion,
          precio:data.precio,
        })
      })
    }
  }


  ngOnInit(): void {
    this.esEditar();
  
}
}
