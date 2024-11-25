import { NgClass } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormControl, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  selectControl:FormControl = new FormControl()
  myForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    phoneNumber: ['', [Validators.required]],
    power: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    consume: ['', Validators.required],
    feedback: ['']
  });


  constructor (private formBuilder: FormBuilder) {
  }

  onSubmit() {
    console.log('Form submitted', this.myForm.value);
    this.myForm.reset();
  }
}
