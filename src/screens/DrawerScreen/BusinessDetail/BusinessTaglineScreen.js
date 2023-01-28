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
import colors from "../../../res/colors/colors";
import images from "../../../res/imageConstant/images";
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "../../../utils/Size";
import strings from "../../../res/strings/strings";
import TopHeaderView from "../../../component/Header";
import ButtonText from "../../../component/ButtonText";
import ButtonImage from "../../../component/ButtonImage";

const BusinessTaglineScreen = ({ navigation }) => {
  // UseEffect ======================================================================================


  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
       
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
});

export default BusinessTaglineScreen;
