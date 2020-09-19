import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { }

  title = 'monthly-expense-tracker-ui';
  userList;

  ngOnInit() {
    this.http.get("http://localhost:8000/users")
      .subscribe((data) => {this.userList = data});
  }
}
