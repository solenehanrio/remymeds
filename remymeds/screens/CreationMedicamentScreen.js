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
import AffichageImage from "../components/affichageImage.js";
import tabImages from "../helpers/lienImages.js";

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

class CreationMedicamentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boutonActivé: "",
      couleurHaut: "",
      couleurBas: "",
      idMedicamentSelectionné: ""
    };
  }

  _affichagePersonnalise() {
    if (this.state.boutonActivé == "") {
      return this._premierAffichage();
    } else if (this.state.boutonActivé == "formeOrale") {
      return this._affichageFO();
    } else if (this.state.boutonActivé == "formeRectale") {
      return this._affichageFR();
    } else if (this.state.boutonActivé == "formeDermique") {
      return this._affichageFD();
    } else if (this.state.boutonActivé == "formeInjectee") {
      return this._affichageFIj();
    } else {
      return this._affichageCouleur();
    }
  }

  _affichageCouleur() {
    if (this.state.boutonActivé == "gellule") {
      return (
        <View>
          <Text> Choisissez la couleur du Haut</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#E70707",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "rouge" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#FFB300",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "orange" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#F8FF00",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "jaune" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#20B900",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "vert" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#0088FF",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "bleu" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#4300FF",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "indigo" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#8B00FF",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "violet" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#FF00D8",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "rose" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "white",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "blanc" });
              }}
            ></TouchableOpacity>
          </View>
          <Text>Choisissez la couleur du Bas</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#E70707",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurBas: "rouge" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#FFB300",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurBas: "orange" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#F8FF00",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurBas: "jaune" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#20B900",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurBas: "vert" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#0088FF",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurBas: "bleu" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#4300FF",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurBas: "indigo" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#8B00FF",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurBas: "violet" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#FF00D8",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurBas: "rose" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "white",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurBas: "blanc" });
              }}
            ></TouchableOpacity>
          </View>
        </View>
      );
    } else if (this.state.boutonActivé == "suspensionBuvable") {
      return (
        <View>
          <Text> Choisissez le couleurHautprincipale du sachet</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#E70707",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "rouge" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#FFB300",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "orange" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#F8FF00",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "jaune" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#20B900",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "vert" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#0088FF",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "bleu" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#4300FF",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "indigo" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#8B00FF",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "violet" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#FF00D8",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "rose" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "white",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "blanc" });
              }}
            ></TouchableOpacity>
          </View>
          <Text>Choisissez la couleurHautsecondaire du sachet</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#E70707",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurBas: "rouge" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#FFB300",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurBas: "orange" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#F8FF00",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurBas: "jaune" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#20B900",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurBas: "vert" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#0088FF",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurBas: "bleu" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#4300FF",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurBas: "indigo" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#8B00FF",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurBas: "violet" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#FF00D8",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurBas: "rose" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "white",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurBas: "blanc" });
              }}
            ></TouchableOpacity>
          </View>
        </View>
      );
    } else if (this.state.boutonActivé == "suppositoire") {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("InformationMedicamentScreen");
          }}
        >
          <Bouton texte={"Valider"}></Bouton>
        </TouchableOpacity>
      );
    } else if (this.state.boutonActivé == "ovule") {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("InformationMedicamentScreen");
          }}
        >
          <Bouton texte={"Valider"}></Bouton>
        </TouchableOpacity>
      );
    } else if (this.state.boutonActivé == "piqure") {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("InformationMedicamentScreen");
          }}
        >
          <Bouton texte={"Valider"}></Bouton>
        </TouchableOpacity>
      );
    } else {
      return (
        <View>
          <Text>Choisissez la couleur</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#E70707",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "rouge" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#FFB300",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "orange" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#F8FF00",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "jaune" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#20B900",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "vert" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#0088FF",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "bleu" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#4300FF",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "indigo" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#8B00FF",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "violet" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#FF00D8",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "rose" });
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "white",
                shadowColor: "grey",
                elevation: 10
              }}
              onPress={() => {
                this.setState({ couleurHaut: "blanc" });
              }}
            ></TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  _premierAffichage() {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "formeOrale" });
              }}
            >
              <Image
                style={{ width: 100, resizeMode: "contain" }}
                source={require("../includes/forme_galenique/fg_orale.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}> Forme Orale </Text>
          </View>
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "aerosol" });
              }}
            >
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../includes/forme_galenique/fg_inhalee.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}> Forme Inhalée </Text>
          </View>
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "formeRectale" });
              }}
            >
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../includes/forme_galenique/fg_rectale.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}>
              {" "}
              Forme {"\n"} Rectale/Vaginale{" "}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "formeDermique" });
              }}
            >
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../includes/forme_galenique/fg_dermique.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}> Forme Dermique </Text>
          </View>
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "formeInjectee" });
              }}
            >
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../includes/forme_galenique/fg_injectee.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}> Forme Injectee </Text>
          </View>
        </View>
      </View>
    );
  }

  _affichageFO() {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "comprimeAvaler" });
              }}
            >
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../includes/boutons/comprime.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}> Comprimé {"\n"} à avaler </Text>
          </View>
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "comprimeEffervescent" });
              }}
            >
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../includes/boutons/comprime_effervescent.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}> Comprimé {"\n"} effervescent </Text>
          </View>
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "comprimeSublingual" });
              }}
            >
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../includes/boutons/sublingual.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}>Comprimé {"\n"} sublingual</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "gellule" });
              }}
            >
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../includes/boutons/gellule.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}> Gellule </Text>
          </View>
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "solutionBuvable" });
              }}
            >
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../includes/boutons/solution_buvable.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}> Solution {"\n"} buvable </Text>
          </View>
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "suspensionBuvable" });
              }}
            >
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../includes/boutons/sachet.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}>Suspension {"\n"} buvable</Text>
          </View>
        </View>
      </View>
    );
  }

  _affichageFIj() {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "solutionNasale" });
              }}
            >
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../includes/boutons/solution_nasale.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}> Solution {"\n"} nasale </Text>
          </View>
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "solutionAuriculaire" });
              }}
            >
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../includes/boutons/solution_auriculaire.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}> Solution {"\n"} auriculaire </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "collyre" });
              }}
            >
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../includes/boutons/collyre.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}> Collyre </Text>
          </View>
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "piqure" });
              }}
            >
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../includes/medicaments/serringue.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}> Piqure </Text>
          </View>
        </View>
      </View>
    );
  }
  _affichageFD() {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "pommade" });
              }}
            >
              <Image
                style={{ width: 100, resizeMode: "contain" }}
                source={require("../includes/boutons/pommade.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}> Pommade </Text>
          </View>
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "patch" });
              }}
            >
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../includes/boutons/patch.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}> Patch </Text>
          </View>
        </View>
      </View>
    );
  }

  _affichageFR() {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "suppositoire" });
              }}
            >
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../includes/medicaments/suppositoire.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}> Suppositoire </Text>
          </View>
          <View
            style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}
          >
            <TouchableOpacity
              style={styles.roundBoutons}
              onPress={() => {
                this.setState({ boutonActivé: "ovule" });
              }}
            >
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../includes/boutons/ovule.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.textStyle}> Patch </Text>
          </View>
        </View>
      </View>
    );
  }

  _affichageDesignTableau() {
    medForme = tabImages.filter(
      element => element.forme == this.state.boutonActivé
    );
    idImage = "";

    if (this.state.couleurBas == "" && this.state.couleurHaut !== "") {
      medCouleurHaut = medForme.filter(
        element => element.couleur1 == this.state.couleurHaut
      );
      console.log(medCouleurHaut);
      if (
        this.state.boutonActivé == "suspensionBuvable " ||
        this.state.boutonActivé == "gellule"
      ) {
        console.log("coucou exception");
        idImage = medCouleurHaut.find(element => element.couleur2 == "blanc")
          .id;
        console.log(idImage);
        return <AffichageImage sourceIm={idImage}></AffichageImage>;
      } else {
        idImage = medCouleurHaut[0].id;
        return <AffichageImage sourceIm={idImage}></AffichageImage>;
      }
    } else if (this.state.couleurBas !== "") {
      if (this.state.couleurHaut == "") {
        medCouleurBas = medForme.filter(
          element => element.couleur2 == this.state.couleurBas
        );
        idImage = medCouleurBas.find(element => element.couleur1 == "blanc").id;
        return <AffichageImage sourceIm={idImage}></AffichageImage>;
      } else if (this.state.couleurHaut !== "") {
        medCouleurBas = medForme.filter(
          element => element.couleur2 == this.state.couleurBas
        );
        medCouleurHaut = medCouleurBas.filter(
          element => element.couleur1 == this.state.couleurHaut
        );
        idImage = medCouleurHaut[0].id;
        return <AffichageImage sourceIm={idImage}></AffichageImage>;
      }
    }
  }

  render() {
    return (
      <View style={{ alignItems: "center", flex: 1 }}>
        <View style={styles.visualiserStyle}>
          {this._affichageDesignTableau()}
        </View>
        {this._affichagePersonnalise()}
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
  roundBoutons: {
    backgroundColor: "#F29B20",
    borderRadius: 75,
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "grey",
    elevation: 10
  },
  textStyle: {
    fontSize: 30,
    color: "#F29B20",
    fontWeight: "bold",
    textAlign: "center"
  },
  visualiserStyle: {
    borderColor: "#CC3B95",
    borderRadius: 25,
    borderWidth: 15,
    shadowColor: "grey",
    elevation: 10,
    width: "90%",
    height: "50%",
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  }
});

export default CreationMedicamentScreen;
