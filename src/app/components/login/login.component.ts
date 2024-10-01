import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import {PasswordModule} from 'primeng/password';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule, InputTextModule,ButtonModule,FormsModule,ToastModule,PasswordModule],
  providers: [MessageService,AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  usuario: string = "";
  senha: string = "";
  aux: boolean = true;

  constructor(private router: Router,private messageService: MessageService, private authService: AuthService){
  }
  
  ngOnInit(): void {
  }

  autenticar() {
    if (this.usuario == "") {
        this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Informe o campo usuário', life: 3000 });
        console.log(this.usuario)
        return;
    }
    if (this.senha == "") {
        this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Informe o campo senha', life: 3000 });
        return;
    }
    this.aux = true;
    this.authService.login(this.usuario, this.senha).subscribe({
        next: (response) => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: error.message, life: 3000 });
        },
        complete: () => {
        }
    }); 
  }

  goToCadastro(){
    this.router.navigate(['/cadastro']);
  }

}
