import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import {DetailedRestaurantView} from '../screens/drv';
import {HomeScreen} from '../screens/home';
import {AtomicPeopleView} from '../screens/profile';
import {TabNavigator} from './BottomTabNavigator';

const RootStack = createStackNavigator();

async function onGoogleButtonPress() {
  GoogleSignin.configure({
    webClientId: process.env.WEB_CLIENT_ID,
    iosClientId: process.env.IOS_CLIENT_ID,
  });
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

const MyGoogleSignIn: React.FC = () => {
  return (
    <View style={{marginTop: 150}}>
      <Button
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log('Signed in with Google!'),
          )
        }
      />
    </View>
  );
};

export const RootNavigator: React.FC = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <>
      {!user ? (
        <MyGoogleSignIn />
      ) : (
        <RootStack.Navigator>
          <RootStack.Screen
            name={'Back'}
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name={'Launch'}
            component={HomeScreen}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#fd4f57',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20,
              },
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name={'Detailed Restaurant View'}
            component={DetailedRestaurantView}
            options={{
              title: "Let's Eat!",
              headerStyle: {
                backgroundColor: '#fd4f57',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20,
              },
            }}
          />
          <RootStack.Screen
            name={'Atomic People View'}
            component={AtomicPeopleView}
            options={{
              title: 'Atom Info',
              headerStyle: {
                backgroundColor: '#fd4f57',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20,
              },
            }}
          />
        </RootStack.Navigator>
      )}
    </>
  );
};
