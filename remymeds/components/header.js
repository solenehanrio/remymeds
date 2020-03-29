import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { withNavigation } from "react-navigation";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  tabOptionBouton = [
    {
      id: 1,
      texte: "Profil",
      image: require("../includes/profil.png")
    },
    {
      id: 2,
      texte: "Déconnexion",
      image: require("../includes/EXIT.png")
    },
    {
      id: 3,
      texte: "Accueil",
      image: require("../includes/home.png")
    }
  ];

  _naviguerBoutonDroit() {
    if (this.props.optionBoutonDroit == 1) {
      this.props.navigation.navigate("Profil");
    } else if (this.props.optionBoutonDroit == 2) {
      this.props.navigation.navigate("Deconnexion");
    } else {
      this.props.navigation.navigate("Accueil");
    }
  }

  _naviguerBoutonGauche() {
    if (this.props.optionBoutonGauche == 1) {
      this.props.navigation.navigate("Profil");
    } else if (this.props.optionBoutonGauche == 2) {
      this.props.navigation.navigate("Deconnexion");
    } else {
      this.props.navigation.navigate("Accueil");
    }
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: "#CC3B95",
          height: "9%",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            this._naviguerBoutonGauche();
          }}
        >
          <Image
            style={{ height: "60%", resizeMode: "contain", marginTop: 10 }}
            source={
              this.tabOptionBouton.find(
                element => element.id == this.props.optionBoutonGauche
              ).image
            }
          ></Image>
          <Text style={{ fontSize: 20, color: "#540039", fontWeight: "bold" }}>
            {
              this.tabOptionBouton.find(
                element => element.id == this.props.optionBoutonGauche
              ).texte
            }
          </Text>
        </TouchableOpacity>
        <Text style={styles.textStyle}>{this.props.titrePage}</Text>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            this._naviguerBoutonDroit();
          }}
        >
          <Image
            style={{ height: "60%", resizeMode: "contain", marginTop: 10 }}
            source={
              this.tabOptionBouton.find(
                element => element.id == this.props.optionBoutonDroit
              ).image
            }
          ></Image>
          <Text style={{ fontSize: 20, color: "#540039", fontWeight: "bold" }}>
            {
              this.tabOptionBouton.find(
                element => element.id == this.props.optionBoutonDroit
              ).texte
            }
          </Text>
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
    justifyContent: "center"
  },
  textStyle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    textAlign: "center"
  }
});

export default withNavigation(Header);
