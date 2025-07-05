import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  userInfo: any;
  constructor(private homeService: HomeService){}

  ngOnInit(): void {
    this.homeService.getUserInfo().subscribe(
      (data) => {
        this.userInfo = data;
      },
      (error) => {
        console.error('Error fetching user info:', error);
      }
    );
  }

}
