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
      consume: ['', [Validators.required, Validators.minLength(2)]],
      file: [null],
      feedback: ['', [Validators.maxLength(9000)]],
    });
  
    // Kreuzfeld-Validierung
    // this.myForm.get('consume')?.setValidators([this.validateConsumeOrFile]);
    // this.myForm.get('file')?.setValidators([this.validateConsumeOrFile]);
  }


  fileValidator(control: any) {
    const file = control.value;
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const validExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
      console.log(fileExtension);
      if (!validExtensions.includes(fileExtension)) {
        return { invalidFileType: true };
      }
    }
    return null;
  }

  onFileChange(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.myForm.patchValue({
        file: file
      }, { emitEvent: false });
      this.myForm.get('file')?.updateValueAndValidity();
    }
  }

  get file() {
    return this.myForm.get('file');
  }


  // validateConsumeOrFile = (control: AbstractControl): ValidationErrors | null => {
  //   const form = control.parent;
  //   if (!form) return null;
  
  //   const consume = form.get('consume')?.value;
  //   const file = form.get('file')?.value;
  
  //   // Validierung ist erfolgreich, wenn entweder Verbrauch oder Datei vorhanden ist
  //   return (consume || file) ? null : { consumeOrFileRequired: true };
  // };
  

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
    if (this.myForm.valid) {
      const formData = new FormData();
      
      // Alle Formularfelder hinzufügen
      Object.keys(this.myForm.controls).forEach(key => {
        const control = this.myForm.get(key);
        if (key === 'file' && control?.value) {
          // Datei separat hinzufügen
          formData.append('file', control.value, control.value.name);
        } else if (control?.value !== null && control?.value !== undefined) {
          formData.append(key, control.value);
        }
      });
  
      // Senden mit FormData statt JSON
      this.http.post(this.post.endPoint, formData)
        .subscribe({
          next: (_response: any) => {
            this.myForm.reset();
          },
          error: (error: any) => {
            console.error(error);
          },
          complete: () => {
            console.info('send post complete');
            alert('Formular wurde Abgeschickt');
            this.mailSended = true;
            setTimeout(() => {
              this.mailSended = false;
            }, 3000)
          }
        });
    } else {
      alert('Formular nicht Valide');
      console.log('Form not Valid');
      this.myForm.markAllAsTouched();
    }
  }

}
