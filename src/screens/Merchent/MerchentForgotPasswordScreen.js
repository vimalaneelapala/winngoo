import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
// Custom ======================================================================================
import colors from "../../res/colors/colors";
import images from "../../res/imageConstant/images";
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "../../utils/Size";
import strings from "../../res/strings/strings";
import { BaseURL, EndPoint } from "../../api/ApiConstant";

const MerchentForgotPasswordScreen = ({ navigation }) => {
  const [getemail, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // ==========================================Api Call================
  const forgotPasswordApiCall = async () => {
    setIsError(false);
    setIsLoading(true);
    var data = {
      email: getemail,
    };
    await axios
      .post(BaseURL + EndPoint.RESETPASSWORD, data)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        setIsLoading(false);
        alert("Reset password link sent to your register email id.")
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(JSON.stringify(err));
      });
  };
  // ==========================================Render Call================
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Spinner visible={isLoading} />
        <Text style={styles.forgotPasswordText}>{strings.ForgotPassword}</Text>

        <Text style={styles.rememberText}>{strings.ResetPassword}</Text>

        <TextInput
          value={getemail}
          onChangeText={(email) => {
            setEmail(email);
          }}
          keyboardType="email-address"
          placeholder={strings.EnterEmail}
          style={styles.textInputstyle}
        />

        {isError ? (
          <Text style={styles.errMsg}>{strings.ResetPassword}</Text>
        ) : null}

        <TouchableOpacity
          onPress={() => {
            var regexEmail = "/^[w-.]+@([w-]+.)+[w-]{2,4}$/";
            if (getemail != "") {
              forgotPasswordApiCall();
            } else {
              if (getemail === "" || regexEmail.test(getemail)) {
                setIsError(true);
              }
            }
          }}
          style={styles.loginBtn}
        >
          <Text
            style={[
              styles.loginText,
              { color: colors.WHITE, fontSize: responsiveScreenFontSize(2) },
            ]}
          >
            {strings.ResetLink}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  forgotPasswordText: {
    fontSize: responsiveScreenFontSize(3),
    color: colors.BLACK,
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: responsiveScreenWidth(10),
  },
  textInputstyle: {
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.1),
    fontSize: responsiveScreenFontSize(2),
    width: "75%",
    alignSelf: "center",
    margin: responsiveScreenWidth(3),
  },
  rowView: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "75%",
    marginTop: responsiveScreenWidth(2),
  },
  forgotText: {
    color: colors.BLUETEXT,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: "bold",
  },
  rememberText: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: "600",
    marginTop: responsiveScreenWidth(10),
    width: "75%",
    alignSelf: "center",
  },
  errMsg: {
    color: colors.red,
    fontSize: responsiveScreenFontSize(1.4),
    fontWeight: "600",
    marginTop: responsiveScreenWidth(-1),
    width: "75%",
    alignSelf: "center",
  },
  loginBtn: {
    width: "75%",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: responsiveScreenWidth(1),
    height: responsiveScreenWidth(12),
    backgroundColor: colors.BLUETEXT,
    marginTop: responsiveScreenWidth(5),
  },
  loginText: {
    fontSize: responsiveScreenFontSize(4),
    color: colors.BLACK,
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default MerchentForgotPasswordScreen;
