import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-thank-you-modal',
  templateUrl: './thank-you-modal.component.html',
  styleUrls: ['./thank-you-modal.component.scss']
})
export class ThankYouModalComponent {
  @Input() public orderID: number;

  constructor(private activeModal: NgbActiveModal) {

  }

  public onClose(): void {
    this.activeModal.close();
  }

}
