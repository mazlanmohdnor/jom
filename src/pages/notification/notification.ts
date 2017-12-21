import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { DeviceFeedback } from "@ionic-native/device-feedback";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Requestmodel } from "../../model/requestmodel";

@IonicPage()
@Component({
  selector: "page-notification",
  templateUrl: "notification.html"
})
export class NotificationPage {
  booking: any;
  child: any;
  riderequest = {} as Requestmodel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public devfeb: DeviceFeedback,
    public firebaseDB: AngularFireDatabase,
    public fire: AngularFireAuth
  ) {}

  ionViewDidLoad() {
    this.fire.auth.onAuthStateChanged(user => {
      //noti untuk ride request
      this.firebaseDB.database
        .ref()
        .child(`request/${user.uid}`).on("value", data => {
        this.riderequest = data.val();
        });
      
      //noti untuk booking
        this.firebaseDB.database
          .ref()
          .child(`approvedPassanger/${user.uid}`)
          .on("value", data => {
            this.booking = data.val();
          });
    })
  }  

  review(req) {
    // console.log(req.key);
    this.navCtrl.push("ReviewrequestPage", { request: req.key });
  }
}
