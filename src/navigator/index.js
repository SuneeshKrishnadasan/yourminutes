import React from "react";
import { Platform, StatusBar, View, Image } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  BottomTabBar
} from "react-navigation";

import SplashScreen from "../modules/SplashScreen";
import Login from "../modules/Login";
import Home from "./tab"
import Camera from "../modules/Camera"
import ImgView from "../modules/imgViewer"
const AppNavigator = createStackNavigator(
  {
    Splash: { screen: SplashScreen },
    Login: { screen: Login },
    Home: { screen: Home }, Camera: { screen: Camera },ImgView: { screen: ImgView },
  },
  {
   headerMode: "none",
     navigationOptions: {
      headerVisible: false
    }
  }
);
export default createAppContainer(AppNavigator);