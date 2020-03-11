import React from "react";
import { StyleSheet, Text, View } from "react-native";

class ProfilScreen extends React.Component {
  static navigationOptions = {
    title: "Profil",
    headerStyle: { backgroundColor: "#CC3B95" },
    headerTintColor: "white"
  };

  render() {
    return (
      <View>
        <Text>"Coucou je suis le ProfilScreen</Text>
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

export default ProfilScreen;
