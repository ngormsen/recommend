import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Group } from '../group.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-new-group-dialog',
  templateUrl: './create-new-group-dialog.component.html',
  styleUrls: ['./create-new-group-dialog.component.scss']
})
export class CreateNewGroupDialogComponent implements OnInit {
  groupForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<CreateNewGroupDialogComponent>) {
  }

  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      groupName: new FormControl(''),
      privacySetting: new FormControl('')
    })
  }

  onSubmitGroup(groupName: string, privacySetting: string): void {
    console.log("onSubmitGroup getriggert.", groupName, privacySetting);

    if (privacySetting === "private") {
      this.userService.addGroup(groupName, true);
    } else {
      this.userService.addGroup(groupName, false);
    }
  }

}
