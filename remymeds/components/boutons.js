import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Bouton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.boutonStyle}>
        <Text style={styles.textStyle}>{this.props.texte}</Text>
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
  boutonStyle: {
    backgroundColor: "#F29B20",
    marginTop: 20,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: "grey",
    elevation: 10
  },
  textStyle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#703F00",
    marginTop: 5,
    marginEnd: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    textAlign: "center"
  }
});
