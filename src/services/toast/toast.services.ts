import { ToastController } from "ionic-angular";
import { Injectable } from "@angular/core";

@Injectable()
export class ToastService {

    constructor(private toastCtrl: ToastController) {}

    /**
   * Shows the user a toast at the bottom of their device with the given message
   * @param msg The message to display to the user
   */
  showToast(msg: string) {
    let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000,
        position: 'bottom'
    });
    toast.present();
  }

  show(msg:string){ this.showToast(msg) }
}