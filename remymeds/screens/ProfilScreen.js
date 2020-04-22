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

class ProfilScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      prenom: "",
      email: "",
    };
  }

  async _recupererNom() {
    var userId = await firebase.auth().currentUser.uid;

    var refId = await firebase.database().ref("/users/" + userId + "/nom/");
    let name = "";
    name = await refId.once(
      "value",
      (snapshot) => {
        name = snapshot.val();
      },
      function (error) {}
    );
    const nameString = JSON.stringify(name);
    const unquoted = nameString.replace('"', "");
    const newUnquoted = unquoted.replace('"', "");
    await this.setState({ nom: newUnquoted });
  }

  async _recupererPrenom() {
    var userId = await firebase.auth().currentUser.uid;

    var refId = await firebase.database().ref("/users/" + userId + "/prenom/");
    let surname = "";
    surname = await refId.once(
      "value",
      (snapshot) => {
        surname = snapshot.val();
      },
      function (error) {}
    );
    const surnameString = JSON.stringify(surname);
    const unquoted = surnameString.replace('"', "");
    const newUnquoted = unquoted.replace('"', "");
    await this.setState({ prenom: newUnquoted });
  }

  async _recupererEmail() {
    var userId = await firebase.auth().currentUser.uid;

    var refId = await firebase.database().ref("/users/" + userId + "/email/");
    let mail = "";
    mail = await refId.once(
      "value",
      (snapshot) => {
        mail = snapshot.val();
      },
      function (error) {}
    );
    const mailString = JSON.stringify(mail);
    const unquoted = mailString.replace('"', "");
    const newUnquoted = unquoted.replace('"', "");
    await this.setState({ email: newUnquoted });
  }

  componentDidMount() {
    this._recupererNom();
    this._recupererPrenom();
    this._recupererEmail();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          optionBoutonGauche={3}
          optionBoutonDroit={2}
          titrePage={"PROFIL"}
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
              Données Personnelles
            </Text>
          </View>
          <View
            style={{
              width: "80%",
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomColor: "black",
              borderBottomWidth: 1,
            }}
          >
            <View>
              <Text
                style={{ fontSize: 30, fontWeight: "bold", color: "#CC3B95" }}
              >
                Nom :
              </Text>
              <Text style={{ fontSize: 30 }}>{this.state.nom}</Text>
            </View>
          </View>
          <View
            style={{
              width: "80%",
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomColor: "black",
              borderBottomWidth: 1,
            }}
          >
            <View>
              <Text
                style={{ fontSize: 30, fontWeight: "bold", color: "#CC3B95" }}
              >
                Prenom :
              </Text>
              <Text style={{ fontSize: 30 }}>{this.state.prenom}</Text>
            </View>
          </View>
          <View
            style={{
              width: "80%",
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomColor: "black",
              borderBottomWidth: 1,
            }}
          >
            <View>
              <Text
                style={{ fontSize: 30, fontWeight: "bold", color: "#CC3B95" }}
              >
                Email :
              </Text>
              <Text style={{ fontSize: 30 }}>{this.state.email}</Text>
            </View>
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

export default ProfilScreen;
