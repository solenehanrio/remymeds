import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
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
    measurementId: "G-Z6SZ5VZGX8",
  });
}
var database = firebase.database();

class InformationMedicamentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nomMed: "",
      troubleMed: "",
      numberMatin: 0,
      numberMidi: 0,
      numberSoir: 0,
      horaires: new Array(),
      jours: new Array(),
    };
  }

  //ajoute le médicament à la base de données firebase
  // en utilisant comme id le nom du médicament passé en paramètre et en ajoutant les informations saisies à la suite
  // de l'id, le trouble est aussi passé en paramètre.
  _ajoutMedicament(nom, t) {
    if (firebase.auth().currentUser !== null) {
      var userId = firebase.auth().currentUser.uid;
      var idMed = nom;
      firebase
        .database()
        .ref("users/" + userId + "/medicament/" + idMed)
        .set({
          trouble: t,
          idDesign: this.props.navigation.state.params.idMed,
          posoMatin: this.state.numberMatin,
          posoMidi: this.state.numberMidi,
          posoSoir: this.state.numberSoir,
          posoHoraire: this.state.horaires,
          jours: this.state.jours,
        });
    }
  }
  // permt d'ajouter l'horaire à la liste de posologie horaire ou de le supprimer s'il est déselectionné.
  // suivant l'horaire, ajoute aussi +1 au nombre de la partie de la journée correspondante
  _horaire(h) {
    if (this.state.horaires.find((element) => element == h) != undefined) {
      let indexHoraire = this.state.horaires.indexOf(h);
      this.state.horaires.splice(indexHoraire, 1);
      this.setState({ horaires: this.state.horaires });

      if (
        h == "4h" ||
        h == "5h" ||
        h == "6h" ||
        h == "7h" ||
        h == "8h" ||
        h == "9h" ||
        h == "10h" ||
        h == "11h"
      ) {
        this.state.numberMatin = this.state.numberMatin - 1;
        this.setState({ numberMatin: this.state.numberMatin });
      } else if (
        h == "12h" ||
        h == "13h" ||
        h == "14h" ||
        h == "15h" ||
        h == "16h" ||
        h == "17h" ||
        h == "18h" ||
        h == "19h"
      ) {
        this.state.numberMidi = this.state.numberMidi - 1;
        this.setState({ numberMidi: this.state.numberMidi });
      } else if (
        h == "20h" ||
        h == "21h" ||
        h == "22h" ||
        h == "23h" ||
        h == "00h" ||
        h == "1h" ||
        h == "2h" ||
        h == "3h"
      ) {
        this.state.numberSoir = this.state.numberSoir - 1;
        this.setState({ numberSoir: this.state.numberSoir });
      }
    } else {
      this.state.horaires.push(h);
      this.setState({ horaires: this.state.horaires });
      if (
        h == "4h" ||
        h == "5h" ||
        h == "6h" ||
        h == "7h" ||
        h == "8h" ||
        h == "9h" ||
        h == "10h" ||
        h == "11h"
      ) {
        this.state.numberMatin = this.state.numberMatin + 1;
        this.setState({ numberMatin: this.state.numberMatin });
      } else if (
        h == "12h" ||
        h == "13h" ||
        h == "14h" ||
        h == "15h" ||
        h == "16h" ||
        h == "17h" ||
        h == "18h" ||
        h == "19h"
      ) {
        this.state.numberMidi = this.state.numberMidi + 1;
        this.setState({ numberMidi: this.state.numberMidi });
      } else if (
        h == "20h" ||
        h == "21h" ||
        h == "22h" ||
        h == "23h" ||
        h == "00h" ||
        h == "1h" ||
        h == "2h" ||
        h == "3h"
      ) {
        this.state.numberSoir = this.state.numberSoir + 1;
        this.setState({ numberSoir: this.state.numberSoir });
      }
    }
  }
  // ajoute le jour en paramètre à la liste des jours de prise ou le supprime s'il est désélectionné
  _jours(d) {
    if (this.state.jours.find((element) => element == d) != null) {
      let indexJour = this.state.jours.indexOf(d);
      this.state.jours.splice(indexJour, 1);
      this.setState({ jours: this.state.jours });
    } else {
      this.state.jours.push(d);
      this.setState({ jours: this.state.jours });
    }
  }
  // défini le style des checkbox d'horaire suivant s'il sont sélectionné ou désélectionné
  _checkBoxStyle(item) {
    if (this.state.horaires.find((element) => element == item) != undefined) {
      return {
        backgroundColor: "black",
        borderWidth: 1,
        borderColor: "grey",
        width: 60,
        height: 60,
        borderRadius: 15,
        marginRight: 10,
        marginLeft: 10,
        shadowColor: "grey",
        elevation: 10,
      };
    } else {
      return {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "grey",
        width: 60,
        height: 60,
        borderRadius: 15,
        marginRight: 10,
        marginLeft: 10,
        shadowColor: "grey",
        elevation: 10,
      };
    }
  }
  // même chose que le précédent mais pour les checkboxs de jours
  _checkBoxDayStyle(item) {
    if (this.state.jours.find((element) => element == item) != undefined) {
      return {
        backgroundColor: "black",
        borderWidth: 1,
        borderColor: "grey",
        width: 60,
        height: 60,
        borderRadius: 15,
        marginRight: 10,
        marginLeft: 10,
        shadowColor: "grey",
        elevation: 10,
      };
    } else {
      return {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "grey",
        width: 60,
        height: 60,
        borderRadius: 15,
        marginRight: 10,
        marginLeft: 10,
        shadowColor: "grey",
        elevation: 10,
      };
    }
  }
  //affiche les chackbox du matin à l'aide de la fonction map, suivant la liste des
  // différents horaire associés
  _displayCheckBox1() {
    const horairesTab = ["4h", "5h", "6h", "7h", "8h", "9h", "10h", "11h"];
    const row = horairesTab.map((item) => (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={this._checkBoxStyle(item)}
          onPress={() => {
            this._horaire(item);
          }}
        ></TouchableOpacity>
        <Text style={{ fontSize: 25 }}>{item}</Text>
      </View>
    ));
    return row;
  }
  //affiche les chackbox du midi à l'aide de la fonction map, suivant la liste des
  // différents horaire associés
  _displayCheckBox2() {
    const horairesTab = [
      "12h",
      "13h",
      "14h",
      "15h",
      "16h",
      "17h",
      "18h",
      "19h",
    ];
    const row = horairesTab.map((item) => (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={this._checkBoxStyle(item)}
          onPress={() => {
            this._horaire(item);
          }}
        ></TouchableOpacity>
        <Text style={{ fontSize: 25 }}>{item}</Text>
      </View>
    ));
    return row;
  }
  // vérifie si toutes les informations nécessaires ont été rentrées, si oui passe
  // à la page suivante sinon envoie un pop up d'erreur explicatif
  _verif() {
    if (
      this.state.jours == [] ||
      (this.state.numberMatin == 0 &&
        this.state.numberMidi == 0 &&
        this.state.numberSoir == 0) ||
      this.state.nomMed == ""
    ) {
      Alert.alert(
        "Informations manquantes",
        "Attention, vous n'avez pas complété tout le formulaire",
        [
          {
            text: "Compléter les informations manquantes",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } else {
      this._ajoutMedicament(this.state.nomMed, this.state.troubleMed);
      this.props.navigation.navigate("ResultatCarte", {
        nom: this.state.nomMed,
      });
    }
  }
  //affiche les chackbox du soir à l'aide de la fonction map, suivant la liste des
  // différents horaire associés
  _displayCheckBox3() {
    const horairesTab = ["20h", "21h", "22h", "23h", "00h", "1h", "2h", "3h"];
    const row = horairesTab.map((item) => (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={this._checkBoxStyle(item)}
          onPress={() => {
            this._horaire(item);
          }}
        ></TouchableOpacity>
        <Text style={{ fontSize: 25 }}>{item}</Text>
      </View>
    ));
    return row;
  }
  //affiche les chackbox des jours à l'aide de la fonction map, suivant la liste des
  // différents jours associés
  _displayDays() {
    const joursTab = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    const row = joursTab.map((item) => (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={this._checkBoxDayStyle(item)}
          onPress={() => {
            this._jours(item);
          }}
        ></TouchableOpacity>
        <Text style={{ fontSize: 25 }}>{item}</Text>
      </View>
    ));
    return row;
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
          <Text style={styles.textStyle}>Nom du medicament</Text>
          <TextInput
            style={styles.textInputStyle}
            onEndEditing={(text) =>
              this.setState({ nomMed: text.nativeEvent.text })
            }
          ></TextInput>
        </View>
        <View style={styles.tuileStyle}>
          <Text style={styles.textStyle}>Trouble associé</Text>
          <TextInput
            style={styles.textInputStyle}
            onEndEditing={(text) =>
              this.setState({ troubleMed: text.nativeEvent.text })
            }
          ></TextInput>
        </View>
        <Text
          style={{
            fontSize: 30,
            fontStyle: "italic",
            color: "#540039",
            textAlign: "center",
          }}
        >
          Cochez les jours et les horaires de prise
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {this._displayDays()}
        </View>
        <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
          <View style={styles.pinkRoundStyle}>
            <Image
              style={{ width: 100, resizeMode: "contain" }}
              source={require("../includes/MATIN.png")}
            ></Image>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {this._displayCheckBox1()}
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
          <View style={styles.pinkRoundStyle}>
            <Image
              style={{ width: 80, resizeMode: "contain" }}
              source={require("../includes/MIDI.png")}
            ></Image>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {this._displayCheckBox2()}
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
          <View style={styles.pinkRoundStyle}>
            <Image
              style={{ width: 80, resizeMode: "contain" }}
              source={require("../includes/SOIR.png")}
            ></Image>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {this._displayCheckBox3()}
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => {
              this.props.navigation.navigate("ChoixDesign");
            }}
          >
            <Bouton texte={"Retour"}></Bouton>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => {
              this._verif();
            }}
          >
            <Bouton texte={"Enregistrer"}></Bouton>
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
    justifyContent: "center",
  },
  tuileStyle: {
    width: "90%",
    backgroundColor: "#61C7CC",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 25,
  },
  textStyle: {
    fontSize: 40,
    color: "#30696D",
    fontWeight: "bold",
  },
  textInputStyle: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "80%",
    fontSize: 40,
    marginBottom: 10,
    marginTop: 20,
    shadowColor: "grey",
    elevation: 10,
  },
  numberInputStyle: {
    backgroundColor: "white",
    width: "10%",
    fontSize: 50,
    shadowColor: "grey",
    elevation: 10,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  pinkRoundStyle: {
    backgroundColor: "#CC3B95",
    width: 122,
    height: 122,
    borderRadius: 61,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
  },
});

export default InformationMedicamentScreen;
