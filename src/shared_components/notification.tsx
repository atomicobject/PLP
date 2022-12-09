import React from 'react';
import {Button, View} from 'react-native';
import {onDisplayNotification} from '../core/services/notifee';
import {PushNotification} from '../types';

export const Notification = () => {
  const pushNotification: PushNotification = {
    title: 'Pair Lunch Notif',
    body: 'Is asking for a lunch',
  };
  return (
    <View>
      <Button
        title="Notification"
        onPress={() => onDisplayNotification(pushNotification)}
      />
    </View>
  );
};
