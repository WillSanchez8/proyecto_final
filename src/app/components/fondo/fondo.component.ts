import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fondo',
  templateUrl: './fondo.component.html',
  styleUrls: ['./fondo.component.scss']
})
export class FondoComponent implements OnInit {
  images = ['assets/fondo/casa1.png', 'assets/fondo/casa2.png', 'assets/fondo/casa3.png','assets/fondo/casa4.png','assets/fondo/casa6.png','assets/fondo/casa7.png']; // Rutas de las imágenes
  intervaloTiempo = 9000; // Intervalo de tiempo en milisegundos (5 segundos)
  index = 0;

  ngOnInit() {
    this.cambiarImagen(); // Cambiar imagen inicialmente
    setInterval(() => this.cambiarImagen(), this.intervaloTiempo); // Cambiar imagen periódicamente
  }

  cambiarImagen() {
    const fondo = document.querySelector('.fondo-degradado');
    if (fondo instanceof HTMLElement) {
      fondo.style.backgroundImage = `url(${this.images[this.index]})`;
      this.index = (this.index + 1) % this.images.length;
    }
  }
}
