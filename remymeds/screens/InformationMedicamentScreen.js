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

class InformationMedicamentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nomMed: "",
      troubleMed: "",
      numberMatin: 0,
      numberMidi: 0,
      numberSoir: 0,
      horaires: new Array()
    };
  }
  _calculNombre() {}
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
          posoHoraire: this.state.horaires
        });
    }
  }
  _horaire(h) {
    if (this.state.horaires.find(element => element == h) != undefined) {
      let indexHoraire = this.state.horaires.indexOf(h);
      this.state.horaires.splice(indexHoraire, 1);
      this.setState({ horaires: this.state.horaires });
      console.log("supprimé");
    } else {
      this.state.horaires.push(h);
      this.setState({ horaires: this.state.horaires });
    }
  }
  _checkBoxStyle(item) {
    if (this.state.horaires.find(element => element == item) != undefined) {
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
        elevation: 10
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
        elevation: 10
      };
    }
  }
  _displayCheckBox1() {
    const horairesTab = ["4h", "5h", "6h", "7h", "8h", "9h", "10h", "11h"];
    const row = horairesTab.map(item => (
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

  _displayCheckBox2() {
    const horairesTab = [
      "12h",
      "13h",
      "14h",
      "15h",
      "16h",
      "17h",
      "18h",
      "19h"
    ];
    const row = horairesTab.map(item => (
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

  _displayCheckBox3() {
    const horairesTab = ["20h", "21h", "22h", "23h", "00h", "1h", "2h", "3h"];
    const row = horairesTab.map(item => (
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
            onEndEditing={text =>
              this.setState({ nomMed: text.nativeEvent.text })
            }
          ></TextInput>
        </View>
        <View style={styles.tuileStyle}>
          <Text style={styles.textStyle}>Trouble associé</Text>
          <TextInput
            style={styles.textInputStyle}
            onEndEditing={text =>
              this.setState({ troubleMed: text.nativeEvent.text })
            }
          ></TextInput>
        </View>
        <Text
          style={{
            fontSize: 30,
            fontStyle: "italic",
            color: "#540039",
            textAlign: "center"
          }}
        >
          Entrez le nombre de cachets par prises et cochez les horaires de prise
        </Text>
        <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
          <View style={styles.pinkRoundStyle}>
            <Image
              style={{ width: 100, resizeMode: "contain" }}
              source={require("../includes/MATIN.png")}
            ></Image>
          </View>
          <TextInput
            style={styles.numberInputStyle}
            onEndEditing={text =>
              this.setState({ numberMatin: text.nativeEvent.text })
            }
          ></TextInput>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
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
          <TextInput
            style={styles.numberInputStyle}
            onEndEditing={text =>
              this.setState({ numberMidi: text.nativeEvent.text })
            }
          ></TextInput>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
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
          <TextInput
            style={styles.numberInputStyle}
            onEndEditing={text =>
              this.setState({ numberSoir: text.nativeEvent.text })
            }
          ></TextInput>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {this._displayCheckBox3()}
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={styles.touchableOpacityStyle}
            onPress={() => {
              this._ajoutMedicament(this.state.nomMed, this.state.troubleMed);
              this.props.navigation.navigate("ResultatCarte", {
                nom: this.state.nomMed
              });
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

export default InformationMedicamentScreen;
