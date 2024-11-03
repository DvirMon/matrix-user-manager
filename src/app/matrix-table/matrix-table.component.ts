import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-matrix-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matrix-table.component.html',
  styleUrls: ['./matrix-table.component.scss']
})
export class MatrixTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
