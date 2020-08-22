import { Component, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.scss']
})
export class BaseModalComponent implements OnDestroy {
  protected destroy$: Subject<void> = new Subject<void>();


  constructor(protected activeModal: NgbActiveModal) { }

  public onClose<T>(result?: T): void {
    this.activeModal.close(result);
  }

  public onDismiss<T>(reason?: T): void {
    this.activeModal.dismiss(reason);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
