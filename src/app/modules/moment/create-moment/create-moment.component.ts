import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Service } from 'src/app/core/models/Service.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-create-moment',
  templateUrl: './create-moment.component.html',
  styleUrls: ['./create-moment.component.scss'],
})
export class CreateMomentComponent implements OnInit {
  momentForm = null;
  tags = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.momentForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      tags: [[], [Validators.required]],
      description: ['', [Validators.required]],
      attachFiles: [null, Validators.required]
    });
  }

  submit() {

    if (this.momentForm.valid) {
      let formData = new FormData()

      formData.append('title', this.momentForm.value.title);
      formData.append('tags', JSON.stringify(this.momentForm.value.tags));
      formData.append('description', this.momentForm.value.description);
      formData.append('attachFiles', this.momentForm.value.attachFiles);

      let payload: Service = {
        requestBody: formData
      };

      this.httpService.apiPost('CREATE_MOMENTS', payload).subscribe((res) => {
        console.log(res);
        this.router.navigateByUrl('/moments')
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim();

    const index = this.tags.indexOf(value);
    if (index == -1 && value) {
      this.tags.push(value);
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.momentForm.patchValue({
      tags: this.tags,
    });
    this.momentForm.updateValueAndValidity();
  }

  remove(tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }

    this.momentForm.patchValue({
      tags: this.tags,
    });
    this.momentForm.updateValueAndValidity();
  }

  onFileSelected(event) {
    console.log(event[0])

    this.momentForm.patchValue({
      attachFiles: event[0]
    });
    this.momentForm.updateValueAndValidity();
  }
  onFileDropped(event) {
    console.log(event)
    this.momentForm.patchValue({
      attachFiles: this.tags,
    });
    this.momentForm.updateValueAndValidity();
  }
}
