import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import tabImages from "../helpers/lienImages.js";

export default class AffichageImage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Image
          style={{ height: "90%", resizeMode: "contain" }}
          source={
            tabImages.find(element => element.id == this.props.sourceIm).source
          }
        ></Image>
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
  }
});
