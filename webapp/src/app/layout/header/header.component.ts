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


import { Component, ChangeDetectionStrategy, ViewContainerRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent  {

  // @ViewChild('testId', { read: ViewContainerRef }) private etestId;

  ngOnInit(): void {
    //debugger
    //let etestContainer=document.getElementById('testcontainer')
    
    // this.routes = JSON.parse(this.cs.ssGet('ROUTES', SessionTag.ROUTES));
  }

  // ngAfterViewInit(): void {
  //   debugger
  //   let ff=this.etestId;
  // }

}
