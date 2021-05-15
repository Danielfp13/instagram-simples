import { Component, OnInit } from '@angular/core';
import { BdService } from '../../bd.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email: string
  public publicacoes: any

  constructor( private BdService: BdService) { }

  ngOnInit(): void {

    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email

      this.atualizarTimeLine()
    })

  }
  public atualizarTimeLine(): void{
    this.BdService.consultaPublicacoes(this.email)
    .then((publicacoes: any) => {
      this.publicacoes = publicacoes
    })
  }
}
