import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import {Platform, Alert} from 'react-native';
class Notification {
  constructor() {
    // this.notificationDisplay = null;
    this.notificationListener = null;
    this.notificationOpenedListener = null;
    this.navigation = null;
    this.status = null;
    this.data = null;
  }

  setNavigation = navigation => {
    this.navigation = navigation;
  };

  init() {
    this.checkPermission();
    this.createNotificationListeners();
  }

  release() {
    // this.notificationDisplay();
    try {
      this.notificationListener();
      this.notificationOpenedListener();
    } catch (error) {
      console.log('Release notification error', JSON.stringify(error));
    }
  }
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log('fcmToken:', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    console.log('fcmToken:', fcmToken);
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const {title, body, data} = notification;
        console.log('onNotification:');
        this.data = data;
        this.status = 'app-running';
        const localNotification = new firebase.notifications.Notification({
          sound: 'sampleaudio',
          show_in_foreground: true,
        })
          .setSound('sampleaudio.wav')
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setBody(notification.body);
        if (Platform.OS === 'android') {
          localNotification.android
            .setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
            // .android.setSmallIcon('ic_notification') // create this icon in Android Studio
            .android.setColor('#CDCDCD') // you can set a color here
            .android.setPriority(firebase.notifications.Android.Priority.High);
        }

        firebase
          .notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
      });

    const channel = new firebase.notifications.Android.Channel(
      'fcm_FirebaseNotifiction_default_channel',
      'Demo app name',
      firebase.notifications.Android.Importance.High,
    )
      .setDescription('Demo app description')
      .setSound('sampleaudio.wav');
    firebase.notifications().android.createChannel(channel);

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const {title, body, data} = notificationOpen.notification;
        if (this.status === 'app-running') {
          let member_away = JSON.parse(this.data.member_away);
          this.navigation.navigate('TrackingMap', {
            location: 'notificationService',
            idHanhTrinh: this.data.idHanhTrinh,
            member_away: member_away,
            time: this.data.time,
          });
        } else {
          let member_away = JSON.parse(data.member_away);
          this.navigation.navigate('TrackingMap', {
            location: 'notificationService',
            idHanhTrinh: data.idHanhTrinh,
            member_away: member_away,
            time: data.time,
          });
        }
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body, data} = notificationOpen.notification;
      console.log('getInitialNotification:');
      this.status = 'app-closed';
      Alert.alert(
        data.title,
        `${data.content}. Vui lòng vào thông báo để xem chi tiết`,
      );
    }
    firebase
      .notifications()
      .getInitialNotification()
      .then(async notificationOpen => {
        if (notificationOpen) {
          console.log(
            'Notification when app close',
            JSON.stringify(notificationOpen.notification.notificationId),
          );
          notificationOpen.notification.android.setBigText(
            notificationOpen.notification.body,
          );
        }
      });
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log('JSON.stringify:', JSON.stringify(message));
    });
  }
}

const notificationService = new Notification();
export default notificationService;
