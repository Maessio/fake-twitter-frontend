import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FooterComponent } from "../../components/footer/footer.component";
import { UserProfile } from '../../interfaces/user-profile';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  @Input() userId?: number = 1;
  
  private num = 1;

  userProfile?: UserProfile;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.num !== undefined) {
      this.loadProfile(this.num);
    }
  }

  loadProfile(id: number): void {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImpvaG4zMjExQGV4YW1wbGUuY29tIiwiZXhwIjoxNzQzNzQ3ODY2fQ.dap2QlzpxGwuldxQIJcoPOuytZZctZRePnzqKO5lDT4'; // coloque aqui o token real ou busque de algum lugar seguro

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    this.http.get<{ data: UserProfile }>(`http://localhost:8080/users/${id}`, { headers }).subscribe({
      next: (response) => {
        this.userProfile = response.data;
      },
      error: (error) => {
        console.error('The user could not be loaded.', error);
      }
    });
  }
}