import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard.component';
import path from 'path';

export const routes: Routes = [
    {
        path: "",
            component: LoginComponent,
    },
    {
        path: "home",
        component: HomeComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
      },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "dashboard",
        component: DashboardComponent,
    },
];
