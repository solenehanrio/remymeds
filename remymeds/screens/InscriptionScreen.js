import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
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
    measurementId: "G-Z6SZ5VZGX8",
  });
}

var database = firebase.database();

class InscriptionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mdp: "", email: "", prenom: "", nom: "", error: false };
  }

  async _inscription(email, mdp) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, mdp)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        // [START_EXCLUDE]
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
          this.setState({ error: true });
        } else {
          alert(errorMessage);
          this.setState({ error: true });
        }
        // [END_EXCLUDE]
      });
  }

  _navigation() {
    if (this.state.error == false) {
      this.props.navigation.navigate("Connexion");
    }
  }

  async _donnees() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this._save(user.uid);
      }
    });
  }

  async _save(user) {
    var userId = user;
    firebase
      .database()
      .ref("/users/" + userId)
      .set({
        nom: this.state.nom,
        prenom: this.state.prenom,
        email: this.state.email,
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tuile}>
          <Text style={{ color: "#30696d", fontSize: 35 }}>Votre nom :*</Text>
          <TextInput
            style={styles.textInputStyle}
            onSubmitEditing={(text) => {
              this.state.nom = text.nativeEvent.text;
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
            onSubmitEditing={(text) => {
              this.state.prenom = text.nativeEvent.text;
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
            onSubmitEditing={(text) => {
              this.state.email = text.nativeEvent.text;
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
            onSubmitEditing={(text) => {
              this.state.mdp = text.nativeEvent.text;
            }}
            placeholder="entrez un mot de passe"
            secureTextEntry={true}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.touchableOpacityStyle}
          onPress={() => {
            this._inscription(this.state.email, this.state.mdp);
            this._donnees();
            this._navigation();
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
    justifyContent: "center",
  },
  tuile: {
    backgroundColor: "#61C7CC",
    width: Dimensions.get("screen").width - 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  textInputStyle: {
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: "white",
    width: Dimensions.get("screen").width - 150,
    borderRadius: 25,
    fontSize: 35,
  },
});

export default InscriptionScreen;
