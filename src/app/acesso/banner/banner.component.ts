import { style, trigger, state, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('1s ease-in')),

    ])
  ]
})

export class BannerComponent implements OnInit {

  public estado: string = 'escondido';


  public imagens: Imagem[] = [
    { estado: 'visivel', url: '/assets/banner-acesso/img_1.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_2.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_3.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_4.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_5.png' }
  ]

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.logicaRotacao(), 2000)
  }

  public logicaRotacao(): void {
    //ocultar imagem
    let i: number = this.imagens.findIndex(i => i.estado === 'visivel')
    this.imagens[i].estado = 'escondido';

    //exibir outra imagem
    this.imagens[(i === this.imagens.length - 1) ? 0 : i + 1].estado = 'visivel'
    setTimeout(() => this.logicaRotacao(), 2000)
  }
}
