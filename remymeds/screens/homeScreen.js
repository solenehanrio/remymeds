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
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
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

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  _afficherPrenom() {
    if (firebase.auth().currentUser.uid !== null) {
      var userId = firebase.auth().currentUser.uid;
      console.log(userId);
      var ref = firebase.database().ref("/users/" + userId + "/prenom/");
      let prenom = "";
      ref.on(
        "value",
        function(snapshot) {
          prenom = snapshot.val();
        },
        function(error) {}
      );
      console.log(prenom);
    } else {
      console.log(firebase.auth().currentUser.uid);
      return "";
    }
  }
  render() {
    console.log(firebase.auth().currentUser.uid);
    this._afficherPrenom();
    return (
      <View
        style={{
          alignItems: "center",
          marginBottom: 10
        }}
      >
        <Header
          optionBoutonGauche={1}
          optionBoutonDroit={2}
          titrePage={"ACCUEIL"}
          nav={this.props.navigation}
        ></Header>
        <TouchableOpacity
          style={styles.touchableOpacityStyle}
          onPress={() => {
            this.props.navigation.navigate("Ordonnance");
          }}
        >
          <Bouton texte={"Accéder à l'ordonnance"}></Bouton>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{
              width: 300,
              height: 300,
              resizeMode: "contain",
              marginRight: 82,
              marginBottom: 0,
              marginTop: 0
            }}
            source={require("../includes/logo_MEDMORY.png")}
          ></Image>
          <Image
            style={{
              width: 300,
              height: 300,
              resizeMode: "contain",
              marginTop: 0,
              marginBottom: 0
            }}
            source={require("../includes/logo_posolitaire.png")}
          ></Image>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={styles.touchableOpacityStyle}
            onPress={() => {
              this.props.navigation.navigate("Medmory");
            }}
          >
            <Bouton texte={"Jouer au \nMed'Mory"}></Bouton>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableOpacityStyle}
            onPress={() => {
              this.props.navigation.navigate("Ordonnance");
            }}
          >
            <Bouton texte={"Jouer au \n Posolitaire"}></Bouton>
          </TouchableOpacity>
        </View>

        <View style={styles.tuile}>
          <Text style={styles.titreTuileStyle}>Statistiques</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.cadreStatStyle}></View>
            <View style={styles.cadreStatStyle}></View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: "contain",
                  marginTop: 10,
                  marginBottom: 0,
                  marginLeft: 10
                }}
                source={require("../includes/trophy.png")}
              ></Image>
              <Text style={styles.textTuileStyle}>Meilleur Score</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: "contain",
                  marginTop: 10,
                  marginLeft: 120,
                  marginBottom: 0
                }}
                source={require("../includes/trophy.png")}
              ></Image>
              <Text style={styles.textTuileStyle}>Meilleur Score</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.cadreScoreStyle}></View>
            <View style={styles.cadreScoreStyle}></View>
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
    alignItems: "center"
  },
  tuile: {
    backgroundColor: "#61C7CC",
    width: Dimensions.get("screen").width - 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  textInputStyle: {
    marginTop: 30,
    backgroundColor: "white",
    width: Dimensions.get("screen").width - 150,
    borderRadius: 10,
    fontSize: 35
  },
  touchableOpacityStyle: {
    marginRight: 90,
    marginLeft: 90
  },
  titreTuileStyle: {
    fontSize: 50,
    color: "#30696D",
    marginTop: 10
  },
  textTuileStyle: {
    fontSize: 30,
    color: "#30696D",
    marginLeft: 20,
    marginTop: 20,
    marginRight: 10
  },
  cadreStatStyle: {
    backgroundColor: "white",
    width: 300,
    height: 200,
    marginRight: 50,
    marginLeft: 50,
    borderRadius: 20
  },
  cadreScoreStyle: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 150,
    marginRight: 150,
    marginBottom: 30,
    marginTop: 10
  }
});

export default HomeScreen;
