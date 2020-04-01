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
import { TextInput } from "react-native-gesture-handler";
import { CheckBox } from "react-native-elements";
import AffichageImage from "../components/affichageImage";

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
var database = firebase.database();

class ResultatCarteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idMedicament: "",
      troubleMed: "",
      posologieMatin: "",
      posologieMidi: "",
      posologieSoir: ""
    };
  }

  _recupererInfos() {
    var userId = firebase.auth().currentUser.uid;
    console.log(userId);
    let nomMed = this.props.navigation.state.params.nom;

    var refId = firebase
      .database()
      .ref("/users/" + userId + "/medicament/" + nomMed + "/idDesign/");
    let idDesignMed = "";
    refId.on(
      "value",
      function(snapshot) {
        idDesignMed = snapshot.val();
      },
      function(error) {}
    );

    var refTrouble = firebase
      .database()
      .ref("/users/" + userId + "/medicament/" + nomMed + "/trouble/");
    let troubleMed = "";
    refTrouble.on(
      "value",
      function(snapshot) {
        troubleMed = snapshot.val();
      },
      function(error) {}
    );

    var refPosoMatin = firebase
      .database()
      .ref("/users/" + userId + "/medicament/" + nomMed + "/posoMatin/");
    let posoMatinMed = "";
    refPosoMatin.on(
      "value",
      function(snapshot) {
        posoMatinMed = snapshot.val();
      },
      function(error) {}
    );

    this.setState({});
  }

  render() {
    this._recupererInfos();
    return (
      <View style={styles.container}>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  tuileStyle: {
    width: "90%",
    backgroundColor: "#61C7CC",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 25
  },
  textStyle: {
    fontSize: 40,
    color: "#30696D",
    fontWeight: "bold"
  },
  textInputStyle: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "80%",
    fontSize: 40,
    marginBottom: 10,
    marginTop: 20,
    shadowColor: "grey",
    elevation: 10
  },
  numberInputStyle: {
    backgroundColor: "white",
    width: "10%",
    fontSize: 50,
    shadowColor: "grey",
    elevation: 10,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10
  },
  pinkRoundStyle: {
    backgroundColor: "#CC3B95",
    width: 122,
    height: 122,
    borderRadius: 61,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10
  }
});

export default ResultatCarteScreen;
