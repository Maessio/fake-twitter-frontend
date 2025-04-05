import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../interfaces/user-profile.interface';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from "../../components/footer/footer.component";
import { PostComponent } from "../../components/post/post.component";
import { NgForOf } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, FooterComponent, PostComponent, NgForOf, ModalComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  @Input() userId?: number;

  isUserLoged = true;
  userProfile?: UserProfile;
  
  modalOpen = false;
  modalTitle = '';
  modalMessage = '';

  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  private currentUserId = Number(localStorage.getItem('userId'));

  passwordForm!: FormGroup;

  ngOnInit(): void {
    if (!this.userProfile) {
      this.loadProfile(this.userId ?? this.currentUserId);
    }

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  loadProfile(id: number): void {
    this.userService.loadUserProfile(id).subscribe({
      next: (profile) => {
        this.userProfile = profile;
      },
      error: (error) => {
        console.error('Error to load profile:', error);

        this.showModal('Oops!', 'We had a problem loading your user data. Please log in again.');

        this.router.navigate(['/login']);
      }
    });
  }

  changePassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { oldPassword, newPassword } = this.passwordForm.value;

    this.authService.changeUserPassword(this.currentUserId, {
      oldPassword,
      newPassword,
    }).subscribe({
      next: () => {
        this.showModal('Success', 'Password changed successfully!');

        (document.getElementById('change_password') as HTMLDialogElement)?.close();
        this.passwordForm.reset();
      },
      error: (error) => {
        console.log("ERROR: "+ error);
        console.log('Error body:', error.error);
        this.showModal('Oops!', 'Please try changing your password again.');
      }
    });
  }

  logout() {
    this.authService.logout(this.currentUserId).subscribe({
      next: () => {
        localStorage.clear();

        this.router.navigate(['/login']);
      },
      error: () => {
        this.showModal('Oops!', 'Please try to logout again.');
      }
    });
  }

  showModal(title: string, message: string) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalOpen = true;
  }
}
