import React, {useState} from 'react';
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
} from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Custom ======================================================================================
import colors from '../../res/colors/colors';
import images from '../../res/imageConstant/images';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from '../../utils/Size';
import strings from '../../res/strings/strings';
import { BaseURL, EndPoint } from "../../api/ApiConstant";

const MemberLoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('vjrajanrd@gmail.com');
  const [password, setPassword] = useState('India@123');
  const [isRemember, setIsRemember] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // ==========================================Api Call================
  const loginApiCall = async () => {
    setIsLoading(true);
    var data = {
      email: email,
      password: password,
    };

    await axios
      .post(BaseURL + EndPoint.LOGIN, data)
      .then(async (res) => {
        console.log(JSON.stringify(res.data));
        setIsLoading(false);
        storeData(res.data.result.token);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(JSON.stringify(err));
      });
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("isLogin", "true");
      await AsyncStorage.setItem("loginType", "member");
      global.loginTypeTemp="member"
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
          source={images.LogoIcon}
          resizeMode="contain"
          style={styles.imageicon}
        />
        <Text style={styles.loginText}>{strings.LOGIN}</Text>

         <TextInput
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
        <TextInput
          value={password}
          onChangeText={(password) => {
            setPassword(password);
          }}
          secureTextEntry={isShowPassword}
          placeholder={strings.EnterPassword}
          style={styles.textInputstyle}
        />
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
                navigation.navigate('MemberForgotPasswordScreen');
              }}
              style={styles.forgotText}>
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
          style={styles.loginBtn}>
          <Text
            style={[
              styles.loginText,
              {color: colors.WHITE, fontSize: responsiveScreenFontSize(2)},
            ]}>
            {strings.LOGINMember}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MemberSignUpScreen');
          }}
          style={styles.signupView}>
          <Text style={styles.rememberText}>
            {strings.DontAccount}
            <Text style={styles.forgotText}>{strings.SignUpMember}</Text>
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => {
            navigation.navigate('MerchentLoginScreen');
          }}
          style={styles.partnerUsstyle}>
          {strings.PartnerUs}
        </Text>
        <View style={styles.bottomView}>
          <Image
            source={images.InstagramIcon}
            resizeMode="contain"
            style={styles.socialIcon}
          />
          <Image
            source={images.FacebookIcon}
            resizeMode="contain"
            style={styles.socialIcon}
          />
          <Image
            source={images.YoutubeIcon}
            resizeMode="contain"
            style={styles.socialIcon}
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
  textInputstyle: {
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.1),
    fontSize: responsiveScreenFontSize(2),
    width: '75%',
    alignSelf: 'center',
    margin: responsiveScreenWidth(3),
    color: colors.BLACK,
    height:Platform.OS==="ios"?responsiveScreenWidth(12):responsiveScreenWidth(12)
  },
  rowView: {
    alignSelf: 'flex-end',
    marginTop: responsiveScreenWidth(2),
    marginEnd: responsiveScreenWidth(12),
  },
  forgotText: {
    color: colors.BLUETEXT,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: 'bold',
  },
  rememberText: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: '600',
    marginTop: responsiveScreenWidth(0),
    width: '100%',
    alignSelf: 'center',
  },
  loginBtn: {
    width: '75%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: responsiveScreenWidth(1),
    height: responsiveScreenWidth(12),
    backgroundColor: colors.BLUETEXT,
    marginTop: responsiveScreenWidth(5),
  },
  loginText: {
    fontSize: responsiveScreenFontSize(4),
    color: colors.BLACK,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  imageicon: {
    height: responsiveScreenWidth(20),
    width: responsiveScreenWidth(20),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  socialIcon: {
    height: responsiveScreenWidth(10),
    width: responsiveScreenWidth(10),
    justifyContent: 'center',
    alignSelf: 'center',
    margin: responsiveScreenWidth(4),
  },
  boxView: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.2),
  },
  checkImage: {
    height: responsiveScreenWidth(3),
    width: responsiveScreenWidth(3),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  signupView: {
    alignSelf: 'flex-end',
    marginEnd: responsiveScreenWidth(13),
    marginTop: responsiveScreenWidth(4),
  },
  partnerUsstyle: {
    color: colors.BLUETEXT,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: 'bold',
    alignSelf: 'center',
    position: 'absolute',
    bottom: responsiveScreenWidth(18),
  },
  bottomView: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
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
