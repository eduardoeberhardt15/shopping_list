import React, { useEffect, useRef } from 'react';
import * as Notification from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { Notifications } from 'expo';
import { Platform } from 'react-native';

export const getPushNotificationToken = async ():Promise<string | null> =>{

    if (Constants.isDevice) {

      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return null;
      }
      const token = (await Notification.getExpoPushTokenAsync()).data;
      console.log(token);

      if (Platform.OS === 'android') {
        Notification.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notification.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
    
        });
      }

      return token;
    
    }else {
        alert('Must use physical device for Push Notifications');
        return null;
    }
}


export const listenerNotification = () =>{ //"useNextNotificationsApi": true,

  Notification.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const notificationListener = useRef();
  const responseListener = useRef();
  
  useEffect(()=>{

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notification.addNotificationReceivedListener(notification => {
      console.log(notification.date)
      console.log(notification);
    });
    //Notifications.addListener(notification =>console.log(notification));
    

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notification.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    
    /*return () => {
      Notification.removeNotificationSubscription(notificationListener);
      Notification.removeNotificationSubscription(responseListener);
    };*/
    
  },[]);

}