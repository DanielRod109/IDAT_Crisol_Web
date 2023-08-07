import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from 'src/app/clases/producto';
import { Subgenero } from 'src/app/clases/subgnero';
import { ProductosService } from 'src/app/servicios/api-productos/productos.service';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  productos: Productos[];
  busqueda: string = '';
  errorStatus: boolean = false;
  errorMsj: any = "";

  constructor (private productoService:ProductosService){
  }

  ngOnInit(): void{
    this.getProductos();
  }

  getProductos(){
    this.productoService.obtenerProductos().subscribe((data) =>{
      return this.productos = data;
    });
  }

  buscarPorNombreAutorEditorial(nombre: string) {
    if(nombre.trim() === '') {
      this.getProductos();
    } else {
      this.productoService.buscarPorNombreAutorEditorial(nombre).subscribe(
        data=> {
          this.productos = data;
        },
        error => {
          if (error.error.message == "message", "Lo sentimos, no pudimos encontrar tu búsqueda.") {
            this.getProductos();
          } else {
            console.error('Error al buscar libro.')
          }
        }
      );
    }
  }
  

  exportExcel(): void {
    let ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.productos);

    let wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Productos');

    XLSX.writeFile(wb, 'reporte_productos.xlsx');
}

exportPdf(): void {
  const doc = new jsPDF();

  var col = ["ID", "Nombre", "Editorial", "Autor", "Subgénero", "Stock", "Precio"];
  let rows : any[][] = [];

  this.productos.forEach(product => {
      let temp = [product.id_libro, product.nombre, product.editorial, product.nombre_autor, product.subgenero, product.stock, product.precio];
      rows.push(temp);
  });

  doc.text('Reporte de productos', 75, 16);
  
  autoTable(doc, {head: [col], body: rows, startY: 20 }); 

  doc.save('reporte_productos.pdf');
}

}
