import { Component, Input } from '@angular/core';

import { BaseModalComponent } from 'shared/modals/base-modal/base-modal.component';

@Component({
  selector: 'app-thank-you-modal',
  templateUrl: './thank-you-modal.component.html',
  styleUrls: ['./thank-you-modal.component.scss']
})
export class ThankYouModalComponent extends BaseModalComponent {
  @Input() public orderID: number;

}
