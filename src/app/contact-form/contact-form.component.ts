import { NgClass, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, HttpClientModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  http = inject(HttpClient);
  mailSended: boolean = false;
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
  

  post = {
    endPoint: 'https://ishakates.com/send-email.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
  
  onSubmit() {
    debugger
    if (this.myForm.valid) {
      this.http.post(this.post.endPoint, this.post.body(this.myForm.value), this.post.options)
        .subscribe({
          next: (_response: any) => {
            this.myForm.reset();
          },
          error: (error: any) => {
            console.error(error);
          },
          complete: () => {
            console.info('send post complete');
            this.mailSended = true;
            setTimeout(() => {
              this.mailSended = false;
            }, 3000)
          }
        });
    } else {
      console.log('Form not Valid');
      this.myForm.markAllAsTouched();
    }
  }

}
