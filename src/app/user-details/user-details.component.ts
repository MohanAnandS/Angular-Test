import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


interface User {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  followers_url: string;
  company: string | null; 
  location: string | null;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId: number | null = null;
  user: User | null = null;
  username: string | null = null;


  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username'); 
      if (this.username) {
        this.fetchUserDetails(this.username);
      }
    });
  }

  fetchUserDetails(username: string): void {
    this.http.get<User>(`https://api.github.com/users/${username}`).subscribe(
      (data) => {
        this.user = data; 
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}

