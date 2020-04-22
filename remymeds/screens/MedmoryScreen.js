import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Bouton from "../components/boutons";
import CarteRecto from "../components/carteRecto";
import CarteVerso from "../components/carteVerso";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Value } from "react-native-reanimated";
import tabImages from "../helpers/lienImages.js";
import CarteRemymeds from "../components/carteReMyMeds";

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

class MedmoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableauDoubleUtilise: [],
      tableauRV: [],
      positionRetournee: [],
      tableauPositionsPaires: [],
      tableauDoublesBons: [],
      tableauTest: [],
      nbActions: 0,
      nbPoints: 0,
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

  // fonction pour obtenir un nombre aléatoire
  _getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // fonction pour mélanger un tableau
  _randomize(tab) {
    var i, j, tmp;
    for (i = tab.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      tmp = tab[i];
      tab[i] = tab[j];
      tab[j] = tmp;
    }
    return tab;
  }

  // fonction permettant de construire le tableau de médicaments qui va être utilisé dans le jeu.
  // sur la base de douze cartes sur la table de jeu, donc 6 médicaments (une face recto et une face verso),
  // on ajoute des médicaments au tableau si
  // l'utilsiateur n'a pas assez de médicaments dans son ordonnance, on en enlève aléatoirement s'il en a trop
  // et on mélange le tableau obtenu
  async _completerTableau() {
    await this._recupererNoms();
    let tableauMedUser = this.state.tableauTest;
    let nbMedManquant = 6 - tableauMedUser.length;
    let idNewMed = [];
    let tabNom = [
      "dopridone",
      "caplax",
      "baprolane",
      "tifex",
      "juxamine",
      "virupose",
      "camilane",
      "trapodile",
      "varetor",
      "letavir",
      "ativius",
      "koplex",
    ];
    if (nbMedManquant > 0) {
      for (var i = 0; i < nbMedManquant; i++) {
        let nbAl = this._getRandomInt(246);
        for (var j = 0; j < tableauMedUser.length; j++) {
          while (tableauMedUser[j].idDesign == tabImages[nbAl].id) {
            nbAl = this._getRandomInt(246);
          }
        }
        idNewMed.push(tabImages[nbAl].id);
      }
      for (var i = 0; i < nbMedManquant; i++) {
        let nbAl = this._getRandomInt(11 - i);
        const newMed = {
          nom: tabNom[nbAl],
          idDesign: idNewMed[i],
          posoMatin: 1,
          posoMidi: 1,
          posoSoir: 1,
          jours: "Tous les jours",
        };
        tabNom.splice(nbAl, 1);
        tableauMedUser.push(newMed);
      }

      tableauMedUser = this._randomize(tableauMedUser);
      return tableauMedUser;
    } else if (nbMedManquant < 0) {
      let nbAl = this._getRandomInt(tableauMedUser.length);
      let nbTrop = 0 - nbMedManquant;
      for (var i = 0; i < nbTrop; i++) {
        tableauMedUser.splice(nbAl, 1);
        nbAl = this._getRandomInt(tableauMedUser.length);
      }
      tableauMedUser = this._randomize(tableauMedUser);
      return tableauMedUser;
    } else {
      tableauMedUser = this._randomize(tableauMedUser);
      return tableauMedUser;
    }
  }

  //étant donné que les médicaments vont apparaitre deux fois (le recto et le verso de la carte médicament), je
  // créé un tableau qui répertorie deux fois chaque médicaments et mélange l'ordre dans lequel ils apparaissent
  // ce tableau me permettra de les placer dans le jeu.
  // pour randomiser l'ordre d'apparrition du recto ou du verso, un tableau est créé en parallèle qui en fonction de
  // la ou apparait le double du médicamnet associe recto ou verso à la paire de manière aléatoire.
  // de plus, je créé un tableau de position des paires, pour savoir à quelles positions se trouvent les vrais
  // médicaments de l'utilisateurs afin de l'utiliser dans une fonction de vérification de réussite.
  async _tableauDouble() {
    let tab = await this._completerTableau();
    let newTab = [];
    for (var i = 0; i < tab.length; i++) {
      newTab.push(tab[i]);
      newTab.push(tab[i]);
    }
    newTab = this._randomize(newTab);
    let tableauRectoVerso = ["", "", "", "", "", "", "", "", "", "", "", ""];
    let tabPaires = [];
    for (var i = 0; i < newTab.length; i++) {
      for (var j = 0; j < newTab.length; j++) {
        if (newTab[i] == newTab[j] && i != j) {
          let nbAl = this._randomize(1);
          if (nbAl == 0) {
            tableauRectoVerso.splice(i, 1, "Recto");
            tableauRectoVerso.splice(j, 1, "Verso");
          } else {
            tableauRectoVerso.splice(i, 1, "Verso");
            tableauRectoVerso.splice(j, 1, "Recto");
          }
          if (
            newTab[i].nom != "dopridone" &&
            newTab[i].nom != "caplax" &&
            newTab[i].nom != "baprolane" &&
            newTab[i].nom != "tifex" &&
            newTab[i].nom != "juxamine" &&
            newTab[i].nom != "virupose" &&
            newTab[i].nom != "camilane" &&
            newTab[i].nom != "trapodile" &&
            newTab[i].nom != "varetor" &&
            newTab[i].nom != "letavir" &&
            newTab[i].nom != "ativius" &&
            newTab[i].nom != "koplex"
          ) {
            tabPaires.push({ i, j });
          }
        }
      }
    }
    //chaque paire va être inscrite deux fois dans le tableau, on retire donc les paires en double :
    let nb = tabPaires.length;
    let tabFinal = tabPaires;
    let tabPos = [];
    for (var k = 0; k < tabPaires.length; k++) {
      for (var m = 0; m < tabPaires.length; m++) {
        if (
          tabPaires[k].i == tabPaires[m].j &&
          tabPaires[k].j == tabPaires[m].i
        ) {
          tabPaires.splice(m, 1);
        }
      }
    }
    this.setState({ tableauDoubleUtilise: newTab });
    this.setState({ tableauPositionsPaires: tabPaires });
    this.setState({ tableauRV: tableauRectoVerso });
  }

  // permet de mettre à jour le state de la position des deux cartes qui sont retournées
  _setPositionRetournee(position) {
    if (this.state.positionRetournee.length == 2) {
      for (var i = 0; i < 2; i++) {
        if (this.state.positionRetournee[i] == position) {
          let tab = this.state.positionRetournee;
          tab.splice(i, 1);
          this.setState({ positionRetournee: tab });
        } else {
          this.setState({ positionRetournee: [] });
          let tab = [position];
          this.setState({ positionRetournee: tab });
        }
      }
    } else if (this.state.positionRetournee.length == 1) {
      if (this.state.positionRetournee[0] == position) {
        this.setState({ positionRetournee: [] });
      } else {
        let tab = this.state.positionRetournee;
        tab.push(position);
        this.setState({ positionRetournee: tab });
      }
    } else {
      let tab = [];
      tab.push(position);
      this.setState({ positionRetournee: tab });
    }
  }

  //fonction gérant l'affichage du recto des différentes cartes posées sur la table de jeu
  // en fonction de sa disposition et de la réussite de l'utilisateur.
  _affichageRectoCartes(position) {
    if (this.state.tableauDoubleUtilise[position] != undefined) {
      if (this.state.tableauDoublesBons.length != 0) {
        if (
          this.state.tableauDoublesBons[0].position1 == position ||
          this.state.tableauDoublesBons[0].position2 == position
        ) {
          if (this.state.tableauRV[position] == "Recto") {
            return (
              <CarteRecto
                hauteurCarte={270}
                sourceIm={this.state.tableauDoubleUtilise[position].idDesign}
                nomMedicament={this.state.tableauDoubleUtilise[position].nom}
              ></CarteRecto>
            );
          } else {
            return (
              <CarteVerso
                hauteurCarte={270}
                sourceIm={this.state.tableauDoubleUtilise[position].idDesign}
                nomMedicament={this.state.tableauDoubleUtilise[position].nom}
                trouble={this.state.tableauDoubleUtilise[position].trouble}
                posoMatin={this.state.tableauDoubleUtilise[position].posoMatin}
                posoMidi={this.state.tableauDoubleUtilise[position].posoMidi}
                posoSoir={this.state.tableauDoubleUtilise[position].posoSoir}
                jours={this.state.tableauDoubleUtilise[position].jours}
              ></CarteVerso>
            );
          }
        } else if (this.state.positionRetournee[0] == position) {
          if (this.state.tableauRV[position] == "Recto") {
            return (
              <CarteRecto
                hauteurCarte={270}
                sourceIm={this.state.tableauDoubleUtilise[position].idDesign}
                nomMedicament={this.state.tableauDoubleUtilise[position].nom}
              ></CarteRecto>
            );
          } else {
            return (
              <CarteVerso
                hauteurCarte={270}
                sourceIm={this.state.tableauDoubleUtilise[position].idDesign}
                nomMedicament={this.state.tableauDoubleUtilise[position].nom}
                trouble={this.state.tableauDoubleUtilise[position].trouble}
                posoMatin={this.state.tableauDoubleUtilise[position].posoMatin}
                posoMidi={this.state.tableauDoubleUtilise[position].posoMidi}
                posoSoir={this.state.tableauDoubleUtilise[position].posoSoir}
                jours={this.state.tableauDoubleUtilise[position].jours}
              ></CarteVerso>
            );
          }
        } else if (this.state.positionRetournee[1] == position) {
          if (this.state.tableauRV[position] == "Recto") {
            return (
              <CarteRecto
                hauteurCarte={270}
                sourceIm={this.state.tableauDoubleUtilise[position].idDesign}
                nomMedicament={this.state.tableauDoubleUtilise[position].nom}
              ></CarteRecto>
            );
          } else {
            return (
              <CarteVerso
                hauteurCarte={270}
                sourceIm={this.state.tableauDoubleUtilise[position].idDesign}
                nomMedicament={this.state.tableauDoubleUtilise[position].nom}
                trouble={this.state.tableauDoubleUtilise[position].trouble}
                posoMatin={this.state.tableauDoubleUtilise[position].posoMatin}
                posoMidi={this.state.tableauDoubleUtilise[position].posoMidi}
                posoSoir={this.state.tableauDoubleUtilise[position].posoSoir}
                jours={this.state.tableauDoubleUtilise[position].jours}
              ></CarteVerso>
            );
          }
        } else {
          return <CarteRemymeds hauteurCarte={270}></CarteRemymeds>;
        }
      } else if (this.state.positionRetournee[0] == position) {
        if (this.state.tableauRV[position] == "Recto") {
          return (
            <CarteRecto
              hauteurCarte={270}
              sourceIm={this.state.tableauDoubleUtilise[position].idDesign}
              nomMedicament={this.state.tableauDoubleUtilise[position].nom}
            ></CarteRecto>
          );
        } else {
          return (
            <CarteVerso
              hauteurCarte={270}
              sourceIm={this.state.tableauDoubleUtilise[position].idDesign}
              nomMedicament={this.state.tableauDoubleUtilise[position].nom}
              trouble={this.state.tableauDoubleUtilise[position].trouble}
              posoMatin={this.state.tableauDoubleUtilise[position].posoMatin}
              posoMidi={this.state.tableauDoubleUtilise[position].posoMidi}
              posoSoir={this.state.tableauDoubleUtilise[position].posoSoir}
              jours={this.state.tableauDoubleUtilise[position].jours}
            ></CarteVerso>
          );
        }
      } else if (this.state.positionRetournee[1] == position) {
        if (this.state.tableauRV[position] == "Recto") {
          return (
            <CarteRecto
              hauteurCarte={270}
              sourceIm={this.state.tableauDoubleUtilise[position].idDesign}
              nomMedicament={this.state.tableauDoubleUtilise[position].nom}
            ></CarteRecto>
          );
        } else {
          return (
            <CarteVerso
              hauteurCarte={270}
              sourceIm={this.state.tableauDoubleUtilise[position].idDesign}
              nomMedicament={this.state.tableauDoubleUtilise[position].nom}
              trouble={this.state.tableauDoubleUtilise[position].trouble}
              posoMatin={this.state.tableauDoubleUtilise[position].posoMatin}
              posoMidi={this.state.tableauDoubleUtilise[position].posoMidi}
              posoSoir={this.state.tableauDoubleUtilise[position].posoSoir}
              jours={this.state.tableauDoubleUtilise[position].jours}
            ></CarteVerso>
          );
        }
      } else {
        return <CarteRemymeds hauteurCarte={270}></CarteRemymeds>;
      }
    }
  }

  // vérifie si les deux cartes retournées sont une paire de cartes du même médicament qui est un vrai médicament de l'utilisateur
  // ajoute les positons de la paire retournée au tableau double bons si c'est le cas
  // si toutes les paires de vrais médicaments ont été retournées, on envoire vers la page réussite
  _verificationPaire() {
    if (this.state.positionRetournee.length == 2) {
      for (var i = 0; i < this.state.tableauPositionsPaires.length; i++) {
        if (
          this.state.positionRetournee[0] ==
            this.state.tableauPositionsPaires[i].i &&
          this.state.positionRetournee[1] ==
            this.state.tableauPositionsPaires[i].j
        ) {
          if (this.state.tableauDoublesBons.length == 0) {
            let tab = [];
            let he = {
              position1: this.state.positionRetournee[0],
              position2: this.state.positionRetournee[1],
            };
            tab.push(he);
            this.setState({ tableauDoublesBons: tab });
          } else {
            let present = false;
            for (var j = 0; j < this.state.tableauDoublesBons.length; j++) {
              if (
                this.state.tableauDoublesBons[j].position1 ==
                  this.state.positionRetournee[0] &&
                this.state.tableauDoublesBons[j].position2 ==
                  this.state.positionRetournee[1]
              ) {
                present = true;
              } else if (
                this.state.tableauDoublesBons[j].position1 ==
                  this.state.positionRetournee[1] &&
                this.state.tableauDoublesBons[j].position2 ==
                  this.state.positionRetournee[0]
              ) {
                present = true;
              }
            }
            if (present == false) {
              let tab = this.state.tableauDoublesBons;
              let he = {
                position1: this.state.positionRetournee[0],
                position2: this.state.positionRetournee[1],
              };
              tab.push(he);
              this.setState({ tableauDoublesBons: tab });
            }
          }
        } else if (
          this.state.positionRetournee[1] ==
            this.state.tableauPositionsPaires[i].i &&
          this.state.positionRetournee[0] ==
            this.state.tableauPositionsPaires[i].j
        ) {
          if (this.state.tableauDoublesBons.length == 0) {
            let tab = [];
            let he = {
              position1: this.state.positionRetournee[0],
              position2: this.state.positionRetournee[1],
            };
            tab.push(he);
            this.setState({ tableauDoublesBons: tab });
          } else {
            let present = false;
            for (var j = 0; j < this.state.tableauDoublesBons.length; j++) {
              if (
                this.state.tableauDoublesBons[j].position1 ==
                  this.state.positionRetournee[0] &&
                this.state.tableauDoublesBons[j].position2 ==
                  this.state.positionRetournee[1]
              ) {
                present = true;
              } else if (
                this.state.tableauDoublesBons[j].position1 ==
                  this.state.positionRetournee[1] &&
                this.state.tableauDoublesBons[j].position2 ==
                  this.state.positionRetournee[0]
              ) {
                present = true;
              }
            }
            if (present == false) {
              let tab = this.state.tableauDoublesBons;
              let he = {
                position1: this.state.positionRetournee[0],
                position2: this.state.positionRetournee[1],
              };
              tab.push(he);
              this.setState({ tableauDoublesBons: tab });
            }
          }
        }
      }
    }

    if (
      this.state.tableauDoublesBons.length ==
      this.state.tableauPositionsPaires.length
    ) {
      let nb =
        1000 - Math.ceil(this.state.nbActions / this.state.tableauTest.length);
      this.props.navigation.navigate("Reussite", {
        points: nb,
      });
    }
  }

  _ajoutAction() {
    let nb = this.state.nbActions + 1;
    this.setState({ nbActions: nb });
  }

  async componentDidMount() {
    await this._recupererNoms();
    await this._tableauDouble();
  }

  render() {
    return (
      <View>
        <View
          style={{
            height: "20%",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Accueil");
            }}
          >
            <Bouton texte={"Retour à l'accueil"}></Bouton>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              this._setPositionRetournee(0);
              this._verificationPaire();
              this._ajoutAction();
            }}
          >
            {this._affichageRectoCartes(0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._setPositionRetournee(1);
              this._verificationPaire();
              this._ajoutAction();
            }}
          >
            {this._affichageRectoCartes(1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._setPositionRetournee(2);
              this._verificationPaire();
              this._ajoutAction();
            }}
          >
            {this._affichageRectoCartes(2)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._setPositionRetournee(3);
              this._verificationPaire();
              this._ajoutAction();
            }}
          >
            {this._affichageRectoCartes(3)}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              this._setPositionRetournee(4);
              this._verificationPaire();
              this._ajoutAction();
            }}
          >
            {this._affichageRectoCartes(4)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._setPositionRetournee(5);
              this._verificationPaire();
              this._ajoutAction();
            }}
          >
            {this._affichageRectoCartes(5)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._setPositionRetournee(6);
              this._verificationPaire();
              this._ajoutAction();
            }}
          >
            {this._affichageRectoCartes(6)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._setPositionRetournee(7);
              this._verificationPaire();
              this._ajoutAction();
            }}
          >
            {this._affichageRectoCartes(7)}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              this._setPositionRetournee(8);
              this._verificationPaire();
              this._ajoutAction();
            }}
          >
            {this._affichageRectoCartes(8)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._setPositionRetournee(9);
              this._verificationPaire();
              this._ajoutAction();
            }}
          >
            {this._affichageRectoCartes(9)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._setPositionRetournee(10);
              this._verificationPaire();
              this._ajoutAction();
            }}
          >
            {this._affichageRectoCartes(10)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._setPositionRetournee(11);
              this._verificationPaire();
              this._ajoutAction();
            }}
          >
            {this._affichageRectoCartes(11)}
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
});

export default MedmoryScreen;
