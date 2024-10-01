import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UserSignIn } from '../../models/usersignin';
import { AuthService } from '../../services/auth.service';

interface Camisetas {
  name: string;
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ToastModule, FormsModule, InputTextareaModule, DropdownModule, InputTextModule, InputSwitchModule, ButtonModule],
  providers: [MessageService, AuthService],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent {
  camisetas: Camisetas[];
  novoUsuario: UserSignIn;

  constructor(private router: Router, private messageService: MessageService, private authService: AuthService) {
    this.novoUsuario = new UserSignIn();
    this.camisetas = [
      { name: 'PP' },
      { name: 'P' },
      { name: 'M' },
      { name: 'G' },
      { name: 'GG' },
      { name: 'XG' },
      { name: 'PP_babylook' },
      { name: 'P_babylook' },
      { name: 'M_babylook' },
      { name: 'G_babylook' },
      { name: 'GG_babylook' },
      { name: 'XG_babylook' }
    ];
  }

  cadastrar() {
    if(!this.novoUsuario.primeiraGrad){
      this.novoUsuario.primeiraGrad = false;
    }
    if (!this.novoUsuario.nomeCompleto) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Informe o campo Nome Completo', life: 3000 });
      return;
    }
    if (!this.novoUsuario.matricula) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Informe o campo Matricula', life: 3000 });
      return;
    }
    if (!this.novoUsuario.username) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Informe o campo Usuário', life: 3000 });
      return;
    }
    if (!this.novoUsuario.password) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Informe o campo Senha', life: 3000 });
      return;
    }
    if (!this.novoUsuario.email) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Informe o campo E-Mail', life: 3000 });
      return;
    }
    if (!this.novoUsuario.telefone) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Informe o campo Telefone', life: 3000 });
      return;
    }
    if (!this.novoUsuario.rg) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Informe o campo Registro Geral (RG)', life: 3000 });
      return;
    }
    if (!this.novoUsuario.orgaoEmissor) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Informe o campo Orgão Emissor do RG', life: 3000 });
      return;
    }
    if (!this.novoUsuario.cpf) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Informe o campo CPF', life: 3000 });
      return;
    }
    if (!this.novoUsuario.tamanhoCamisa) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Informe o campo Tamanho da Camiseta', life: 3000 });
      return;
    }

    this.authService.cadastrar(this.novoUsuario).subscribe({
      next: (response) => {
        console.log(response);
        //this.router.navigate(['/login']);
      },
      error: (error) => {
        this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: error.message, life: 3000 });
      },
      complete: () => {
      }
  }); 
  }

  onTamanhoChange(event: any) {
    this.novoUsuario.tamanhoCamisa = event.value.name;
  }
}
