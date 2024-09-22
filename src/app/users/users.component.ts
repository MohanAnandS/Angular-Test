import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


interface User {
  id: number;
  login: string;
  avatar_url: string;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  totalRecords: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get<User[]>('https://api.github.com/users').subscribe(
      (data) => {
        this.users = data;
        this.totalRecords = data.length; 
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onPageChange(event: any) {
    this.currentPage = event.first / event.rows; 
  }

}
