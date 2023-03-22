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
  Modal
} from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
// Custom ======================================================================================
import colors from '../../res/colors/colors';
import images from '../../res/imageConstant/images';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from '../../utils/Size';
import strings from "../../res/strings/strings";
import { BaseURL, EndPoint } from "../../api/ApiConstant";

const MemberForgotPasswordScreen = ({navigation}) => {
  const [getemail, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setsuccessModal] = useState(false);
  const [failureModal, setfailureModal] = useState(false);
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
      setsuccessModal(true)
      // alert("Reset password link sent to your register email id.")
    })
    .catch((err) => {
      setIsLoading(false);
      setfailureModal(true)
      console.log(JSON.stringify(err));
    });
};
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
               Reset password link sent to your register email id.
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
  forgotPasswordText: {
    fontSize: responsiveScreenFontSize(3),
    color: colors.BLACK,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: responsiveScreenWidth(10),
  },
  textInputstyle: {
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.1),
    fontSize: responsiveScreenFontSize(2),
    width: '75%',
    alignSelf: 'center',
    margin: responsiveScreenWidth(3),
    height:Platform.OS==="ios"?responsiveScreenWidth(12):responsiveScreenWidth(12)
  },
  rowView: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '75%',
    marginTop: responsiveScreenWidth(2),
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
    marginTop: responsiveScreenWidth(10),
    width: '75%',
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
  },  modaltextStyle: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    marginTop: responsiveScreenWidth(8),
    fontWeight: "bold",
    width: "100%",
    alignSelf: "center",
    textAlign: "center"
  },
});

export default MemberForgotPasswordScreen;
