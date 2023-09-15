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
  Platform,
  Linking
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const MemberLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // ==========================================Api Call================
  const loginApiCall = async () => {
    setIsLoading(true);
    
    console.log("1");
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    console.log("12");
    
    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    console.log("123");
    console.log("123");
    
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    console.log("1234");
    
    fetch(BaseURL + EndPoint.LOGIN, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(JSON.stringify(result));
        setIsLoading(false);
        storeData(result.result.token);
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err)
        console.log(JSON.stringify(err));
      });
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("isLogin", "true");
      await AsyncStorage.setItem("loginType", "member");
      global.loginTypeTemp = "member";
      await AsyncStorage.setItem("token", value);
      navigation.navigate("DrawerNavigator");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.container}>
        <Image
          source={images.logoWithName}
          resizeMode="contain"
          style={styles.imageicon}
        />
        {/* <Text style={styles.loginText}>{strings.LOGIN}</Text> */}

         <TextInput placeholderTextColor={colors.gray}
          value={email}
          onChangeText={(email) => {
            setEmail(email);
          }}
          keyboardType="email-address"
          placeholder={strings.EnterEmail}
          style={styles.textInputstyle}
        />
        {isEmailError ? (
          <Text style={styles.errMsg}>{strings.EnterEmailErr}</Text>
        ) : null}
        <View style={[styles.textInputstyle1, { flexDirection: "row" }]}>
           <TextInput placeholderTextColor={colors.gray}
            value={password}
            onChangeText={(password) => {
              setPassword(password);
            }}
            secureTextEntry={isShowPassword}
            placeholder={strings.EnterPassword}
            style={{
              fontSize: responsiveScreenFontSize(2),
              width: "85%",
              alignSelf: "center",
              color: colors.BLACK,
            }}
          />
          <TouchableOpacity    onPress={() => {
                setIsShowPassword(!isShowPassword);
              }}>

          <Image
            source={isShowPassword ? images.InvisibleIcon : images.EyeIcon}
            style={{
              height: responsiveScreenWidth(5),
              width: responsiveScreenWidth(5),
              marginTop:responsiveScreenWidth(3)
            }}
            />
            </TouchableOpacity>
        </View>
        {isPasswordError ? (
          <Text style={styles.errMsg}>{strings.EnterPasswordErr}</Text>
        ) : null}

        <View style={styles.rowView}>
          {/* <View>
            <TouchableOpacity
              onPress={() => {
                setIsRemember(!isRemember);
              }}
              style={styles.boxView}>
              <Image
                source={isRemember ? images.Check : null}
                style={styles.checkImage}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginStart: responsiveScreenWidth(-8)}}>
            <Text style={styles.rememberText}>{strings.RememberMe}</Text>
          </View> */}
          <View>
            <Text
              onPress={() => {
                navigation.navigate("MemberForgotPasswordScreen");
              }}
              style={styles.forgotText}
            >
              {strings.ForgotPassword}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (email != "" || password != "") {
              loginApiCall();
            } else {
              var regexEmail = "/^[w-.]+@([w-]+.)+[w-]{2,4}$/";
              var regexPassword =
                "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/";
              if (email === "" || !regexEmail.test(email)) {
                setIsEmailError(true);
              }
              if (password === "" || !regexPassword.test(password)) {
                setIsPasswordError(true);
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
            {strings.LOGINMember}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MemberSignUpScreen");
          }}
          style={styles.signupView}
        >
          <Text style={styles.rememberText}>
            {strings.DontAccount}
            <Text style={styles.forgotText}>{strings.SignUpMember}</Text>
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => {
            navigation.navigate("MerchentLoginScreen");
          }}
          style={styles.partnerUsstyle}
        >
          {strings.PartnerUs}
        </Text>
        <View style={styles.bottomView}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://www.instagram.com/winngoouk/");
            }}
          >
            <Image
              source={images.InstagramIcon}
              resizeMode="contain"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://www.facebook.com/people/Winngoo-UK/100064192688639/"
              );
            }}
          >
            <Image
              source={images.FacebookIcon}
              resizeMode="contain"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://www.youtube.com/channel/UCGz-Y29uUjU9T46ReGDrgNA"
              );
            }}
          >
            <Image
              source={images.YoutubeIcon}
              resizeMode="contain"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
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
  textInputstyle: {
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.1),
    fontSize: responsiveScreenFontSize(2),
    width: "75%",
    alignSelf: "center",
    margin: responsiveScreenWidth(3),
    color: colors.BLACK,
    height:
      Platform.OS === "ios"
        ? responsiveScreenWidth(12)
        : responsiveScreenWidth(12),
  },
  textInputstyle1: {
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.1),
    width: "75%",
    alignSelf: "center",
    margin: responsiveScreenWidth(3),
    color: colors.BLACK,
    height:
      Platform.OS === "ios"
        ? responsiveScreenWidth(12)
        : responsiveScreenWidth(12),
  },
  rowView: {
    alignSelf: "flex-end",
    marginTop: responsiveScreenWidth(2),
    marginEnd: responsiveScreenWidth(12),
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
    marginTop: responsiveScreenWidth(0),
    width: "100%",
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
  imageicon: {
    height: responsiveScreenWidth(40),
    width: responsiveScreenWidth(60),
    justifyContent: "center",
    alignSelf: "center",
  },
  socialIcon: {
    height: responsiveScreenWidth(10),
    width: responsiveScreenWidth(10),
    justifyContent: "center",
    alignSelf: "center",
    margin: responsiveScreenWidth(4),
  },
  boxView: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    justifyContent: "center",
    alignSelf: "center",
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.2),
  },
  checkImage: {
    height: responsiveScreenWidth(3),
    width: responsiveScreenWidth(3),
    justifyContent: "center",
    alignSelf: "center",
  },
  signupView: {
    alignSelf: "flex-end",
    marginEnd: responsiveScreenWidth(13),
    marginTop: responsiveScreenWidth(4),
  },
  partnerUsstyle: {
    color: colors.BLUETEXT,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: "bold",
    alignSelf: "center",
    position: "absolute",
    bottom: responsiveScreenWidth(18),
  },
  bottomView: {
    flexDirection: "row",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
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

export default MemberLoginScreen;
