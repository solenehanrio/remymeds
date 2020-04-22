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

class ReussiteJeuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sup: false };
  }
  async _getMeilleurScore() {
    var userId = await firebase.auth().currentUser.uid;

    var refId = await firebase.database().ref("/users/" + userId + "/Medmory/");
    let meilleurScore = 0;
    meilleurScore = await refId.once(
      "value",
      (snapshot) => {
        meilleurScore = snapshot.val();
        if (meilleurScore < this.props.navigation.state.params.points) {
          this.setState({ sup: true });
        }
      },
      function (error) {}
    );
  }
  async _ajoutMeilleurScore() {
    await this._getMeilleurScore();
    var userId = await firebase.auth().currentUser.uid;
    if (this.state.sup == true) {
      await firebase
        .database()
        .ref("users/" + userId + "/Medmory/")
        .set({ score: this.props.navigation.state.params.points });
    }
  }

  async componentDidMount() {
    await this._ajoutMeilleurScore();
  }

  render() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "#61C7CC",
            width: "80%",
            height: "60%",
            borderRadius: 20,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 60, color: "#30696D" }}>Votre Score :</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              width: 200,
              height: 200,
              borderRadius: 100,
              marginBottom: 100,
            }}
          >
            <Text style={{ fontSize: 60, color: "#30696D" }}>
              {this.props.navigation.state.params.points}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Accueil");
          }}
        >
          <Bouton texte={"Retour à l'accueil"}></Bouton>
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
});

export default ReussiteJeuScreen;
