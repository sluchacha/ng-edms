import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { DemoNgComponentEventType } from '../../models/demo-ng-component-event-type';

@Component({
  selector: 'demo-ng',
  templateUrl: './demo-ng.component.html',
  styleUrls: ['./demo-ng.component.scss'],
})
export class DemoNgComponent implements OnInit {
  @Input()
  data = {};

  @Output()
  emitter = new Subject<DemoNgComponentEventType>();

  ngOnInit(): void {}

  ngOnDestroy() {
    this.emitter.unsubscribe();
  }

  onAction1() {
    this.emitter.next({
      cmd: 'action1',
      data: this.data,
    });
  }
}
