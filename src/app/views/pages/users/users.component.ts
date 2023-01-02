import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setData();
  }

  setData(): void {
    this.users = [
      {
        id: 2439,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
      },
      {
        id: 2440,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@email.com',
      },
      {
        id: 2441,
        firstName: 'Ime',
        lastName: 'Prezime',
        email: 'imeprezime@email.com',
      },
    ];
  }

  onClick(id: number): void {
    this.router.navigate(['/pages/user-settings', id]);
  }
}
