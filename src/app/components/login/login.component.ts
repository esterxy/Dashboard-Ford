

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';   
import { AuthService } from '../../services/auth.service';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-login',
  standalone: true,
  
  
  imports: [
    CommonModule, 
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSlideToggleModule 
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

 
  private authService = inject(AuthService);

  
  username: string = '';
  password: string = '';
  loginError: boolean = false;
  rememberMe: boolean = false;

  
  onLogin(): void {
    const success = this.authService.login(this.username, this.password);

    if (!success) {
      this.loginError = true;
    }
  }
}