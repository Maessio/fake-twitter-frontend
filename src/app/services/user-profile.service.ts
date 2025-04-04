import { Injectable } from '@angular/core';
import { UserProfile } from '../interfaces/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private userProfile?: UserProfile;

  // Método para armazenar as informações do usuário
  setUserProfile(profile: UserProfile): void {
    this.userProfile = profile;
  }

  // Método para obter as informações do usuário
  getUserProfile(): UserProfile | undefined {
    return this.userProfile;
  }
}