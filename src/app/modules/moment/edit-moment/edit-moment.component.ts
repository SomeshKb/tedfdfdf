import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/core/models/Service.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.scss']
})
export class EditMomentComponent implements OnInit {

  momentForm = null;
  tags = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  momentData = null;
  momentId: string = null;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.momentId = this.route.snapshot.paramMap.get('id');
    console.log(this.momentId)
    this.getMomentData(this.momentId);
  }
  createForm() {
    this.momentForm = this.formBuilder.group({
      title: [this.momentData ? this.momentData.title : '', [Validators.required]],
      tags: [this.momentData ? this.momentData.tags : [], [Validators.required]],
      description: [this.momentData ? this.momentData.description : '', [Validators.required]],
      attachFiles: [null]
    });
    this.tags = this.momentData.tags;
    this.momentForm.patchValue({
      tags: this.tags,
    });
  }

  getMomentData(id) {
    let serviceParams: Service = {
      dynamicUrlParams: {
        id: id
      }
    }
    this.httpService.apiGet('GET_SINGLE_MOMENTS', serviceParams).subscribe((res: any) => {
      this.momentData = res.data;
      this.createForm();

    })
  }

  submit() {
    console.log(this.momentForm.value);

    if (this.momentForm.valid) {
    
      let formData = new FormData()

      formData.append('title', this.momentForm.value.title);
      formData.append('tags', JSON.stringify(this.momentForm.value.tags));
      formData.append('description', this.momentForm.value.description);
      if( this.momentForm.value.attachFiles ) {
        formData.append('attachFiles', this.momentForm.value.attachFiles);
      }

      const payload: Service = {
        requestBody: formData,
        dynamicUrlParams: {id:this.momentId}
      };


      this.httpService.apiPut('UPDATE_MOMENTS',payload ).subscribe((res) => {
        console.log(res);
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
