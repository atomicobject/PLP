import notifee from '@notifee/react-native';
import {PushNotification} from '../../types';

export const onDisplayNotification = async (
  pushNotification: PushNotification,
) => {
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: pushNotification.title,
    body: pushNotification.body,
    android: {
      channelId,
      smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
    ios: {
      // attach image of dylan goings
      attachments: [
        {
          url: 'https://i.imgur.com/4Z0jZ0M.jpg',
        },
      ],
    },
  });
};
