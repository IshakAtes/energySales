import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

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
      consume: [''],
      file: [null],
      feedback: ['', [Validators.maxLength(9000)]],
    });
  
    // Kreuzfeld-Validierung hinzufügen
    this.myForm.get('consume')?.setValidators([this.validateConsumeOrFile]);
    this.myForm.get('file')?.setValidators([this.validateConsumeOrFile]);
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


  validateConsumeOrFile = (control: AbstractControl): ValidationErrors | null => {
    const form = control.parent;
    if (!form) return null;
  
    const consume = form.get('consume')?.value;
    const file = form.get('file')?.value;
  
    return (!consume && !file) 
      ? { consumeOrFileRequired: true } 
      : null;
  };
  

  onSubmit() {
    console.log(this.myForm.valid);
    console.log('Konsum', this.myForm.value.consume);
    
    if (this.myForm.valid) {
      console.log('Form submitted', this.myForm.value);
    } else {
      console.log('Form not Valid');
      this.myForm.markAllAsTouched(); // Markiert alle Felder, um Fehler zu zeigen
    }
  }
}
