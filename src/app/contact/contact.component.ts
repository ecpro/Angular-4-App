import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Feedback, ContactType } from "../shared/feedback";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  constructor(private _fb: FormBuilder) {
    this.createForm();
    console.log(this.feedbackForm);
  }

  ngOnInit() {

  }

  createForm() {
    this.feedbackForm = this._fb.group({
      firstname: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
      lastname: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ['', Validators.required]
    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?:any) {
    if(!this.feedbackForm) return;
    const form = this.feedbackForm;
    for(const field in this.formErrors) {
      // clear previous error messages if any
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && control.invalid) {
        const message = this.validationMessages[field];
        for(const key in control.errors) {
          this.formErrors[field] += message[key] + '';
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.markAsPristine();
    this.feedbackForm.markAsUntouched();
  }

}
