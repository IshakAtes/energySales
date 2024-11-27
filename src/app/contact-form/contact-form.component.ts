import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  selectControl:FormControl = new FormControl('', Validators.required);
  myForm: FormGroup;
  

  constructor (private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      power: this.selectControl,
      email: ['', [Validators.required, Validators.email]],
      consume: ['', this.consumeOrFileRequired],
      file: [null],
      feedback: ['', [Validators.maxLength(9000)]],
    });
  }


  fileValidator(control: any) {
    const file = control.value;
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const validExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
      if (!validExtensions.includes(fileExtension)) {
        return { invalidFileType: true };
      }
    }
    return null;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.myForm.patchValue({
      file: file
    });
  }

  get file() {
    return this.myForm.get('file');
  }


  consumeOrFileRequired(control: AbstractControl): ValidationErrors | null {
    const consume = control.get('consume')?.value;
    const file = control.get('file')?.value;
  
    // Log the values for debugging
    console.log('Consume:', consume);
    console.log('File:', file);
  
    // If neither 'consume' nor 'file' is filled, return an error
    if (!consume && !file) {
      return { consumeOrFileRequired: true };
    }
  
    // Return null if validation passes (neither consume nor file is empty)
    return null;
  }
  

  onSubmit() {
    console.log(this.myForm.valid);
    if (this.myForm.valid) {
      console.log('Form submitted', this.myForm.value);
    } else {
      console.log('Form not Valid');
      this.myForm.markAllAsTouched(); // Markiert alle Felder, um Fehler zu zeigen
    }
  }
}
