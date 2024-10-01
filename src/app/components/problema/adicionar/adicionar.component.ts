import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';

import { environment } from '../../../../environments/environment';
import { ProblemaInsert } from '../../../models/problema';
import { UserSignIn } from '../../../models/usersignin';

@Component({
  selector: 'app-adicionar',
  standalone: true,
  imports: [FileUploadModule, DropdownModule,TableModule, CommonModule, StyleClassModule, DividerModule, MultiSelectModule, FormsModule, InputTextModule, FloatLabelModule, ButtonModule],
  templateUrl: './adicionar.component.html',
  styleUrl: './adicionar.component.scss'
})
export class AdicionarComponent {
  novoProblema: ProblemaInsert;
  novoUsuario: UserSignIn;
  faixas = [
    { id: 1, name: 'Sem Faixa'},
    { id: 2, name: 'Branca' },
    { id: 3, name: 'Amarela' },
    { id: 4, name: 'Laranja' },
    { id: 5, name: 'Verde' },
    { id: 6, name: 'Roxo' },
    { id: 7, name: 'Vermelho' },
    { id: 8, name: 'Marrom' },
    { id: 9, name: 'Preta' },
  ];
  constructor(private http: HttpClient) {
    this.novoUsuario = new UserSignIn();
    this.novoProblema = new ProblemaInsert();
  }
  novaDica: string = '';
  dicas: string[] = [];

  novoAssunto: string = '';
  assuntos: string[] = [];
  file = true;
  PdfFile: File | null = null;
  SolucaoFile: File | null = null;

  isFileTrue(){
    if(this.PdfFile && this.SolucaoFile){
      this.file = false;
    }
  }

  addProblem(): void {
    this.http.get<any>("").subscribe(
      {
        next: (data) => {

        },
        error: (error) => {
          console.error('Erro ao fazer a requisição GET', error);
        }
      }
    );
  }

  
  adicionarDica() {
    if (this.novaDica && !this.dicas.includes(this.novaDica)) {
      this.dicas.push(this.novaDica);
    }
    this.novaDica = '';
  }

  removerDica(index: number) {
    this.dicas.splice(index, 1);
  }

  adicionarAssunto() {
    if (this.novoAssunto && !this.assuntos.includes(this.novoAssunto)) {
      this.assuntos.push(this.novoAssunto); 
    }
    this.novoAssunto = '';
  }

  removerAssunto(index: number) {
    this.assuntos.splice(index, 1);
  }

  onTamanhoChange(event: any) {
    this.novoUsuario.tamanhoCamisa = event.value.name;
    this.novoUsuario.tamanhoCamisa = this.novoUsuario.tamanhoCamisa?.toUpperCase();
  }
  onFileUploadArquivo(event: any) {
    this.PdfFile = event.files[0];
    this.isFileTrue();
  }
  onFileUploadSolucao(event: any) {
    this.SolucaoFile = event.files[0];
    this.isFileTrue();
  }
}
