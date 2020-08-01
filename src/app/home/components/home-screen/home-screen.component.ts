import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {
  public title = 'Medical Office';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public goTo(path: string): void {
    this.router.navigate([path]);
  }
}
