import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
  Output,
  EventEmitter,
} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-moal',
  templateUrl: 'modal.component.html',
})
export class ModalComponent implements OnInit {
  @ViewChild('modal', { static: true })
  modal: ElementRef;

  title = '';
  description = '';
  @Output()
  callback = new EventEmitter();

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      $(this.modal.nativeElement).modal('show');
      $(this.modal.nativeElement).on('hidden.bs.modal', () => {
        this.ngZone.run(() => this.callback.emit());
      });
    });
  }
}
