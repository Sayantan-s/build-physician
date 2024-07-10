import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtWMlNHWufXi2weR1hYQTN9UjDqBOcV_4",
  authDomain: "chat-app-6a541.firebaseapp.com",
  databaseURL: "https://chat-app-6a541.firebaseio.com",
  projectId: "chat-app-6a541",
  storageBucket: "chat-app-6a541.appspot.com",
  messagingSenderId: "856152974268",
  appId: "1:856152974268:web:1f6e58076f79fc0a3f41b9",
  measurementId: "G-V7CZLQ2CRK",
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);

export default class Firebase {
  public static app = app;
  public static auth = getAuth();
}
