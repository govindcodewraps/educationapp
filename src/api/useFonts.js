import React from "react";
import * as Font from "expo-font";

export default useFonts = async () => {
  await Font.loadAsync({
    "Black": require("../assets/fonts/Montserrat-Black.ttf"),
    "BlackItalic": require("../assets/fonts/Montserrat-BlackItalic.ttf"),
    "Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "BoldItalic": require("../assets/fonts/Montserrat-BoldItalic.ttf"),
    "ExtraBold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
    "ExtraBoldItalic": require("../assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
    "ExtraLight": require("../assets/fonts/Montserrat-ExtraLight.ttf"),
    "ExtraLightItalic": require("../assets/fonts/Montserrat-ExtraLightItalic.ttf"),
    "Italic": require("../assets/fonts/Montserrat-Italic.ttf"),
    "Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "LightItalic": require("../assets/fonts/Montserrat-LightItalic.ttf"),
    "Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "MediumItalic": require("../assets/fonts/Montserrat-MediumItalic.ttf"),
    "Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "SemiBoldItalic": require("../assets/fonts/Montserrat-SemiBoldItalic.ttf"),
    "Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
    "ThinItalic": require("../assets/fonts/Montserrat-ThinItalic.ttf"),
  });
};
