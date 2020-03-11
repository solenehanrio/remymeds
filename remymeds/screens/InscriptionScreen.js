import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import * as firebase from "firebase/app";
import Bouton from "../components/boutons";
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
    measurementId: "G-Z6SZ5VZGX8"
  });
}

var database = firebase.database();

class InscriptionScreen extends React.Component {
  static navigationOptions = {
    title: "Création de compte",
    headerTitleStyle: { fontWeight: "bold" },
    headerStyle: { justifyContent: "center", backgroundColor: "#CC3B95" },
    headerLeft: (
      <Image
        style={{ width: 40, resizeMode: "contain" }}
        source={require("../includes/logo_petit_V1.png")}
      ></Image>
    ),
    headerTintColor: "white"
  };

  constructor(props) {
    super(props);
    email = "";
    mdp = "";
    prenom = "";
    nom = "";
  }

  _inscription(email, mdp) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, mdp)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
  }

  _passagePageAccueil() {
    if (firebase.auth().currentUser !== null) {
      this.props.navigation.navigate("Accueil");
    }
  }
  _enregistrementDonnees(n, p) {
    if (firebase.auth().currentUser !== null) {
      var userId = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref("users/" + userId)
        .set({ nom: n, prenom: p });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tuile}>
          <Text style={{ color: "#30696d", fontSize: 35 }}>Votre nom :*</Text>
          <TextInput
            style={styles.textInputStyle}
            onSubmitEditing={text => {
              this.nom = text.nativeEvent.text;
            }}
            placeholder="entrez votre nom"
          ></TextInput>
        </View>
        <View style={styles.tuile}>
          <Text style={{ color: "#30696d", fontSize: 35 }}>
            Votre prénom :*
          </Text>
          <TextInput
            style={styles.textInputStyle}
            onSubmitEditing={text => {
              this.prenom = text.nativeEvent.text;
            }}
            placeholder="entrez votre prenom"
          ></TextInput>
        </View>
        <View style={styles.tuile}>
          <Text style={{ color: "#30696d", fontSize: 35 }}>
            Votre Adresse mail:*
          </Text>
          <TextInput
            style={styles.textInputStyle}
            onSubmitEditing={text => {
              this.email = text.nativeEvent.text;
            }}
            placeholder="entrez votre adresse mail"
          ></TextInput>
        </View>
        <View style={styles.tuile}>
          <Text style={{ color: "#30696d", fontSize: 35 }}>
            Votre mot de passe :*
          </Text>
          <TextInput
            style={styles.textInputStyle}
            onSubmitEditing={text => {
              this.mdp = text.nativeEvent.text;
            }}
            placeholder="entrez un mot de passe"
            secureTextEntry={true}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.touchableOpacityStyle}
          onPress={() => {
            this._inscription(this.email, this.mdp),
              this._enregistrementDonnees(this.nom, this.prenom),
              this._passagePageAccueil();
          }}
        >
          <Bouton texte={"M'inscrire"}></Bouton>
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
  },
  tuile: {
    backgroundColor: "#61C7CC",
    width: Dimensions.get("screen").width - 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50
  },
  textInputStyle: {
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: "white",
    width: Dimensions.get("screen").width - 150,
    borderRadius: 25,
    fontSize: 35
  }
});

export default InscriptionScreen;
