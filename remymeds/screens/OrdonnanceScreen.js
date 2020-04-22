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
    this.state = {
      nomMedUser: [],
      tableauTest: [],
      medASupprimer: "",
      suppression: false,
    };
  }
  // fonction permettant de récupérer les id de design de chaque médicaments de l'utilisateur
  // et de créer un tableau contenant les informations de chaque médicaments de l'utilisateur
  async _recupererNoms() {
    var userId = await firebase.auth().currentUser.uid;

    var refId = await firebase
      .database()
      .ref("/users/" + userId + "/medicament");
    let idDesignMed = [];
    let nom = [];
    let newTab = [];
    idDesignMed = await refId.once(
      "value",
      (snapshot) => {
        idDesignMed = snapshot.val();
        if (idDesignMed != null) {
          idDesignMed = Object.entries(idDesignMed);
          for (var i = 0; i < idDesignMed.length; i++) {
            let stringJours = "";
            let array = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
            let tousLesJours = 0;
            for (var j = 0; j < array.length; j++) {
              for (var k = 0; k < idDesignMed[i][1].jours.length; k++) {
                if (array[j] == idDesignMed[i][1].jours[k]) {
                  stringJours = stringJours + array[j] + " ";
                  tousLesJours = tousLesJours + 1;
                }
              }
            }
            if (tousLesJours == 7) {
              stringJours = "Tous les jours";
            }
            const he = {
              nom: idDesignMed[i][0],
              idDesign: idDesignMed[i][1].idDesign,
              posoMatin: idDesignMed[i][1].posoMatin,
              posoMidi: idDesignMed[i][1].posoMidi,
              posoSoir: idDesignMed[i][1].posoSoir,
              jours: stringJours,
              trouble: idDesignMed[i][1].trouble,
            };
            newTab.push(he);
          }
        }
        return idDesignMed;
      },
      function (error) {}
    );
    await this.setState({ tableauTest: newTab });
  }

  _suppressionMed() {
    var userId = firebase.auth().currentUser.uid;
    let nomMed = this.state.medASupprimer;

    firebase
      .database()
      .ref("/users/" + userId + "/medicament/" + nomMed)
      .remove();
  }

  _displaySuppr(nom) {
    if (this.state.suppression == true) {
      return (
        <TouchableOpacity
          style={{ width: "100%" }}
          onPress={() => {
            this.setState({ medASupprimer: nom });
          }}
        >
          <Bouton texte={"Supprimer"}></Bouton>
        </TouchableOpacity>
      );
    }
  }

  _displayValiderSuppression() {
    if (this.state.medASupprimer != "") {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: "#CC3B95",
            shadowColor: "grey",
            width: "100%",
            height: "10%",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            this._suppressionMed();
            this.setState({ medASupprimer: "", suppression: false });
            this._recupererNoms();
          }}
        >
          <Text style={{ fontSize: 30, color: "#540039", fontWeight: "bold" }}>
            Valider la suppresion de {this.state.medASupprimer}
          </Text>
        </TouchableOpacity>
      );
    }
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
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={{ width: "40%" }}
            onPress={() => {
              this.props.navigation.navigate("CreationMedicament", {
                retour: "faux",
              });
            }}
          >
            <Bouton texte={"Créer un \n médicament"}></Bouton>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: "40%" }}
            onPress={() => {
              this.setState({ suppression: true });
            }}
          >
            <Bouton texte={"Supprimer un \n médicament"}></Bouton>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.tableauTest}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CarteRecto
                hauteurCarte={400}
                sourceIm={item.idDesign}
                nomMedicament={item.nom}
              ></CarteRecto>
              <CarteVerso
                jours={item.jours}
                hauteurCarte={400}
                sourceIm={item.idDesign}
                nomMedicament={item.nom}
                trouble={item.trouble}
                posoMatin={item.posoMatin}
                posoMidi={item.posoMidi}
                posoSoir={item.posoSoir}
              />
              <View>{this._displaySuppr(item.nom)}</View>
            </View>
          )}
          keyExtractor={(item) => item.nom}
        />
        <View
          style={{
            backgroundColor: "#CC3B95",
            shadowColor: "grey",
            elevation: -10,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {this._displayValiderSuppression()}
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

export default OrdonnanceScreen;
