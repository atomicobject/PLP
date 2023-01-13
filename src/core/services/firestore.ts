import firestore from '@react-native-firebase/firestore';

export const queryFirestoreName = () =>
  firestore()
    .collection('users')
    .where('name', '==', 'viviana')
    .get()
    .then(querySnapshot => {
      console.log(querySnapshot);
    });
