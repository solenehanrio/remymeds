import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class CarteRecto extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.carteStyle}>
        <View style={styles.petitRondStyle}></View>
        <Text style={styles.textStyle}>{this.props.nomMedicament}</Text>
        <Image
          style={styles.styleImageMedicament}
          source={require(this.props.sourceImage)}
        ></Image>
        <Text style={styles.textEnversStyle}>{this.props.nomMedicament}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carteStyle: {
    borderColor: "#F29B20",
    backgroundColor: "white",
    width: this.props.largeurCarte,
    height: this.props.hauteurCarte,
    marginTop: 20,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: "center"
  },
  textStyle: {
    fontSize: this.props.taillePolice,
    fontWeight: "bold",
    color: "#F29B20",
    textAlign: "center"
  },
  textEnversStyle: {
    fontSize: this.props.taillePolice,
    fontWeight: "bold",
    color: "#F29B20",
    textAlign: "center",
    rotation: 180
  },
  petitRondStyle: {
    backgroundColor: "#F29B20",
    borderRadius: 25,
    width: 50,
    height: 50
  },
  styleImageMedicament: {
    width: this.props.largeurMedicament,
    resizeMode: "contain"
  }
});
