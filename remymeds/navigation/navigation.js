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
import MedmoryScreen from "../screens/MedmoryScreen.js";
import InformationMedicamentScreen from "../screens/InformationMedicamentScreen.js";
import ChoixFormeScreen from "../screens/ChoixFormeScreen.js";
import ChoixDesignScreen from "../screens/ChoixDesignScreen.js";
import CreationMedicamentScreen from "../screens/CreationMedicamentScreen.js";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

const MedCreatorStack = createStackNavigator(
  {
    ChoixForme: ChoixFormeScreen,
    ChoixDesign: ChoixDesignScreen,
    InformationMedicament: InformationMedicamentScreen
  },
  { headerMode: "none" }
);

const OrdonnanceStack = createStackNavigator(
  {
    Ordonnance: OrdonnanceScreen,
    CreationMedicament: MedCreatorStack
  },
  { headerMode: "none" }
);

const HomeStack = createStackNavigator(
  {
    Accueil: HomeScreen,
    Ordonnance: OrdonnanceStack,
    Profil: ProfilScreen,
    Deconnexion: DeconnexionScreen,
    Medmory: MedmoryScreen
  },
  { headerMode: "none" }
);

const ConnexionStack = createStackNavigator(
  {
    Connexion: ConnexionScreen,
    Inscription: InscriptionScreen,
    Accueil: HomeStack
  },
  { headerMode: "none" }
);

export default AppContainer = createAppContainer(ConnexionStack);
