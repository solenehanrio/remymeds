import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
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
    measurementId: "G-Z6SZ5VZGX8",
  });
}

class OrdonnanceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nomMedUser: [], tableau: [] };
  }
  _recupererNoms() {
    var userId = firebase.auth().currentUser.uid;
    console.log(userId);

    var refId = firebase.database().ref("/users/" + userId + "/medicament");
    let idDesignMed = [];
    refId.on(
      "value",
      function (snapshot) {
        idDesignMed = snapshot.val();
      },
      function (error) {}
    );

    idDesignMed = Object.entries(idDesignMed);
    let nom = [];
    for (var i = 0; i < idDesignMed.length; i++) {
      nom.push(idDesignMed[i][0]);
    }
    return idDesignMed;
  }

  _creationTableau() {
    const tableauFirebase = this._recupererNoms();
    const DataMed = [];
    for (var i = 0; i < tableauFirebase.length; i++) {
      const he = {
        nom: tableauFirebase[i][0],
        idDesign: tableauFirebase[i][1].idDesign,
        posoMatin: tableauFirebase[i][1].posoMatin,
        posoMidi: tableauFirebase[i][1].posoMidi,
        posoSoir: tableauFirebase[i][1].posoSoir,
      };
      DataMed.push(he);
    }

    console.log(DataMed);
    return DataMed;
  }

  componentDidMount() {
    this._recupererNoms();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          optionBoutonGauche={3}
          optionBoutonDroit={2}
          titrePage={"ORDONNANCE"}
        ></Header>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{ width: "80%" }}
            onPress={() => {
              this.props.navigation.navigate("CreationMedicament", {
                retour: "faux",
              });
            }}
          >
            <Bouton texte={"Créer un nouveau \n médicament"}></Bouton>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this._creationTableau()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CarteRecto
                hauteurCarte={300}
                sourceIm={item.idDesign}
                nomMedicament={item.nom}
              ></CarteRecto>
              <CarteVerso
                hauteurCarte={300}
                sourceIm={item.idDesign}
                nomMedicament={item.nom}
                trouble={item.trouble}
                posoMatin={item.posoMatin}
                posoMidi={item.posoMidi}
                posoSoir={item.posoSoir}
              />
            </View>
          )}
          keyExtractor={(item) => item.nom}
        />
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

export default OrdonnanceScreen;
