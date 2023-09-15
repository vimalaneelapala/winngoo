import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from "react-native";
// Custom ======================================================================================
import colors from "../res/colors/colors";
import images from "../res/imageConstant/images";
import { responsiveScreenHeight, responsiveScreenWidth } from "../utils/Size";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  // UseEffect ======================================================================================
  useEffect(async () => {
    setTimeout(async () => {
      let isLogin = await AsyncStorage.getItem("isLogin");
      isLogin === "true"
        ? navigation.navigate("DrawerNavigator")
        : navigation.navigate("MemberLoginScreen");
    }, 3000);
  });

  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image
          source={images.logoWithName}
          resizeMode="contain"
          style={styles.imageicon}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLACK,
    justifyContent: "center",
    alignItems: "center",
  },
  imageicon: {
    height: responsiveScreenWidth(50),
    width: responsiveScreenWidth(80),
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default SplashScreen;
