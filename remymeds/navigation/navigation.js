import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../screens/homeScreen.js";
import OrdonnanceScreen from "../screens/OrdonnanceScreen.js";
import ProfilScreen from "../screens/ProfilScreen.js";
import DeconnexionScreen from "../screens/DeconnexionScreen.js";
import ConnexionScreen from "../screens/ConnexionScreen.js";
import InscriptionScreen from "../screens/InscriptionScreen.js";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

const HomeStack = createStackNavigator({
  Accueil: HomeScreen,
  Ordonnance: OrdonnanceScreen,
  Profil: ProfilScreen,
  Deconnexion: DeconnexionScreen
});

const ConnexionStack = createStackNavigator(
  {
    Connexion: ConnexionScreen,
    Inscription: InscriptionScreen,
    Accueil: HomeStack
  },
  { headerMode: "none" }
);

export default AppContainer = createAppContainer(ConnexionStack);
