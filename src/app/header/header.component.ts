import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input()
  openDialog!: () => void;
  @Input()
  actionTitle!: string;
  
  constructor(private dialog: MatDialog) {

  }
}
