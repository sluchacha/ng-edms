import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerError: string = '';
  genders: string[] = ['Male', 'Female'];
  departments: any[] = [
    { departmentID: 1, departmentName: 'Health' },
    { departmentID: 2, departmentName: 'Finance' },
    { departmentID: 3, departmentName: 'Agriculture' },
  ];

  user: any = {};

  constructor() {}

  ngOnInit(): void {}

  register() {}
}
