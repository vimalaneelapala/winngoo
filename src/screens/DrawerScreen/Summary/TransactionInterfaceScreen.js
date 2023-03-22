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
  Modal,
  Platform,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerActions } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
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

import { BaseURL, EndPoint } from "../../../api/ApiConstant";

const TransactionInterfaceScreen = ({ navigation }) => {
  const [cardNumber, setcardNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setsuccessModal] = useState(false);
  const [failureModal, setfailureModal] = useState(false);
  const [err, setErr] = useState(false);
  // UseEffect ======================================================================================
  // ==========================================Api Call================
  const transactionInterfaceCallApi = async () => {
    let token = await AsyncStorage.getItem("token");
    setIsLoading(true);
    var data = {
      "winngoo_card_email": cardNumber
    };
    var header = {
      headers: {
        "x-access-token": token,
        "Content-Type": "multipart/form-data",
        "Accept": "multipart/form-data"
      },
    };
    await axios
      .post(BaseURL + EndPoint.MEMBERDETAILINTERFACE, data, header)
      .then(async (res) => {
        console.log(JSON.stringify(res));
        setcardNumber("")
        setsuccessModal(true)
      })
      .catch((err) => {
        setIsLoading(false);
        setfailureModal(true)
        console.log(JSON.stringify(err));
      });
  };
  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <TopHeaderView
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        headerText={strings.TransactionInterface}
      />
      <Spinner visible={isLoading}/>
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
          {err ? (
            <Text style={styles.errMsg}>{"Please enter detail"}</Text>
          ) : null}
          <ButtonText onPress={() => {
            cardNumber != '' ?
              transactionInterfaceCallApi()
              : setErr(true)
          }}
            text={strings.submit}
            loginBtn={{
              marginTop: responsiveScreenWidth(5),
              width: "50%",
              justifyContent: "center",
            }}
            loginText={{ marginStart: responsiveScreenWidth(10) }}
          />
        </View>

        <Modal transparent={true} visible={successModal} animationType="slide">
          <View style={styles.modalView}>
            <Image
              source={images.successIcon}
              resizeMode="contain"
              style={styles.ProfileIcon}
            />
            <Text
              style={styles.modaltextStyle}
            >
              Your detail udpate successfully.
            </Text>
            <TouchableOpacity onPress={() => {
              setsuccessModal(false)
              navigation.goBack()
            }}
              style={{
                width: "50%",
                padding: responsiveScreenWidth(2),
                marginTop: responsiveScreenWidth(8),
                backgroundColor: colors.primary,
                borderRadius: responsiveScreenWidth(2),
                justifyContent: "center",
                alignSelf: "center",
                alignContent: "center"
              }}
            >
              <Text style={{
                color: colors.white, alignSelf: "center",
                fontSize: responsiveScreenFontSize(1.8),
                fontWeight: "bold",
              }}>Thank You</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal transparent={true} visible={failureModal} animationType="slide">
          <View style={styles.modalView}>
            <Image
              source={images.cancelcon}
              resizeMode="contain"
              style={styles.ProfileIcon}
            />
            <Text
              style={styles.modaltextStyle}
            >
              Update detail fails.
            </Text>
            <TouchableOpacity onPress={() => {
              setfailureModal(false)
              navigation.goBack()
            }}
              style={{
                width: "50%",
                padding: responsiveScreenWidth(2),
                marginTop: responsiveScreenWidth(8),
                backgroundColor: colors.primary,
                borderRadius: responsiveScreenWidth(2),
                justifyContent: "center",
                alignSelf: "center",
                alignContent: "center"
              }}
            >
              <Text style={{
                color: colors.white, alignSelf: "center",
                fontSize: responsiveScreenFontSize(1.8),
                fontWeight: "bold",
              }}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </Modal>

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
    height: Platform.OS === "ios" ? responsiveScreenWidth(12) : responsiveScreenWidth(12)
  },
  modalView: {
    width: "80%",
    height: responsiveScreenWidth(60),
    marginTop: responsiveScreenWidth(60),
    borderRadius: responsiveScreenWidth(2),
    padding: responsiveScreenWidth(4),
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  ProfileIcon: {
    height: responsiveScreenWidth(20),
    width: responsiveScreenWidth(20),
    justifyContent: "center",
    alignSelf: "center"
  }, modaltextStyle: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    marginTop: responsiveScreenWidth(8),
    fontWeight: "bold",
    width: "100%",
    alignSelf: "center",
    textAlign: "center"
  },
  errMsg: {
    color: colors.red,
    fontSize: responsiveScreenFontSize(1.4),
    fontWeight: "600",
    marginTop: responsiveScreenWidth(-1),
    width: "75%",
    alignSelf: "center",
  },
});

export default TransactionInterfaceScreen;
