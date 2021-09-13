import { Component, OnInit } from '@angular/core';
import {DoctorService} from "../doctor.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  // Variable to store shortLink from api response
  loading: boolean = false; // Flag variable
  file: File = File.prototype; // Variable to store file

  // Inject service
  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
  }

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.doctorService.setImageProfile(this.file);
    this.loading = !this.loading;
    console.log(this.file);
  }
}
