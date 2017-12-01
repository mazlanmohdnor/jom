import { LocalNotifications } from "@ionic-native/local-notifications";
import { DeviceFeedback } from "@ionic-native/device-feedback";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  Events
} from "ionic-angular";
import { Profile } from "../../model/profile";
declare var cordova;
@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  noti: number;
  trips: any;
  user = {} as Profile;

  notificationAlreadyReceived = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
    private alertCtrl: AlertController,
    public event: Events,
    private deviceFeedback: DeviceFeedback,
    private localNotifications: LocalNotifications
  ) {}

  ionViewDidLoad() {
    // this.checkNoti();
    this.checkProfile();

    this.firebaseDB.database.ref("offerRides/").on("value", data => {
      this.trips = data.val();
    });
  }

  async checkNoti() {
    //check notification
    let ref = await this.firebaseDB.database.ref(
      `request/${this.fire.auth.currentUser.uid}`
    );
    ref.on("value", data => {

      // data.forEach(child=>{
      //    // key will be "ada" the first time and "alan" the second time
      // console.log('child.key: ', child.key);
      // // childData will be the actual contents of the child
      // console.log('child.val(): ', child.val());
      // })
      // //1st for is for getting the route id
      // console.log('dataval', data.val());
      // console.log(data.child(data.key).val());
      // for(var keys in data.val()){
      //   console.log("data key" + keys.length);
      //   // console.log("data value" +  data.val()[keys]);

      //   //2nd for is to get the array of
      //   for (const key in data.val()[keys]) {
      //     console.log("data key inner" + key.length);
      //   }
    //     let arr = Object.keys(data.val())
    //     console.log(arr);
      
       
    // }

      let arr = Object.keys(data.val()).map(key => data.val()[key]);
      // console.log('test', arr);
      this.noti = arr.length;

      // if (arr) {
      //   //Inbox style
      //   cordova.plugins.notification.local.schedule({
      //     id: 1,
      //     title: 'You got new request!',
      //     text: 'Text',
      //     headsup: true,
      //     vibration: true,
      //     inbox: {
      //       lines: ["Line1", "Line2", "Line3"], //You can add as many lines as the notification allows
      //       summary: "2 More", //Optional summary line that shows at the bottom of the notification
      //       title: "3 Messages" //Optional title to replace the notification on expand
      //     }
      //   });
      // }
    });
  }

  async checkProfile() {
    let ref = await this.firebaseDB.database.ref(
      `userProfile/${this.fire.auth.currentUser.uid}`
    );
    ref.once("value", data => {
      //check to complete profile, if not, ask user to complete first
      if (!data.val().profileComplete) {
        let alert = this.alertCtrl.create({
          title: `Hi ${data.val().fullname}`,
          message:
            "Welcome to JomKelas application, now going to class much easier. Please complete your profile to continue using this application",
          buttons: [
            {
              text: "Later",
              role: "cancel",
              handler: () => {
                this.deviceFeedback.acoustic();
                console.log("Cancel clickedsdasd");
              }
            },
            {
              text: "Ok",
              handler: () => {
                this.deviceFeedback.acoustic();
                this.navCtrl.push("UpdateprofilePage", {
                  profile: data.val()
                });
              }
            }
          ]
        });
        alert.present();
      } else {
        console.log("profile complete");
      }
    });
  }

  goDetail(trip) {
    this.deviceFeedback.acoustic();
    this.navCtrl.push("TripdetailPage", { trip: trip });
  }

  offerride() {
    this.deviceFeedback.acoustic();
    this.navCtrl.push("OfferridePage");
  }

  notification() {
    this.deviceFeedback.acoustic();
    this.navCtrl.push("NotificationPage");
  }
  findride() {
    this.deviceFeedback.acoustic();
  }
}
