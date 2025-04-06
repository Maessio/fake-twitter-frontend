import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Input() open = false;
  @Input() title = '';
  @Input() message = '';
  
  close() {
    this.open = false;
  }

}
