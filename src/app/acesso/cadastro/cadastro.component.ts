import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AutenticacaoService } from 'src/app/autenticacao.service';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output()
  public exibirPainel: EventEmitter<string> = new EventEmitter()

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nome_completo': new FormControl(null),
    'nome_usuario': new FormControl(null),
    'senha': new FormControl(null),
  })
  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
  }
 
  public exibirPainelLogin(): void{
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void{
  //  console.log(this.formulario.value)
    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    )
    console.log(usuario)
    this.autenticacaoService.cadastrarUsuario(usuario)
    .then(() => {
      this.exibirPainelLogin()
    })
  }
}
