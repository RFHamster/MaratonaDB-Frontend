import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { ProblemaTelaInicial } from '../../models/problema'

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TableModule, CommonModule, StyleClassModule, DividerModule, MultiSelectModule, FormsModule, InputTextModule, FloatLabelModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  transformarProblema(apiResponse: any[]) : ProblemaTelaInicial[]{
    return apiResponse.map(item => ({
      Id: item.keyProblema.toString(),
      IdOriginal: item.idOriginal,
      titulo: item.titulo,
      origem: item.origem,
      tema: item.assuntos,
      faixa: item.faixa
    }));
  }
  mockProblemas: ProblemaTelaInicial[] = [];
  // mockProblemas: ProblemaTelaInicial[] = [
  //   {
  //     Id: '1',
  //     IdOriginal: 'COD1',
  //     titulo: 'Desenvolvimento Web',
  //     origem: 'beecrownd',
  //     tema: 'Tecnologia',
  //     faixa: 'branca'
  //   },
  //   {
  //     Id: '2',
  //     IdOriginal: 'USR2',
  //     titulo: 'Algoritmos Avançados',
  //     origem: 'Codeforces',
  //     tema: 'Algoritmos',
  //     faixa: 'preta'
  //   },
  //   {
  //     Id: '3',
  //     IdOriginal: 'COD3',
  //     titulo: 'Competição de Programação',
  //     origem: 'maratona SBC',
  //     tema: 'Competição',
  //     faixa: 'amarela'
  //   },
  //   {
  //     Id: '4',
  //     IdOriginal: 'USR4',
  //     titulo: 'Estruturas de Dados',
  //     origem: 'beecrownd',
  //     tema: 'Estruturas de Dados',
  //     faixa: 'vermelha'
  //   },
  //   {
  //     Id: '5',
  //     IdOriginal: 'COD5',
  //     titulo: 'Técnicas de Otimização',
  //     origem: 'Codeforces',
  //     tema: 'Otimização',
  //     faixa: 'verde'
  //   },
  //   {
  //     Id: '6',
  //     IdOriginal: 'USR6',
  //     titulo: 'Análise de Algoritmos',
  //     origem: 'maratona SBC',
  //     tema: 'Análise',
  //     faixa: 'roxa'
  //   },
  //   {
  //     Id: '7',
  //     IdOriginal: 'COD7',
  //     titulo: 'Redes Neurais',
  //     origem: 'beecrownd',
  //     tema: 'IA',
  //     faixa: 'laranja'
  //   },
  //   {
  //     Id: '8',
  //     IdOriginal: 'USR8',
  //     titulo: 'Grafos e Aplicações',
  //     origem: 'Codeforces',
  //     tema: 'Grafos',
  //     faixa: 'branca'
  //   },
  //   {
  //     Id: '9',
  //     IdOriginal: 'USR8',
  //     titulo: 'Grafos e Aplicações',
  //     origem: 'Codeforces',
  //     tema: 'Grafos',
  //     faixa: 'branca'
  //   },{
  //     Id: '10',
  //     IdOriginal: 'USR8',
  //     titulo: 'Grafos e Aplicações',
  //     origem: 'Codeforces',
  //     tema: 'Grafos',
  //     faixa: 'branca'
  //   }

  // ];

  faixas = [
    { id: 1, name: 'Sem Faixa' },
    { id: 2, name: 'Branca' },
    { id: 3, name: 'Amarela' },
    { id: 4, name: 'Laranja' },
    { id: 5, name: 'Verde' },
    { id: 6, name: 'Roxo' },
    { id: 7, name: 'Vermelho' },
    { id: 8, name: 'Marrom' },
    { id: 9, name: 'Preta' },
  ];

  selectedFaixas: number[] = [];

  pageNumber: number = 1;

  temasBuscar: string = "";
  idBuscar: string = "";
  tituloBuscar: string = "";
  origemBuscar: string = "";

  isLeftVisible: boolean = false;
  isRightVisible: boolean = false;
  leftLinkTo: string = "";
  rightLinkTo: string = "";

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.makeGetRequest(environment.api + "/api/problema/v1/ativos?page=" + String(this.pageNumber-1) +"&limit=10");
  }

  goLeftRequest(){
    this.makeGetRequest(this.leftLinkTo);
  }

  goRightRequest(){
    this.makeGetRequest(this.rightLinkTo);
  }

  makeGetRequest(url : string): void {
    this.http.get<any>(url).subscribe(
      {
        next: (data) => {
          this.isRightVisible = false;
          this.isLeftVisible = false;

          this.mockProblemas = this.transformarProblema(data._embedded.problemaVOList);
          this.pageNumber = data.page.number + 1;
          if(data._links.next){
            this.isRightVisible = true;
            this.rightLinkTo = data._links.next.href;
          }
          if(data._links.prev){
            this.isLeftVisible = true;
            this.leftLinkTo = data._links.prev.href;
          }
        },
        error: (error) => {
          console.error('Erro ao fazer a requisição GET', error);
        }
      }
    );
  }

}
