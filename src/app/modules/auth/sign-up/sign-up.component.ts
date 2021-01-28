import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Service } from 'src/app/core/models/Service.model';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  hide=true;
  registerForm: FormGroup = null;
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      firstName :['',Validators.required],
      lastName:['',Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.registerForm.valid) {
      const payLoad : Service = {
        requestBody : this.registerForm.getRawValue()
      }
      this.httpService.apiPost('LOGIN',payLoad).subscribe(res=>{
        localStorage.setItem('userData',JSON.stringify(res));
      });
    }
  }
}
