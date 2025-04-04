import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../interfaces/menu-item';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private router = inject(Router);

  readonly menuItems: MenuItem[] = [
    { label: 'Home', iconPath: 'assets/icons/home.svg', route: '/home' },
    { label: 'Following', iconPath: 'assets/icons/following.svg', route: '/following' },
    { label: 'Profile', iconPath: 'assets/icons/profile.svg', route: '/profile' }
  ];

  setActive(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
