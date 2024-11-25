import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  selectControl:FormControl = new FormControl()
  myForm = this.formBuilder.group({
    name: '',
    lastName: '',
    phoneNumber: '',
    power: this.selectControl,
    email: '',
    consume: '',
    feedback: ''
  });
  // myForm: formModel = this.formBuilder.group({
  //   name: '',
  //   lastName: '',
  //   phoneNumber: '',
  //   power: this.selectControl,
  //   email: '',
  //   consume: '',
  //   feedback: ''
  // })

  constructor (private formBuilder: FormBuilder) {
  }

  onSubmit() {
    console.log('Form submitted', this.myForm.value);
  }
}
