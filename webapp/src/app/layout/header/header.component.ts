// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {}
