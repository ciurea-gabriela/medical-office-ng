import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {
  private title = 'Medical Office';

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
