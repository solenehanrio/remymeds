import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Bouton from "../components/boutons";
import CarteRecto from "../components/carteRecto";
import CarteVerso from "../components/carteVerso";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Value } from "react-native-reanimated";
import Header from "../components/header.js";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBHzneokzpITS7U4BhNZOYDhw3FlRjEWAQ",
    authDomain: "remymeds.firebaseapp.com",
    databaseURL: "https://remymeds.firebaseio.com",
    projectId: "remymeds",
    storageBucket: "remymeds.appspot.com",
    messagingSenderId: "467972555435",
    appId: "1:467972555435:web:89042b2ccd7a5ec374adee",
    measurementId: "G-Z6SZ5VZGX8"
  });
}

class OrdonnanceScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          optionBoutonGauche={3}
          optionBoutonDroit={2}
          titrePage={"ORDONNANCE"}
        ></Header>
        <View style={{ flexDirection: "row" }}>
          <CarteRecto
            hauteurCarte={300}
            sourceIm={"ov"}
            nomMedicament={"Clampse"}
          ></CarteRecto>

          <CarteVerso
            hauteurCarte={300}
            sourceIm={"ov"}
            nomMedicament={"Clampse"}
            trouble={"Micose"}
            posoMatin={""}
            posoMidi={""}
            posoSoir={"1"}
          ></CarteVerso>
        </View>
        <TouchableOpacity
          style={styles.touchableOpacityStyle}
          onPress={() => {
            this.props.navigation.navigate("CreationMedicament");
          }}
        >
          <Bouton texte={"Créer un nouveau \n médicament"}></Bouton>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default OrdonnanceScreen;
