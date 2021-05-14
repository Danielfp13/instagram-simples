import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BdService } from '../../bd.service';
import firebase from 'firebase/app';
import 'firebase/auth'

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string = ''

  public formulario: FormGroup = new FormGroup({
    'titulo' : new FormControl(null)
  })
  constructor(private bdService: BdService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public publicar():void{
    this.bdService.publicar( {
      email: this.email ,
      titulo: this.formulario.value.titulo
      });
  }
}
