import React from 'react';
import {Button, View} from 'react-native';
import {queryFirestoreName} from '../core/services/firestore';
import {onDisplayNotification} from '../core/services/notifee';
import {PushNotification} from '../types';

export const Notification = () => {
  const pushNotification: PushNotification = {
    title: 'Pair Lunch Notification',
    body: 'Is asking for a lunch',
  };
  return (
    <View>
      <Button
        title="Notification"
        onPress={() => {
          queryFirestoreName();
          onDisplayNotification(pushNotification);
        }}
      />
    </View>
  );
};
