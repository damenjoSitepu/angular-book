import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AlertService } from '../../services/utils/alert.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  @Input() title: string = '';
  @Input() description: string = '';

  constructor(private alertService: AlertService) {}

  close() {
    this.alertService.removePopup();
  }
}
