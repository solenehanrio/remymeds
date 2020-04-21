import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import tabImages from "../helpers/lienImages.js";

export default class CarteRemymeds extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          borderColor: "#F29B20",
          borderWidth: this.props.hauteurCarte / 40,
          backgroundColor: "white",
          width: this.props.hauteurCarte * (2 / 3),
          height: this.props.hauteurCarte,
          marginTop: this.props.hauteurCarte / 30,
          borderRadius: this.props.hauteurCarte / 24,
          marginBottom: this.props.hauteurCarte / 30,
          justifyContent: "space-between",
          marginLeft: this.props.hauteurCarte / 30,
          marginRight: this.props.hauteurCarte / 30,
        }}
      >
        <View
          style={{
            backgroundColor: "#F29B20",
            borderRadius: this.props.hauteurCarte / 12 / 2,
            width: this.props.hauteurCarte / 12,
            height: this.props.hauteurCarte / 12,
            marginTop: this.props.hauteurCarte / 60,
            marginLeft: this.props.hauteurCarte / 60,
          }}
        ></View>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{
              width: "80%",
              resizeMode: "contain",
            }}
            source={require("../includes/logo_V2.png")}
          ></Image>
        </View>
        <View style={{ flexDirection: "row-reverse" }}>
          <View
            style={{
              backgroundColor: "#F29B20",
              borderRadius: this.props.hauteurCarte / 12 / 2,
              width: this.props.hauteurCarte / 12,
              height: this.props.hauteurCarte / 12,
              marginBottom: this.props.hauteurCarte / 60,
              marginRight: this.props.hauteurCarte / 60,
            }}
          ></View>
        </View>
      </View>
    );
  }
}
