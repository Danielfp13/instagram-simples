import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BdService } from '../../bd.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import { ProgressoService } from '../../progresso.service';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string = ''
  private imagem: any
  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number = 0

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null),
    'imagem': new FormControl(null)
  })
  constructor(private bdService: BdService, private progressoService: ProgressoService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public publicar(): void {
    this.bdService.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    });

    // para o observable
    let continua = new Subject();
    continua.next(true);

    let acompanhamentoUpload = interval(1000);

    acompanhamentoUpload.pipe(takeUntil(continua)).subscribe(() => {
      this.progressoPublicacao = 'andamento'

      this.porcentagemUpload = 
     Math.round( (this.progressoService.estado.bytesTransferred / this.progressoService.estado.totalBytes) * 100)

      if (this.progressoService.status === 'concluido') {
        continua.next(false);
        this.progressoPublicacao = 'concluido'
      }
    })
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files
  }

  public fechar(): void{
    this.progressoService.status ='pendente'
    this.progressoPublicacao = 'pendente'
  }
}
