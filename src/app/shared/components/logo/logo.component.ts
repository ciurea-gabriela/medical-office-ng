import {Component, Input, OnInit} from '@angular/core';
import {Patient} from '../../../model/patient.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  @Input() private title: string;

  constructor() {
  }

  ngOnInit() {
  }

}
