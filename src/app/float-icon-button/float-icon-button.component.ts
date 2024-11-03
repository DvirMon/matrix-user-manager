import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-float-icon-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './float-icon-button.component.html',
  styleUrls: ['./float-icon-button.component.scss']
})
export class FloatIconButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
