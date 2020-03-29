import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import tabImages from "../helpers/lienImages.js";

export default class CarteRecto extends React.Component {
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
          marginRight: this.props.hauteurCarte / 30
        }}
      >
        <View
          style={{
            backgroundColor: "#F29B20",
            borderRadius: this.props.hauteurCarte / 12 / 2,
            width: this.props.hauteurCarte / 12,
            height: this.props.hauteurCarte / 12,
            marginTop: this.props.hauteurCarte / 60,
            marginLeft: this.props.hauteurCarte / 60
          }}
        ></View>
        <Text
          style={{
            fontSize: this.props.hauteurCarte / 10,
            fontWeight: "bold",
            color: "#F29B20",
            textAlign: "center"
          }}
        >
          {this.props.nomMedicament}
        </Text>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{
              height: this.props.hauteurCarte / 3,
              resizeMode: "contain"
            }}
            source={
              tabImages.find(element => element.id == this.props.sourceIm)
                .source
            }
          ></Image>
        </View>
        <Text
          style={{
            fontSize: this.props.hauteurCarte / 10,
            fontWeight: "bold",
            color: "#F29B20",
            textAlign: "center",
            rotation: 180
          }}
        >
          {this.props.nomMedicament}
        </Text>
        <View style={{ flexDirection: "row-reverse" }}>
          <View
            style={{
              backgroundColor: "#F29B20",
              borderRadius: this.props.hauteurCarte / 12 / 2,
              width: this.props.hauteurCarte / 12,
              height: this.props.hauteurCarte / 12,
              marginBottom: this.props.hauteurCarte / 60,
              marginRight: this.props.hauteurCarte / 60
            }}
          ></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
