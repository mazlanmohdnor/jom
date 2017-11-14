import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OfferRideModel } from "./../../model/offerridemodel";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-tripdetail",
  templateUrl: "tripdetail.html"
})
export class TripdetailPage {
  trip = {} as OfferRideModel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public iab:InAppBrowser
  ) {}

  ionViewDidLoad() {
    this.trip = this.navParams.get("trip");
    console.log(this.trip);
  }
  whatsapp(phone) {
    console.log(phone);
    this.iab.create(`https://api.whatsapp.com/send?phone=6${phone}&text=hai%0D%0Anama+saya+mohd+mazlan%0D%0Asaya+berminat+nak+ride+kl+-+selangor+%3A+22%3A20AM`,"_system")
  }
}
