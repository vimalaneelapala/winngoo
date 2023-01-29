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
import AsyncStorage from "@react-native-async-storage/async-storage";
// Custom ======================================================================================
import TopHeaderView from "../../../component/Header";
import ButtonImage from "../../../component/ButtonImage";
import colors from "../../../res/colors/colors";
import images from "../../../res/imageConstant/images";
import strings from "../../../res/strings/strings";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "../../../utils/Size";
import { DrawerActions } from "@react-navigation/native";

const NewsLetterScreen = ({ navigation }) => {
  // UseEffect ======================================================================================

  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <TopHeaderView
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        headerText={strings.Newsletter}
      />
      <View style={styles.container}>
        <ButtonImage
          text={"Subscribe"}
          images={images.GmailIcon}
          loginBtn={{ backgroundColor: colors.green,marginTop:responsiveScreenWidth(5) }}
        />
        <View style={[styles.shadowView, { backgroundColor: colors.cyan }]}>
          <Text style={styles.whiteMediumText}>{strings.Note1}</Text>
          <Text style={styles.whiteSmallText}>{strings.Note2}</Text>
        </View>
        <View style={styles.shadowView}>
          <Text style={styles.blackMediumText}>{strings.Note}</Text>
          <Text style={styles.blackSmallText}>{strings.NoteText}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  shadowView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: colors.white,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    padding: responsiveScreenWidth(4),
    marginTop: responsiveScreenWidth(5),
    borderRadius: responsiveScreenWidth(2),
  },
  whiteMediumText: {
    color: colors.WHITE,
    fontSize: responsiveScreenFontSize(2),
    fontWeight: "700",
    alignSelf: "center",
    textAlign: "center",
  },
  whiteSmallText: {
    color: colors.WHITE,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: "500",
    alignSelf: "center",
    textAlign: "center",
    marginTop: responsiveScreenWidth(5),
  },
  blackMediumText: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(2),
    fontWeight: "700",
    marginStart: responsiveScreenWidth(2),
  },
  blackSmallText: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: "400",
    alignSelf: "center",
    marginTop: responsiveScreenWidth(5),
  },
});

export default NewsLetterScreen;
