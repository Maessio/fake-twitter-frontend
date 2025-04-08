import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, ModalComponent, NgIf],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit{

  isRegisterMode = false;
  
  modalOpen = false;
  modalTitle = '';
  modalMessage = '';
  
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    localStorage.clear();

    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId.toString());

        this.router.navigate(['/home']);
      },
      error: (err) => {
        
        this.showModal('Login Failed', 'The email or password you entered is incorrect. Please try again.');
      }
    });
  }
  
  onRegister() {
    localStorage.clear();

    if (this.registerForm.invalid) return;
    
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        
        this.toggleForm();
      },
      error: (err) => {

        this.showModal('Registration Failed', 'The email may already be in use or the data is invalid. Please check and try again.');
      }
    });
  }

  toggleForm(): void {
    this.isRegisterMode = !this.isRegisterMode;
  }

  showModal(title: string, message: string) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalOpen = true;
  }
}
