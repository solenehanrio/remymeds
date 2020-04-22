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

class AccesOrdoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nomMedUser: [],
      tableauTest: [],
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
        return idDesignMed;
      },
      function (error) {}
    );
    await this.setState({ tableauTest: newTab });
  }

  componentDidMount() {
    this._recupererNoms();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
              this.props.navigation.goBack();
            }}
          >
            <Bouton texte={"Retour au jeu"}></Bouton>
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

export default AccesOrdoScreen;
