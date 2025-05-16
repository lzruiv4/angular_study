import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { RouterOutlet } from '@angular/router';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: AuthInterceptor,
  //     multi: true,
  //   },
  // ],
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    //Make sure user info will be fetched
    // this.userService.loadUserInfo();
  }
}
