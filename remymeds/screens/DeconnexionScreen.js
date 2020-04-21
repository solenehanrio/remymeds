import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "../components/header.js";
import Bouton from "../components/boutons";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBHzneokzpITS7U4BhNZOYDhw3FlRjEWAQ",
    authDomain: "remymeds.firebaseapp.com",
    databaseURL: "https://remymeds.firebaseio.com",
    projectId: "remymeds",
    storageBucket: "remymeds.appspot.com",
    messagingSenderId: "467972555435",
    appId: "1:467972555435:web:89042b2ccd7a5ec374adee",
    measurementId: "G-Z6SZ5VZGX8",
  });
}

class DeconnexionScreen extends React.Component {
  _deconnexion() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          optionBoutonGauche={3}
          optionBoutonDroit={2}
          titrePage={"DECONNEXION"}
        ></Header>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View
            style={{
              backgroundColor: "#61C7CC",
              width: "80%",
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 40,
            }}
          >
            <Text
              style={{ color: "#30696D", fontSize: 40, fontWeight: "bold" }}
            >
              Voulez vous quitter l'application ?
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "80%",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this._deconnexion();
                this.props.navigation.navigate("Connexion");
              }}
            >
              <Bouton texte={" Oui "}></Bouton>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Accueil");
              }}
            >
              <Bouton texte={" Non "}></Bouton>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DeconnexionScreen;
