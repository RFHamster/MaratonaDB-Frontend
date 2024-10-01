import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AdicionarComponent } from './components/problema/adicionar/adicionar.component';

export const routes: Routes = [
    {
        path: 'cadastro',
        component: CadastroComponent,
        title: 'Cadastro'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'problema/adicionar',
        component: AdicionarComponent,
        title: 'Adicionar Problema'
    },
    {
        path: '',
        component: DashboardComponent,
        title: 'Dashboard'
    }
];
