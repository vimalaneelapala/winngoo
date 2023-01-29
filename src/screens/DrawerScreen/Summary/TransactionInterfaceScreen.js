import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerActions } from "@react-navigation/native";
// Custom ======================================================================================
import TopHeaderView from "../../../component/Header";
import ButtonText from "../../../component/ButtonText";
import colors from "../../../res/colors/colors";
import images from "../../../res/imageConstant/images";
import strings from "../../../res/strings/strings";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "../../../utils/Size";

const TransactionInterfaceScreen = ({ navigation }) => {
  const [cardNumber, setcardNumber] = useState("");
  // UseEffect ======================================================================================
  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <TopHeaderView
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        headerText={strings.TransactionInterface}
      />
      <View style={styles.container}>
        <View style={styles.shadowView}>
          <Text style={styles.blackSmallText}>
            Enter Winngoo Card Number/ Email
          </Text>
          <TextInput
            value={cardNumber}
            onChangeText={(cardNumber) => {
              setcardNumber(cardNumber);
            }}
            placeholder={"Enter here..."}
            style={styles.textInputstyle}
          />
          <ButtonText
            text={strings.submit}
            loginBtn={{
              marginTop: responsiveScreenWidth(5),
              width: "50%",
              justifyContent: "center",
            }}
            loginText={{ marginStart: responsiveScreenWidth(10) }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
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
  blackSmallText: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: "500",
  },
  textInputstyle: {
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.1),
    fontSize: responsiveScreenFontSize(2),
    width: "100%",
    marginTop: responsiveScreenWidth(6),
    marginBottom: responsiveScreenWidth(6),
    alignSelf: "center",
    color: colors.BLACK,
  },
});

export default TransactionInterfaceScreen;
