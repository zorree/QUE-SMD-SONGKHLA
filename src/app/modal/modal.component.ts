import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() datas: any;

  data: any

  balanceinput: any

  constructor(private modalctrl: ModalController) { }

  ngOnInit() {
    this.balanceinput = new FormControl(this.datas, Validators.required);
  }

  dismissModal() {
    this.modalctrl.dismiss(null)
  }

  onDeposit() {
    this.data = this.balanceinput.value
    this.modalctrl.dismiss(this.balanceinput.value)
    this.modalctrl.dismiss()
  }

}
