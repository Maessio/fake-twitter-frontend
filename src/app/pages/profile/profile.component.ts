import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";
import { UserProfile } from '../../interfaces/user-profile.interface';
import { UserService } from '../../services/user.service';
import { PostComponent } from "../../components/post/post.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FooterComponent, PostComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  @Input() userId?: number;

  isUserLoged = true;
  userProfile?: UserProfile;

  private userService = inject(UserService);
  private currentUserId = Number(localStorage.getItem('userId'));


  ngOnInit(): void {
    if  (!this.userProfile) {
      this.loadProfile(this.userId ?? this.currentUserId);
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

  changePassword() {
     // leva para a tela de mudança de senha
  }

  logout() {
    // mostra um modal
    // limpa os dados na userDataService
    // encaminha para o login
  }
}