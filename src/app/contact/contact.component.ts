import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    NgIf,
    InputTextareaModule,
    FloatLabelModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  constructor(private messageService: MessageService) {}
  showForm = false;
  value: string | undefined;

  onCreateRequest() {
    this.showForm = !this.showForm;
  }
  onSendMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Sent',
    });
    this.showForm = !this.showForm;
  }
}
