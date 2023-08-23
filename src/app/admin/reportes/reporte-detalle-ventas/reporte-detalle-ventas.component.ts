import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DetalleVental } from 'src/app/clases/detalleventaL';
import { Vental } from 'src/app/clases/ventaL';
import { VentasService } from 'src/app/servicios/api-ventas/ventas.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-reporte-detalle-ventas',
  templateUrl: './reporte-detalle-ventas.component.html',
  styleUrls: ['./reporte-detalle-ventas.component.css']
})
export class ReporteDetalleVentasComponent {

  detalles: DetalleVental[];

  id: number;

  ventas: Vental;

  constructor(private ventaService:VentasService){}


  getV(id:number){
    this.getVentas(id);
    this.getDetalles(id);
  }

  getVentas(id:number){
    this.ventaService.buscarVenta(id).subscribe((data) =>{
      return this.ventas = data;
    })
  }

  getDetalles(id:number){
    this.ventaService.buscarDetalles(id).subscribe((data) =>{
      return this.detalles = data;
    })
  }


  exportExcel(): void {
    let ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.detalles);

    let wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Detalles');

    XLSX.writeFile(wb, 'reporte_dventas.xlsx');
}



exportPdf(): void {
  const doc = new jsPDF();

  var col = ["ID", "Libro", "Cantidad", "Precio", "Subtotal"];
  let rows : any[][] = [];

  this.detalles.forEach(venta => {
      let temp = [venta.detalleventaId, venta.libro, venta.cantidad, venta.precio_uni, venta.subtotal];
      rows.push(temp);
  });

  doc.text('Detalles de Venta', 75, 16);
  
  autoTable(doc, {head: [col], body: rows, startY: 20 }); 

  doc.save('reporte_dventa.pdf');
}

}
