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
import tabImages from "../helpers/lienImages.js";
import CarteRemymeds from "../components/carteReMyMeds";
import { FlatList } from "react-native-gesture-handler";

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

class PosolitaireScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableauTest: [],
      medSelected: {},
      jourEnCours: "Lundi",
      accesOrdonnance: 0,
      partDaySelected: "",
      tabMatin: [],
      tabMidi: [],
      tabSoir: [],
      nbPoints: 0,
      sup: false,
    };
  }

  // dans tab matin, on regarde chaque médicament, si le jour correspond on marque des points, on fait ça pour tous les tableaux (matin, midi et soir)
  // ensuite pour chaque médicament dans le tableau test (tableau de tous les médicaments),
  // on regarde combien de fois le médicament apparait dans chaque tableau (matin, midi et soir) et on compare au posoMatin, posoMidi et pososoir
  // du tableau de médicaments pour compter le nb d'erreurs
  // comptage de points :
  // - médicament mis le bon jour : +10 points
  // - médicament mis mais pas le bon jour : -5 points
  // - médicament mis dans la bonne partie de la journée : +20 points
  // - médicament mis pas dans la bonne partie de la journée : -3 points
  // A la fin on fait un ratio du nb de points par le nb de médicaments
  _fonctionCalculPoints() {
    let tabMedPresentsJour = [];
    let nbTotPoints = 0;

    for (let i = 0; i < this.state.tabMatin.length; i++) {
      tabMedPresentsJour.push(this.state.tabMatin[i]);
    }
    for (let i = 0; i < this.state.tabMidi.length; i++) {
      tabMedPresentsJour.push(this.state.tabMidi[i]);
    }
    for (let i = 0; i < this.state.tabSoir.length; i++) {
      tabMedPresentsJour.push(this.state.tabSoir[i]);
    }
    console.log(tabMedPresentsJour);
    // boucle qui compte les points de la prise du médicament ou non le jour en cours
    if (tabMedPresentsJour != []) {
      for (let j = 0; j < tabMedPresentsJour.length; j++) {
        let presence = false;
        for (let k = 0; k < tabMedPresentsJour[j].jours.length; k++) {
          if (tabMedPresentsJour[j].jours[k] == this.state.jourEnCours) {
            nbTotPoints = nbTotPoints + 10;
            presence = true;
            // boucle qui compte les points de la prise du médicament ou non sur la partie de la journée
            // entrée par l'utilisateur
            let tableauMed = this.state.tableauTest;
            for (var i = 0; i < tableauMed.length; i++) {
              let nbMatin = 0;
              let nbMidi = 0;
              let nbSoir = 0;

              // on compte le nombre de fois où chaque médicament apparait dans chaque partie de la journée
              for (var l = 0; l < this.state.tabMatin.length; l++) {
                if (this.state.tabMatin[l].nom == tableauMed[l].nom) {
                  nbMatin = nbMatin + 1;
                }
              }
              for (var l = 0; l < this.state.tabMidi.length; l++) {
                if (this.state.tabMidi[l].nom == tableauMed[l].nom) {
                  nbMidi = nbMidi + 1;
                }
              }
              for (var l = 0; l < this.state.tabSoir.length; l++) {
                if (this.state.tabSoir[l].nom == tableauMed[l].nom) {
                  nbSoir = nbSoir + 1;
                }
              }

              // on compare les résultats à la véritable posologie dum médicament et on attribut les points
              let posologieMatin = tableauMed[i].posoMatin;
              let posologieMidi = tableauMed[i].posoMidi;
              let posologieSoir = tableauMed[i].posoSoir;

              let erreurMatin = Math.abs(posologieMatin - nbMatin);
              let erreurMidi = Math.abs(posologieMidi - nbMidi);
              let erreurSoir = Math.abs(posologieSoir - nbSoir);

              if (erreurMatin == 0) {
                nbTotPoints = nbTotPoints + posologieMatin * 20;
              } else {
                nbTotPoints = nbTotPoints - erreurMatin * 3;
              }
              if (erreurMidi == 0) {
                nbTotPoints = nbTotPoints + posologieMidi * 20;
              } else {
                nbTotPoints = nbTotPoints - erreurMidi * 3;
              }
              if (erreurSoir == 0) {
                nbTotPoints = nbTotPoints + posologieSoir * 20;
              } else {
                nbTotPoints = nbTotPoints - erreurSoir * 3;
              }
            }
          }
        }
        if (presence == false) {
          nbTotPoints = nbTotPoints - 5;
        }
      }
    }
    let nb = this.state.nbPoints;
    nb = nb + nbTotPoints;
    this.setState({ nbPoints: nb });
  }
  // fonction permettant de changer l'affichage au fur et à mesure de l'avancement dans le jeu
  // l'affichage change en fonction du state 'jour en cours'.
  _fonctionAffichageGenerale() {
    if (this.state.jourEnCours == "Lundi") {
      return this._displayLundi();
    }
    if (this.state.jourEnCours == "Mardi") {
      return this._displayMardi();
    }
    if (this.state.jourEnCours == "Mercredi") {
      return this._displayMercredi();
    }
    if (this.state.jourEnCours == "Jeudi") {
      return this._displayJeudi();
    }
    if (this.state.jourEnCours == "Vendredi") {
      return this._displayVendredi();
    }
    if (this.state.jourEnCours == "Samedi") {
      return this._displaySamedi();
    }
    if (this.state.jourEnCours == "Dimanche") {
      return this._displayDimanche();
    }
    if (this.state.jourEnCours == "Fini") {
      return this._displayPoints();
    }
  }

  // permet de supprimer du tableau de la partie de la journée en paramètre, le médicament sélectionné par l'utilisateur
  // en prenant en paramètre sa clé
  _fonctionSuprMedTab(keyMed, partDay) {
    let tab = [];
    if (partDay == "matin") {
      tab = this.state.tabMatin;
    } else if (partDay == "midi") {
      tab = this.state.tabMidi;
    } else if (partDay == "soir") {
      tab = this.state.tabSoir;
    }
    if (tab != []) {
      for (let i = 0; i < tab.length; i++) {
        if (keyMed == i) {
          tab.splice(i, 1);

          if (partDay == "matin") {
            this.setState({ tabMatin: tab });
          } else if (partDay == "midi") {
            this.setState({ tabMidi: tab });
          } else if (partDay == "soir") {
            this.setState({ tabSoir: tab });
          }
        }
      }
    }
  }

  // permet d'ajouter le médicament sélectionné au tableau associé à la partie de la journée sélectionnée
  _fonctionMAJTab(partDay) {
    if (Object.keys(this.state.medSelected).length === 0) {
      console.log("prout");
    } else {
      console.log("coucou");
      console.log(this.state.medSelected);
      if (partDay == "matin") {
        let tab = this.state.tabMatin;
        let nb = tab.length;
        const medKey = {
          key: nb,
          nom: this.state.medSelected.nom,
          idDesign: this.state.medSelected.idDesign,
          posoMatin: this.state.medSelected.posoMatin,
          posoMidi: this.state.medSelected.posoMidi,
          posoSoir: this.state.medSelected.posoSoir,
          jours: this.state.medSelected.jours,
        };
        tab.push(medKey);
        this.setState({ tabMatin: tab });
      } else if (partDay == "midi") {
        let tab = this.state.tabMidi;
        let nb = tab.length;
        const medKey = {
          key: nb,
          nom: this.state.medSelected.nom,
          idDesign: this.state.medSelected.idDesign,
          posoMatin: this.state.medSelected.posoMatin,
          posoMidi: this.state.medSelected.posoMidi,
          posoSoir: this.state.medSelected.posoSoir,
          jours: this.state.medSelected.jours,
        };
        tab.push(medKey);
        this.setState({ tabMidi: tab });
      } else if (partDay == "soir") {
        let tab = this.state.tabSoir;
        let nb = tab.length;
        const medKey = {
          key: nb,
          nom: this.state.medSelected.nom,
          idDesign: this.state.medSelected.idDesign,
          posoMatin: this.state.medSelected.posoMatin,
          posoMidi: this.state.medSelected.posoMidi,
          posoSoir: this.state.medSelected.posoSoir,
          jours: this.state.medSelected.jours,
        };
        tab.push(medKey);
        this.setState({ tabSoir: tab });
      }
    }
  }

  _selectedCardStyle(nomMed, sourceImage) {
    if (this.state.medSelected.nom == nomMed) {
      return (
        <CarteRecto
          hauteurCarte={250}
          sourceIm={sourceImage}
          nomMedicament={nomMed}
        ></CarteRecto>
      );
    } else {
      return (
        <CarteRecto
          hauteurCarte={200}
          sourceIm={sourceImage}
          nomMedicament={nomMed}
        ></CarteRecto>
      );
    }
  }
  // affichage du lundi
  _displayLundi() {
    return (
      <View style={{ height: "100%" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Accueil");
            }}
          >
            <Bouton texte={"Retour à l'accueil"}></Bouton>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._ordoAccess();
              this.setState({ accesOrdonnance: 1 });
            }}
          >
            <Bouton texte={"Ordonnance"}></Bouton>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 80, color: "#540039" }}>LUNDI</Text>
        </View>
        <View style={styles.dayStyle}>
          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("matin");
              }}
            >
              <Image
                style={{ width: "65%", resizeMode: "contain" }}
                source={require("../includes/MATIN.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabMatin}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "matin");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.idDesign}
              />
            </View>
          </View>

          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("midi");
              }}
            >
              <Image
                style={{ width: "60%", resizeMode: "contain" }}
                source={require("../includes/MIDI.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabMidi}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "midi");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
              />
            </View>
          </View>

          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("soir");
              }}
            >
              <Image
                style={{ width: "60%", resizeMode: "contain" }}
                source={require("../includes/SOIR.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabSoir}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "soir");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
              />
            </View>
          </View>
        </View>
        <FlatList
          style={{ marginTop: 20 }}
          horizontal={true}
          data={this.state.tableauTest}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={() => {
                this.setState({ medSelected: item });
                console.log(this.state.tabMatin);
              }}
            >
              {this._selectedCardStyle(item.nom, item.idDesign)}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
        />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{ width: "80%" }}
            onPress={() => {
              this._fonctionCalculPoints(),
                this.setState({
                  medSelected: {},
                  jourEnCours: "Mardi",
                  partDaySelected: "",
                  tabMatin: [],
                  tabMidi: [],
                  tabSoir: [],
                });
            }}
          >
            <Bouton texte={"Valider et passer \nau jour suivant"}></Bouton>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // affichage du mardi
  _displayMardi() {
    return (
      <View style={{ height: "100%" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Accueil");
            }}
          >
            <Bouton texte={"Retour à l'accueil"}></Bouton>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._ordoAccess();
              this.setState({ accesOrdonnance: 1 });
            }}
          >
            <Bouton texte={"Ordonnance"}></Bouton>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 80, color: "#540039" }}>MARDI</Text>
        </View>
        <View style={styles.dayStyle}>
          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("matin");
              }}
            >
              <Image
                style={{ width: "65%", resizeMode: "contain" }}
                source={require("../includes/MATIN.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabMatin}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "matin");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.idDesign}
              />
            </View>
          </View>

          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("midi");
              }}
            >
              <Image
                style={{ width: "60%", resizeMode: "contain" }}
                source={require("../includes/MIDI.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabMidi}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "midi");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
              />
            </View>
          </View>

          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("soir");
              }}
            >
              <Image
                style={{ width: "60%", resizeMode: "contain" }}
                source={require("../includes/SOIR.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabSoir}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "soir");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
              />
            </View>
          </View>
        </View>
        <FlatList
          style={{ marginTop: 20 }}
          horizontal={true}
          data={this.state.tableauTest}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={() => {
                this.setState({ medSelected: item });
                console.log(this.state.tabMatin);
              }}
            >
              {this._selectedCardStyle(item.nom, item.idDesign)}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
        />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{ width: "80%" }}
            onPress={() => {
              this._fonctionCalculPoints(),
                this.setState({
                  medSelected: {},
                  jourEnCours: "Mercredi",
                  partDaySelected: "",
                  tabMatin: [],
                  tabMidi: [],
                  tabSoir: [],
                });
            }}
          >
            <Bouton texte={"Valider et passer \nau jour suivant"}></Bouton>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // affichage du mercredi
  _displayMercredi() {
    return (
      <View style={{ height: "100%" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Accueil");
            }}
          >
            <Bouton texte={"Retour à l'accueil"}></Bouton>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._ordoAccess();
              this.setState({ accesOrdonnance: 1 });
            }}
          >
            <Bouton texte={"Ordonnance"}></Bouton>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 80, color: "#540039" }}>MERCREDI</Text>
        </View>
        <View style={styles.dayStyle}>
          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("matin");
              }}
            >
              <Image
                style={{ width: "65%", resizeMode: "contain" }}
                source={require("../includes/MATIN.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabMatin}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "matin");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.idDesign}
              />
            </View>
          </View>

          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("midi");
              }}
            >
              <Image
                style={{ width: "60%", resizeMode: "contain" }}
                source={require("../includes/MIDI.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabMidi}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "midi");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
              />
            </View>
          </View>

          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("soir");
              }}
            >
              <Image
                style={{ width: "60%", resizeMode: "contain" }}
                source={require("../includes/SOIR.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabSoir}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "soir");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
              />
            </View>
          </View>
        </View>
        <FlatList
          style={{ marginTop: 20 }}
          horizontal={true}
          data={this.state.tableauTest}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={() => {
                this.setState({ medSelected: item });
                console.log(this.state.tabMatin);
              }}
            >
              {this._selectedCardStyle(item.nom, item.idDesign)}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
        />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{ width: "80%" }}
            onPress={() => {
              this._fonctionCalculPoints(),
                this.setState({
                  medSelected: {},
                  jourEnCours: "Jeudi",
                  partDaySelected: "",
                  tabMatin: [],
                  tabMidi: [],
                  tabSoir: [],
                });
            }}
          >
            <Bouton texte={"Valider et passer \nau jour suivant"}></Bouton>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // affichage du jeudi
  _displayJeudi() {
    return (
      <View style={{ height: "100%" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Accueil");
            }}
          >
            <Bouton texte={"Retour à l'accueil"}></Bouton>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._ordoAccess();
              this.setState({ accesOrdonnance: 1 });
            }}
          >
            <Bouton texte={"Ordonnance"}></Bouton>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 80, color: "#540039" }}>JEUDI</Text>
        </View>
        <View style={styles.dayStyle}>
          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("matin");
              }}
            >
              <Image
                style={{ width: "65%", resizeMode: "contain" }}
                source={require("../includes/MATIN.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabMatin}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "matin");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.idDesign}
              />
            </View>
          </View>

          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("midi");
              }}
            >
              <Image
                style={{ width: "60%", resizeMode: "contain" }}
                source={require("../includes/MIDI.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabMidi}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "midi");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
              />
            </View>
          </View>

          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("soir");
              }}
            >
              <Image
                style={{ width: "60%", resizeMode: "contain" }}
                source={require("../includes/SOIR.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabSoir}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "soir");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
              />
            </View>
          </View>
        </View>
        <FlatList
          style={{ marginTop: 20 }}
          horizontal={true}
          data={this.state.tableauTest}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={() => {
                this.setState({ medSelected: item });
                console.log(this.state.tabMatin);
              }}
            >
              {this._selectedCardStyle(item.nom, item.idDesign)}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
        />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{ width: "80%" }}
            onPress={() => {
              this._fonctionCalculPoints(),
                this.setState({
                  medSelected: {},
                  jourEnCours: "Vendredi",
                  partDaySelected: "",
                  tabMatin: [],
                  tabMidi: [],
                  tabSoir: [],
                });
            }}
          >
            <Bouton texte={"Valider et passer \nau jour suivant"}></Bouton>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // affichage du vendredi
  _displayVendredi() {
    return (
      <View style={{ height: "100%" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Accueil");
            }}
          >
            <Bouton texte={"Retour à l'accueil"}></Bouton>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._ordoAccess();
              this.setState({ accesOrdonnance: 1 });
            }}
          >
            <Bouton texte={"Ordonnance"}></Bouton>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 80, color: "#540039" }}>VENDREDI</Text>
        </View>
        <View style={styles.dayStyle}>
          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("matin");
              }}
            >
              <Image
                style={{ width: "65%", resizeMode: "contain" }}
                source={require("../includes/MATIN.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabMatin}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "matin");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.idDesign}
              />
            </View>
          </View>

          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("midi");
              }}
            >
              <Image
                style={{ width: "60%", resizeMode: "contain" }}
                source={require("../includes/MIDI.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabMidi}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "midi");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
              />
            </View>
          </View>

          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("soir");
              }}
            >
              <Image
                style={{ width: "60%", resizeMode: "contain" }}
                source={require("../includes/SOIR.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabSoir}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "soir");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
              />
            </View>
          </View>
        </View>
        <FlatList
          style={{ marginTop: 20 }}
          horizontal={true}
          data={this.state.tableauTest}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={() => {
                this.setState({ medSelected: item });
                console.log(this.state.tabMatin);
              }}
            >
              {this._selectedCardStyle(item.nom, item.idDesign)}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
        />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{ width: "80%" }}
            onPress={() => {
              this._fonctionCalculPoints(),
                this.setState({
                  medSelected: {},
                  jourEnCours: "Samedi",
                  partDaySelected: "",
                  tabMatin: [],
                  tabMidi: [],
                  tabSoir: [],
                });
            }}
          >
            <Bouton texte={"Valider et passer \nau jour suivant"}></Bouton>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // affichage du samedi
  _displaySamedi() {
    return (
      <View style={{ height: "100%" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Accueil");
            }}
          >
            <Bouton texte={"Retour à l'accueil"}></Bouton>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._ordoAccess();
              this.setState({ accesOrdonnance: 1 });
            }}
          >
            <Bouton texte={"Ordonnance"}></Bouton>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 80, color: "#540039" }}>SAMEDI</Text>
        </View>
        <View style={styles.dayStyle}>
          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("matin");
              }}
            >
              <Image
                style={{ width: "65%", resizeMode: "contain" }}
                source={require("../includes/MATIN.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabMatin}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "matin");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.idDesign}
              />
            </View>
          </View>

          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("midi");
              }}
            >
              <Image
                style={{ width: "60%", resizeMode: "contain" }}
                source={require("../includes/MIDI.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabMidi}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "midi");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
              />
            </View>
          </View>

          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("soir");
              }}
            >
              <Image
                style={{ width: "60%", resizeMode: "contain" }}
                source={require("../includes/SOIR.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabSoir}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "soir");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
              />
            </View>
          </View>
        </View>
        <FlatList
          style={{ marginTop: 20 }}
          horizontal={true}
          data={this.state.tableauTest}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={() => {
                this.setState({ medSelected: item });
                console.log(this.state.tabMatin);
              }}
            >
              {this._selectedCardStyle(item.nom, item.idDesign)}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
        />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{ width: "80%" }}
            onPress={() => {
              this._fonctionCalculPoints(),
                this.setState({
                  medSelected: {},
                  jourEnCours: "Dimanche",
                  partDaySelected: "",
                  tabMatin: [],
                  tabMidi: [],
                  tabSoir: [],
                });
            }}
          >
            <Bouton texte={"Valider et passer \nau jour suivant"}></Bouton>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // affichage du dimanche
  _displayDimanche() {
    return (
      <View style={{ height: "100%" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Accueil");
            }}
          >
            <Bouton texte={"Retour à l'accueil"}></Bouton>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._ordoAccess();
              this.setState({ accesOrdonnance: 1 });
            }}
          >
            <Bouton texte={"Ordonnance"}></Bouton>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 80, color: "#540039" }}>DIMANCHE</Text>
        </View>
        <View style={styles.dayStyle}>
          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("matin");
              }}
            >
              <Image
                style={{ width: "65%", resizeMode: "contain" }}
                source={require("../includes/MATIN.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabMatin}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "matin");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.idDesign}
              />
            </View>
          </View>

          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("midi");
              }}
            >
              <Image
                style={{ width: "60%", resizeMode: "contain" }}
                source={require("../includes/MIDI.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabMidi}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "midi");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
              />
            </View>
          </View>

          <View style={styles.partDayContainerStyle}>
            <TouchableOpacity
              style={styles.titlePartDayStyle}
              onPress={() => {
                this._fonctionMAJTab("soir");
              }}
            >
              <Image
                style={{ width: "60%", resizeMode: "contain" }}
                source={require("../includes/SOIR.png")}
              ></Image>
            </TouchableOpacity>
            <View style={styles.partdayStyle}>
              <FlatList
                style={{ marginTop: 20 }}
                horizontal={true}
                data={this.state.tabSoir}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this._fonctionSuprMedTab(item.key, "soir");
                    }}
                  >
                    <CarteRecto
                      hauteurCarte={150}
                      sourceIm={item.idDesign}
                      nomMedicament={item.nom}
                    ></CarteRecto>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
              />
            </View>
          </View>
        </View>
        <FlatList
          style={{ marginTop: 20 }}
          horizontal={true}
          data={this.state.tableauTest}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={() => {
                this.setState({ medSelected: item });
                console.log(this.state.tabMatin);
              }}
            >
              {this._selectedCardStyle(item.nom, item.idDesign)}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
        />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{ width: "80%" }}
            onPress={() => {
              this.setState({ jourEnCours: "Fini" });
            }}
          >
            <Bouton texte={"Valider et \nDécouvrir mon score"}></Bouton>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  //affichage des points à la fin
  _displayPoints() {
    let nbFinalPoints =
      1000 - Math.ceil(this.state.nbPoints / this.state.tableauTest.length);
    this.props.navigation.navigate("ReussitePosolitaire", {
      points: nbFinalPoints,
    });
  }

  _ordoAccess() {
    if (this.state.accesOrdonnance == 0) {
      this.props.navigation.navigate("AccesOrdo");
    } else {
      Alert.alert(
        "Acces refusé",
        "Attention, vous avez déjà vu l'ordonnance une fois, vous n'avez plus le droit d'y accéder",
        [
          {
            text: "Retour au jeu",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  }
  // récupération et création du tableau de médicament de l'utilisateur.
  async _recupererNoms() {
    var userId = await firebase.auth().currentUser.uid;
    console.log(userId);

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
            const he = {
              nom: idDesignMed[i][0],
              idDesign: idDesignMed[i][1].idDesign,
              posoMatin: idDesignMed[i][1].posoMatin,
              posoMidi: idDesignMed[i][1].posoMidi,
              posoSoir: idDesignMed[i][1].posoSoir,
              jours: idDesignMed[i][1].jours,
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

  async componentDidMount() {
    await this._recupererNoms();
  }

  render() {
    return (
      <View style={{ height: "100%" }}>
        {this._fonctionAffichageGenerale()}
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
  dayContainerStyle: {
    marginTop: 20,
    flexDirection: "row",
    height: "8%",
    justifyContent: "space-between",
    marginEnd: 3,
  },
  dayStyle: {
    height: "45%",
    justifyContent: "space-between",
  },
  titlePartDayStyle: {
    backgroundColor: "#CC3B95",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  partDayContainerStyle: {
    flexDirection: "row",
    height: "33%",
    justifyContent: "space-between",
  },
  partdayStyle: {
    borderColor: "#CC3B95",
    borderWidth: 5,
    width: "70%",
  },
  textDayStyle: {
    color: "#30696D",
    fontSize: 50,
  },
});

export default PosolitaireScreen;
