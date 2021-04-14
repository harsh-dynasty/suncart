import * as firebase from 'firebase';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBLe0ntR1XkJ1OV_SnqijBBYs7aBhQ8unQ",
    authDomain: "ecom-react-native.firebaseapp.com",
    projectId: "ecom-react-native",
    storageBucket: "ecom-react-native.appspot.com",
    messagingSenderId: "922536411885",
    appId: "1:922536411885:web:61d572e43add6eab81c2e4"
  };

  let app
if(firebase.apps.length===0){
    app=firebase.initializeApp(firebaseConfig);
}else{
    app=firebase.app()
}

const db=app.firestore();

export {db}