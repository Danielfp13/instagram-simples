import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output()
  public exibirPainel: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
 
  public exibirPainelLogin(): void{
    this.exibirPainel.emit('login');
  }

}
