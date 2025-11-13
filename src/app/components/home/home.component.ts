import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {RouterOutlet,RouterLink,RouterLinkActive} from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatToolbarModule, MatSidenavModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSlideToggleModule
    , RouterOutlet, RouterLink, RouterLinkActive, MatListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  opened = false;
}
