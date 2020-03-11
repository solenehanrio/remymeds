import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Bouton from "../components/boutons";
import { TextInput } from "react-native-gesture-handler";
import * as firebase from "firebase/app";
import "firebase/auth";

//import firebaseConfig from "../helpers/firebaseConfig.js";
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

class ConnexionScreen extends React.Component {
  static navigationOptions = {
    title: "Connexion",
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
    mdp = "";
    email = "";
  }

  _connexion(email, mdp) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, mdp)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = firebase.auth.Error.message;
        alert(errorMessage);
        alert(errorCode);
      });
  }

  _passagePageAccueil() {
    if (firebase.auth().currentUser !== null) {
      this.props.navigation.navigate("Accueil");
    }
  }
  _deconnexion() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
      });
  }

  render() {
    return (
      <View
        style={{
          alignItems: "center",
          marginBottom: 10
        }}
      >
        <Image
          source={require("../includes/logo_V2.png")}
          style={{
            width: 500,
            resizeMode: "contain",
            marginTop: 40,
            marginBottom: 40
          }}
        ></Image>

        <View style={styles.tuile}>
          <TextInput
            style={styles.textInputStyle}
            onEndEditing={text => (this.email = text.nativeEvent.text)}
            placeholder="entrez votre adresse mail"
          ></TextInput>
          <TextInput
            style={styles.textInputStyle}
            onEndEditing={text => (this.mdp = text.nativeEvent.text)}
            placeholder="entrez votre mot de passe"
            secureTextEntry={true}
          ></TextInput>

          <TouchableOpacity
            style={styles.touchableOpacityStyle}
            onPress={() => {
              this._connexion(this.email, this.mdp), this._passagePageAccueil();
            }}
          >
            <Bouton texte={"Se connecter"}></Bouton>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.touchableOpacityStyle}
          onPress={() => {
            this.props.navigation.navigate("Inscription");
          }}
        >
          <Bouton texte={"S'inscrire"}></Bouton>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchableOpacityStyle}
          onPress={() => {
            this._deconnexion(), console.log(firebase.auth().currentUser.uid);
          }}
        >
          <Bouton texte={"Se déconnecter"}></Bouton>
        </TouchableOpacity>
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
    marginTop: 70,
    marginBottom: 50
  }
});

export default ConnexionScreen;
