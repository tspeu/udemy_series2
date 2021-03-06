import { Component, OnInit , Input , Output, EventEmitter, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy  {

  // @Input() personajes ;
  // @Output() sideElejido = new EventEmitter<{name: string, side: string}>();
    personajes = [];
  // para pasa el parametro del rourter/
    activatedRoute: ActivatedRoute;
    swService: StarWarsService;
    guardarSide = 'all';
    subscription;
    datos = [];
    dataLoad = true;
    fakeUsers: Array<any> = new Array(5);

  constructor(activatedRoute: ActivatedRoute,  swService: StarWarsService) {
    this.activatedRoute = activatedRoute;
    this.swService = swService;
  }

  ngOnInit() {

    // move to app.ts this.swService.fetchCharacters();
    console.log('this.dataLoad', this.dataLoad);

    // this.datos = this.swService.datos;
    // console.log('this.datos->', this.datos);

    this.activatedRoute.params.subscribe(
      (params) => {
          this.personajes = this.swService.getCharacters(params.side);
          this.guardarSide = params.side;
      }, (error) => {
        console.log('ERRR', error);
      });

      this.subscription = this.swService.charactersChanged.subscribe(
        () => {
          this.personajes = this.swService.getCharacters(this.guardarSide);

        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // onSelectedSide(charInfo) {
  //   this.sideElejido.emit(charInfo);
  // }

}
