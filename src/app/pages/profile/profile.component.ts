import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../interfaces/user-profile.interface';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from "../../components/footer/footer.component";
import { PostComponent } from "../../components/post/post.component";
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CarouselComponent } from "../../components/carousel/carousel.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, FooterComponent, PostComponent, NgFor, NgIf, ModalComponent, CarouselComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  @Input() userId?: number;

  isUserLogged?: boolean;
  userProfile?: UserProfile;
  
  modalOpen = false;
  modalTitle = '';
  modalMessage = '';

  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private currentUserId = Number(localStorage.getItem('userId'));

  passwordForm!: FormGroup;

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));

    console.log(this.userId)

    this.isUserLogged = (this.userId == this.currentUserId) ? true : false;

    if (!this.userProfile) {
      this.loadProfile(this.currentUserId, this.userId);
    }

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  loadProfile(currentUserId: number, userId?: number): void {
    this.userService.loadUserProfile(currentUserId, userId).subscribe({
      next: (profile) => {
        this.userProfile = profile;
        console.log(this.userProfile);
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
 
  followUser() {
    const userIdToFollow = this.userProfile?.id;
  
    if (userIdToFollow === undefined) {
      this.showModal('Oops!', 'User profile not loaded.');
      return;
    }

    console.log("OPA")
  
    if (!this.userProfile?.following) {
      this.userService.followUser(this.currentUserId, userIdToFollow).subscribe({
        next: () => {
          this.userProfile!.following = true;
          
          window.location.reload();
        },
        error: (err) => {
          this.userProfile!.following = false;
        }
      });
    } else {
      this.userService.unfollowUser(this.currentUserId, userIdToFollow).subscribe({
        next: () => {
          this.userProfile!.following = false;
          
          window.location.reload();
        },
        error: (err) => {
          this.userProfile!.following = true;
          this.showModal('Oops!', 'Error trying to unfollow this user');
        }
      });
    }
  }
    
  

  showModal(title: string, message: string) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalOpen = true;
  }
}
