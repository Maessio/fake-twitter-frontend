import { Component, inject, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FooterComponent } from "../../components/footer/footer.component";
import { UserProfile } from '../../interfaces/user-profile';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  @Input() userId?: number = 1;

  private userService = inject(UserService);

  userProfile?: UserProfile;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.userId !== undefined) {
      this.loadProfile(this.userId);
    }
  }

  loadProfile(id: number): void {
    this.userService.loadUserProfile(id).subscribe({
      next: (profile) => {
        this.userProfile = profile;
      },
      error: (error) => {
        console.error('Error to load profile:', error);
      }
    });
  }
}