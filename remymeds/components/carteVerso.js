import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import tabImages from "../helpers/lienImages.js";

export default class CarteVerso extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          borderColor: "#F29B20",
          borderWidth: this.props.hauteurCarte / 40,
          backgroundColor: "#F29B20",
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
            backgroundColor: "white",
            borderRadius: this.props.hauteurCarte / 12 / 2,
            width: this.props.hauteurCarte / 12,
            height: this.props.hauteurCarte / 12,
            marginTop: this.props.hauteurCarte / 60,
            marginLeft: this.props.hauteurCarte / 60
          }}
        ></View>

        <View
          style={{
            alignItems: "center",
            height: "80%",
            width: "100%"
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              height: "30%",
              width: "70%",
              borderRadius: this.props.hauteurCarte / 60
            }}
          >
            <Image
              style={{
                height: this.props.hauteurCarte / 3 / 2,
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
              fontSize: this.props.hauteurCarte / 12,
              fontWeight: "bold",
              color: "#703F00",
              textAlign: "center",
              marginTop: this.props.hauteurCarte / 60
            }}
          >
            {this.props.nomMedicament}
          </Text>
          <Text
            style={{
              fontSize: this.props.hauteurCarte / 18,
              color: "#703F00",
              textAlign: "center",
              marginTop: this.props.hauteurCarte / 60,
              marginBottom: this.props.hauteurCarte / 30
            }}
          >
            {this.props.trouble}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: this.props.hauteurCarte / 60
            }}
          >
            <Image
              style={{
                height: this.props.hauteurCarte / 7,
                width: this.props.hauteurCarte / 7,
                resizeMode: "contain",
                marginLeft: this.props.hauteurCarte / 120,
                marginRight: this.props.hauteurCarte / 120
              }}
              source={require("../includes/sunrise.png")}
            ></Image>
            <Image
              style={{
                height: this.props.hauteurCarte / 7,
                width: this.props.hauteurCarte / 7,
                resizeMode: "contain",
                marginLeft: this.props.hauteurCarte / 120,
                marginRight: this.props.hauteurCarte / 120
              }}
              source={require("../includes/sun.png")}
            ></Image>
            <Image
              style={{
                height: this.props.hauteurCarte / 8,
                width: this.props.hauteurCarte / 8,
                resizeMode: "contain",
                marginLeft: this.props.hauteurCarte / 120,
                marginRight: this.props.hauteurCarte / 120
              }}
              source={require("../includes/moon.png")}
            ></Image>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: this.props.hauteurCarte / 10 / 2,
                width: this.props.hauteurCarte / 10,
                height: this.props.hauteurCarte / 10,
                marginLeft: this.props.hauteurCarte / 40,
                marginRight: this.props.hauteurCarte / 40,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: this.props.hauteurCarte / 18,
                  color: "#703F00"
                }}
              >
                {this.props.posoMatin}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: this.props.hauteurCarte / 10 / 2,
                width: this.props.hauteurCarte / 10,
                height: this.props.hauteurCarte / 10,
                marginLeft: this.props.hauteurCarte / 40,
                marginRight: this.props.hauteurCarte / 40,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: this.props.hauteurCarte / 18,
                  color: "#703F00"
                }}
              >
                {this.props.posoMidi}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: this.props.hauteurCarte / 10 / 2,
                width: this.props.hauteurCarte / 10,
                height: this.props.hauteurCarte / 10,
                marginLeft: this.props.hauteurCarte / 40,
                marginRight: this.props.hauteurCarte / 40,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: this.props.hauteurCarte / 18,
                  color: "#703F00"
                }}
              >
                {this.props.posoSoir}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row-reverse" }}>
          <View
            style={{
              backgroundColor: "white",
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
