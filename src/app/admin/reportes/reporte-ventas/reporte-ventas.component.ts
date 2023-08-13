import { Component } from '@angular/core';
import { Vental } from 'src/app/clases/ventaL';
import { VentasService } from 'src/app/servicios/api-ventas/ventas.service';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent {

  ventas: Vental[];

  constructor(private ventaService:VentasService){}
  

  ngOnInit(): void{
    this.getVentas();
  }


  getVentas(){
    this.ventaService.obtenerVentas().subscribe((data) =>{
      return this.ventas = data;
    })
  }

  exportExcel(): void {
    let ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ventas);

    let wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Ventas');

    XLSX.writeFile(wb, 'reporte_ventas.xlsx');
}


exportPdf(): void {
  const doc = new jsPDF();

  var col = ["ID", "Total", "NºLibros", "Estado", "Fecha", "Dirección", "Tipo","Cliente","Motorizado"];
  let rows : any[][] = [];

  this.ventas.forEach(venta => {
      let temp = [venta.ventaId, venta.total, venta.cantidad_total, venta.estado, venta.fecha_venta,venta.direccion,venta.tipo,venta.cliente,venta.motorizado];
      rows.push(temp);
  });

  doc.text('Reporte de Ventas', 75, 16);
  
  autoTable(doc, {head: [col], body: rows, startY: 20 }); 

  doc.save('reporte_Ventas.pdf');
}



}
