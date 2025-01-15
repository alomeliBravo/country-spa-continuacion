import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  standalone: false,
  templateUrl: './search-box.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  //*Subject es un tipo especial de observable de RXJS
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce = new EventEmitter<string>();

  //* debounceTime es un operador de RXJS el cual recibe dos parametros
  //* dueTime: Cuanto tiempo quiero esperar para esperar la siguiente emisión

  //? Funcionalidad resumida: observable => pipe (recibe valor y espera 1 segundo) => vuelvo a recibir valor ? "vuelve a esperar" : "se subscribe"
  //? El observable emite un valor, este valor pasa al pipe el cuál espera 1 segundo
  //? si vuelve a recibir un valor entonces vuelve a esperar si despues de 1 segundo ya
  //? no recibe un valor, entonces emite ese valor al subscribe
  //? el pipe funciona como un barrera (en este caso).

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( value => {
      this.onDebounce.emit(value);
    })
  }

  //* onDestroy es un detector de cambios de angular el cuál cuando nosotros
  //* salimos de la ruta o se deja de rederizar el componente con un ngif
  //* se detecta la destrucción

  //? Correción: OnDestroy es un ciclo de vida de Angular el cúal se utiliza para
  //? realizar tareas de limpieza antes de que un componente o directiva sea destruido.
  //? esto ocurre cuando sales de la ruta o dejamos de renderizar el componente
  //? Es util para: Desuscribirse de los observables, limpiar timers, eliminar listeners
  //? Cerrar conexiones, como con websockets
  //? básicamente para liberar recursos o evitar fugas de memoria.

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue ( value:string ):void {
    if (value === '' ) return;
    this.onValue.emit(value);
  }

  onKeyPress( searchTerm:string  ) {
    this.debouncer.next( searchTerm );
  }
}
