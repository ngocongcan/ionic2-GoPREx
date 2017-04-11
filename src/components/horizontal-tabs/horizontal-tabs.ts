import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'horizontal-tabs',
  templateUrl: 'horizontal-tabs.html'
})
export class HorizontalTabsComponent {
  @Input() componentId: string;
  @Input() tabMenu: any
  @Output() tabClickEvent = new EventEmitter();

  constructor() {
  }

  onTabClick(index){
    this.tabClickEvent.emit({index: index});
  }

}
