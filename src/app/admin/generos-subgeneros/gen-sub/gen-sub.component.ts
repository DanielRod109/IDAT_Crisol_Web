import { Component } from '@angular/core';
import { GenSubService } from 'src/app/servicios/api-generos-subgeneros/gen-sub.service';

@Component({
  selector: 'app-gen-sub',
  templateUrl: './gen-sub.component.html',
  styleUrls: ['./gen-sub.component.css']
})
export class GenSubComponent {
  generoSubgeneroData : any[] = [];

  constructor(private gensubService: GenSubService){}

  ngOnInit(): void{
    this.gensubService.listarGenerosSubgeneros().subscribe(
      data => {
        this.generoSubgeneroData = data;
      }
    );
  }


}
