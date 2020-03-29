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

class InformationMedicamentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nomMed: "", troubleMed: "" };
  }
  _ajoutMedicament(nom, t) {
    if (firebase.auth().currentUser !== null) {
      var userId = firebase.auth().currentUser.uid;
      var idMed = nom;
      firebase
        .database()
        .ref("users/" + userId + "medicament/")
        .set({ id: idMed });
      firebase
        .database()
        .ref("medicament/" + idMed)
        .set({ trouble: t });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: "15%", resizeMode: "contain" }}>
          <AffichageImage
            sourceIm={this.props.navigation.state.params.idMed}
          ></AffichageImage>
        </View>
        <View style={styles.tuileStyle}>
          <Text>Nom du medicament</Text>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onEndEditing={text =>
              this.setState({ nomMed: text.nativeEvent.text })
            }
          ></TextInput>
        </View>
        <View style={styles.tuileStyle}>
          <Text>Trouble associé</Text>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onEndEditing={text =>
              this.setState({ troubleMed: text.nativeEvent.text })
            }
          ></TextInput>
        </View>

        <View>
          <TouchableOpacity
            style={styles.touchableOpacityStyle}
            onPress={() => {
              this._ajoutMedicament(this.state.nomMed, this.state.troubleMed);
            }}
          >
            <Bouton texte={"M'inscrire"}></Bouton>
          </TouchableOpacity>
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
    justifyContent: "center"
  },
  tuileStyle: {
    width: "90%",
    backgroundColor: "#61C7CC",
    height: "20%",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default InformationMedicamentScreen;
