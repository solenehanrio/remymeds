import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Value } from "react-native-reanimated";
import AffichageImage from "../components/affichageImage.js";
import tabImages from "../helpers/lienImages.js";
import InformationMedicamentScreen from "./InformationMedicamentScreen.js";
import Bouton from "../components/boutons";

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

class ChoixDesignScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { couleurHaut: "", couleurBas: "", idMedicament: "" };
  }

  _affichageCouleur() {
    if (
      this.props.navigation.state.params.forme == "gellule" ||
      this.props.navigation.state.params.forme == "suspensionBuvable"
    ) {
      return (
        <View>
          <Text style={styles.textStyle}> Choisissez la couleur du Haut</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#E70707",
                shadowColor: "grey",
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
              }}
              onPress={() => {
                this.setState({ couleurHaut: "blanc" });
              }}
            ></TouchableOpacity>
          </View>
          <Text style={styles.textStyle}>Choisissez la couleur du Bas</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#E70707",
                shadowColor: "grey",
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
              }}
              onPress={() => {
                this.setState({ couleurBas: "blanc" });
              }}
            ></TouchableOpacity>
          </View>
        </View>
      );
    } else if (this.props.navigation.state.params.forme == "suppositoire") {
    } else if (this.props.navigation.state.params.forme == "ovule") {
    } else if (this.props.navigation.state.params.forme == "piqure") {
    } else if (this.props.navigation.state.params.forme == "patch") {
    } else {
      return (
        <View>
          <Text style={styles.textStyle}>Choisissez la couleur</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#E70707",
                shadowColor: "grey",
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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
                elevation: 10,
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

  _affichageDesignTableau() {
    medForme = tabImages.filter(
      (element) => element.forme == this.props.navigation.state.params.forme
    );
    idImage = "";
    if (
      this.props.navigation.state.params.forme != "suppositoire" &&
      this.props.navigation.state.params.forme != "ovule" &&
      this.props.navigation.state.params.forme != "piqure" &&
      this.props.navigation.state.params.forme != "patch"
    ) {
      if (this.state.couleurHaut == "" && this.state.couleurBas == "") {
        medCouleurHaut = medForme.filter(
          (element) => element.couleur1 == "blanc"
        );

        if (
          this.props.navigation.state.params.forme == "suspensionBuvable" ||
          this.props.navigation.state.params.forme == "gellule"
        ) {
          medCouleurBas = medCouleurHaut.filter(
            (element) => element.couleur2 == "blanc"
          );
          idImage = medCouleurBas[0].id;
          return <AffichageImage sourceIm={idImage}></AffichageImage>;
        } else {
          idImage = medCouleurHaut[0].id;
          return <AffichageImage sourceIm={idImage}></AffichageImage>;
        }
      } else if (this.state.couleurBas == "" && this.state.couleurHaut !== "") {
        medCouleurHaut = medForme.filter(
          (element) => element.couleur1 == this.state.couleurHaut
        );
        if (
          this.props.navigation.state.params.forme == "suspensionBuvable " ||
          this.props.navigation.state.params.forme == "gellule"
        ) {
          idImage = medCouleurHaut.find(
            (element) => element.couleur2 == "blanc"
          ).id;
          return <AffichageImage sourceIm={idImage}></AffichageImage>;
        } else {
          idImage = medCouleurHaut[0].id;
          return <AffichageImage sourceIm={idImage}></AffichageImage>;
        }
      } else if (this.state.couleurBas !== "") {
        if (this.state.couleurHaut == "") {
          medCouleurBas = medForme.filter(
            (element) => element.couleur2 == this.state.couleurBas
          );
          idImage = medCouleurBas.find((element) => element.couleur1 == "blanc")
            .id;
          return <AffichageImage sourceIm={idImage}></AffichageImage>;
        } else if (this.state.couleurHaut !== "") {
          medCouleurBas = medForme.filter(
            (element) => element.couleur2 == this.state.couleurBas
          );
          medCouleurHaut = medCouleurBas.filter(
            (element) => element.couleur1 == this.state.couleurHaut
          );
          idImage = medCouleurHaut[0].id;
          return <AffichageImage sourceIm={idImage}></AffichageImage>;
        }
      }
    } else if (this.props.navigation.state.params.forme == "suppositoire") {
      return <AffichageImage sourceIm="sup"></AffichageImage>;
    } else if (this.props.navigation.state.params.forme == "ovule") {
      return <AffichageImage sourceIm="ov"></AffichageImage>;
    } else if (this.props.navigation.state.params.forme == "piqure") {
      return <AffichageImage sourceIm="ser"></AffichageImage>;
    } else if (this.props.navigation.state.params.forme == "patch") {
      return <AffichageImage sourceIm="pat"></AffichageImage>;
    }
  }

  _validationIdMed() {
    if (
      this.props.navigation.state.params.forme !== "suppositoire" &&
      this.props.navigation.state.params.forme !== "ovule" &&
      this.props.navigation.state.params.forme !== "piqure" &&
      this.props.navigation.state.params.forme !== "patch"
    ) {
      medForme = [];
      medCouleurHaut = [];
      medCouleurBas = [];
      if (this.state.couleurHaut == "") {
        medForme = tabImages.filter(
          (element) => element.forme == this.props.navigation.state.params.forme
        );
        medCouleurHaut = medForme.filter(
          (element) => element.couleur1 == "blanc"
        );
      } else {
        medForme = tabImages.filter(
          (element) => element.forme == this.props.navigation.state.params.forme
        );
        medCouleurHaut = medForme.filter(
          (element) => element.couleur1 == this.state.couleurHaut
        );
      }
      if (
        this.props.navigation.state.params.forme == "gellule" ||
        this.props.navigation.state.params.forme == "suspensionBuvable"
      ) {
        if (this.state.couleurBas == "") {
          medCouleurBas = medCouleurHaut.filter(
            (element) => element.couleur2 == "blanc"
          );
        } else {
          medCouleurBas = medCouleurHaut.filter(
            (element) => element.couleur2 == this.state.couleurBas
          );
        }
      } else {
        medCouleurBas = medCouleurHaut.filter(
          (element) => element.couleur2 == this.state.couleurBas
        );
      }

      idImage = medCouleurBas[0].id;
      this.setState({ idMedicament: idImage });

      this.props.navigation.navigate("InformationMedicament", {
        idMed: idImage,
      });
    } else if (this.props.navigation.state.params.forme == "suppositoire") {
      this.props.navigation.navigate("InformationMedicament", { idMed: "sup" });
    } else if (this.props.navigation.state.params.forme == "ovule") {
      this.props.navigation.navigate("InformationMedicament", { idMed: "ov" });
    } else if (this.props.navigation.state.params.forme == "piqure") {
      this.props.navigation.navigate("InformationMedicament", { idMed: "ser" });
    } else if (this.props.navigation.state.params.forme == "patch") {
      this.props.navigation.navigate("InformationMedicament", { idMed: "pat" });
    }
  }

  render() {
    return (
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={styles.visualiserStyle}>
          {this._affichageDesignTableau()}
        </View>
        {this._affichageCouleur()}
        <View>
          <TouchableOpacity
            style={styles.touchableOpacityStyle}
            onPress={() => {
              this._validationIdMed();
            }}
          >
            <Bouton texte={"Valider"}></Bouton>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ marginTop: 50 }}
          onPress={() => {
            this.props.navigation.navigate("ChoixForme", {
              retour: "vrai",
            });
          }}
        >
          <Bouton texte={"Retour"}></Bouton>
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
  roundBoutons: {
    backgroundColor: "#F29B20",
    borderRadius: 75,
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "grey",
    elevation: 10,
  },
  textStyle: {
    fontSize: 30,
    color: "#F29B20",
    fontWeight: "bold",
    textAlign: "center",
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
    marginTop: 20,
  },
});
export default ChoixDesignScreen;
