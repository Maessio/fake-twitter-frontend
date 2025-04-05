import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ModalComponent } from "../modal/modal.component";


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, ModalComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{

  postForm!: FormGroup;

  modalOpen = false;
  modalTitle = '';
  modalMessage = '';

  private postService = inject(PostService);
  private fb = inject(FormBuilder); 
  private router = inject(Router);

  private currentUserId = Number(localStorage.getItem('userId'));

  readonly menuItems: MenuItem[] = [
    { label: 'Home', iconPath: 'assets/icons/home.svg', route: '/home' },
    { label: 'Following', iconPath: 'assets/icons/following.svg', route: '/following' },
    { label: 'Profile', iconPath: 'assets/icons/profile.svg', route: '/profile' }
  ];

  ngOnInit(): void {
    this.postForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(120)]]
    });
  
  }

  submitPost(): void {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }
  
    const postContent = this.postForm.value.content;

    console.log(postContent);
  
    this.postService.createPost(this.currentUserId, postContent).subscribe({
      next: () => {
        (document.getElementById('create_post') as HTMLDialogElement)?.close();
        this.postForm.reset();

        this.showModal('Success!', 'Your post has been published.');
      },
      error: (error) => {

        this.showModal('Oops!', 'There was a problem creating your post.');
      }
    });
  }

  openPostDialog(): void {
    const dialog = document.getElementById('create_post') as HTMLDialogElement;
    dialog?.showModal();
  }

  setActive(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  showModal(title: string, message: string) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalOpen = true;
  }
}
