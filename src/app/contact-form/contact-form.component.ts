import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  screenWidth = window.innerWidth <= 400;
  
  

  constructor (private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      power: this.selectControl,
      email: ['', [Validators.required, Validators.email]],
      consume: ['', [Validators.required, Validators.minLength(2)]],
      feedback: ['', [Validators.maxLength(9000)]],
    });
  
    // Kreuzfeld-Validierung
    // this.myForm.get('consume')?.setValidators([this.validateConsumeOrFile]);
    // this.myForm.get('file')?.setValidators([this.validateConsumeOrFile]);
  }


  // fileValidator(control: any) {
  //   const file = control.value;
  //   if (file) {
  //     const fileExtension = file.name.split('.').pop().toLowerCase();
  //     const validExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
  //     console.log(fileExtension);
  //     if (!validExtensions.includes(fileExtension)) {
  //       return { invalidFileType: true };
  //     }
  //   }
  //   return null;
  // }

  // onFileChange(event: any): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     this.myForm.patchValue({
  //       file: file
  //     }, { emitEvent: false });
  //     this.myForm.get('file')?.updateValueAndValidity();
  //   }
  // }

  // get file() {
  //   return this.myForm.get('file');
  // }


  // validateConsumeOrFile = (control: AbstractControl): ValidationErrors | null => {
  //   const form = control.parent;
  //   if (!form) return null;
  
  //   const consume = form.get('consume')?.value;
  //   const file = form.get('file')?.value;
  
  //   // Validierung ist erfolgreich, wenn entweder Verbrauch oder Datei vorhanden ist
  //   return (consume || file) ? null : { consumeOrFileRequired: true };
  // };
  

  post = {
    endPoint: 'https://dealcheckers.de/send-email.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
  
  onSubmit() {
    console.log(this.myForm.value);
    if (this.myForm.valid) {
      this.http.post(this.post.endPoint, this.post.body(this.myForm.value), this.post.options)
        .subscribe({
          next: (_response: any) => {
            console.log('Response', _response);
            this.myForm.reset();
          },
          error: (error: any) => {
            console.error(error);
          },
          complete: () => {
            console.info('send post complete');
            alert('Formular wurde abgeschickt');
            this.mailSended = true;
            setTimeout(() => {
              this.mailSended = false;
            }, 3000)
          }
        });
    } else {
      alert('Formular ist nicht valide. Bitte überprüfen Sie die Eingaben.');
      console.log('Form is not valid');
      this.myForm.markAllAsTouched();
    }
  }

}
