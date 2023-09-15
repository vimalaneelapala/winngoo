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
  Modal
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
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
import Spinner from "react-native-loading-spinner-overlay";
import { BaseURL, EndPoint } from "../../../api/ApiConstant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ChangePasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [isShowPasswordOld, setIsShowPasswordOld] = useState(false);
  const [isShowPasswordNew, setIsShowPasswordNew] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
  const [successModal, setsuccessModal] = useState(false);
  const [failureModal, setfailureModal] = useState(false);
  // ==========================================Api Call================
  const changePasswordCall = async () => {
    let token = await AsyncStorage.getItem("token");
    setIsLoading(true);
    var data = {
      old_password: oldPassword,
      password: newPassword,
      password_confirmation: confirmPassword,
    };
    var header = {
      headers: {
        "x-access-token": token,
        "Content-Type":"multipart/form-data",
        "Accept":"multipart/form-data"
      },
    };
    await axios
      .put(BaseURL + EndPoint.CHANGEPASSWORD, data, header)
      .then(async (res) => {
        console.log(JSON.stringify(res));
        setIsLoading(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
       setsuccessModal(true)
      })
      .catch((err) => {
        setIsLoading(false);
        setOldPassword("");
        setNewPassword("");
        setfailureModal(true)
        setConfirmPassword("");
        console.log(JSON.stringify(err));
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopHeaderView
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        headerText={strings.changepassowrd}
      />
      <Spinner visible={isLoading} />
      <ScrollView>
        <View style={styles.container}>
          {/* Old Password */}
          <Text style={styles.titleText}>
            {strings.OldPassword}
            <Text style={styles.starText}>{" *"}</Text>
          </Text>
          <View style={styles.textinputRow}>
             <TextInput placeholderTextColor={colors.gray}
              value={oldPassword}
              onChangeText={(password) => {
                setOldPassword(password);
              }}
              secureTextEntry={!isShowPasswordOld}
              placeholder={strings.EnterPassword}
              style={styles.textInputstyle}
            />
            <TouchableOpacity
              onPress={() => {
                setIsShowPasswordOld(!isShowPasswordOld);
              }}
              style={styles.touchable}
            >
              <Image
                source={
                  isShowPasswordOld ? images.EyeIcon : images.InvisibleIcon
                }
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          {isError === "0" ? (
            <Text style={styles.errMsg}>{strings.EnterPasswordErr}</Text>
          ) : null}

          {/* New Password */}
          <Text style={styles.titleText}>
            {strings.NewPassword}
            <Text style={styles.starText}>{" *"}</Text>
          </Text>
          <View style={styles.textinputRow}>
             <TextInput placeholderTextColor={colors.gray}
              value={newPassword}
              onChangeText={(password) => {
                setNewPassword(password);
              }}
              secureTextEntry={!isShowPasswordNew}
              placeholder={strings.EnterPassword}
              style={styles.textInputstyle}
            />
            <TouchableOpacity
              onPress={() => {
                setIsShowPasswordNew(!isShowPasswordNew);
              }}
              style={styles.touchable}
            >
              <Image
                source={
                  isShowPasswordNew ? images.EyeIcon : images.InvisibleIcon
                }
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          {isError === "1" ? (
            <Text style={styles.errMsg}>{strings.EnterPasswordErr}</Text>
          ) : null}

          {/* Confirm Password */}
          <Text style={styles.titleText}>
            {strings.ConfirmPassword}
            <Text style={styles.starText}>{" *"}</Text>
          </Text>
          <View style={styles.textinputRow}>
             <TextInput placeholderTextColor={colors.gray}
              value={confirmPassword}
              onChangeText={(password) => {
                setConfirmPassword(password);
              }}
              secureTextEntry={!isShowPasswordConfirm}
              placeholder={strings.EnterPassword}
              style={styles.textInputstyle}
            />
            <TouchableOpacity
              onPress={() => {
                setIsShowPasswordConfirm(!isShowPasswordConfirm);
              }}
              style={styles.touchable}
            >
              <Image
                source={
                  isShowPasswordConfirm ? images.EyeIcon : images.InvisibleIcon
                }
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          {isError === "2" ? (
            <Text style={styles.errMsg}>{strings.EnterPasswordErr}</Text>
          ) : null}

          <View style={styles.rowView}>
            <TouchableOpacity
              onPress={() => {
                if (
                  oldPassword !== "" &&
                  newPassword !== "" &&
                  confirmPassword !== ""
                ) {
                  changePasswordCall();
                } else {
                  alert("please enter all detail");
                }
              }}
              style={styles.btnBlue}
            >
              <Text style={styles.btnText}>{strings.Update}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
              }}
              style={[
                styles.btnBlue,
                { backgroundColor: colors.TEXTINPUTBACKGROUND },
              ]}
            >
              <Text style={[styles.btnText, { color: colors.BLACK }]}>
                {strings.Reset}
              </Text>
            </TouchableOpacity>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textinputRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  touchable: {
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.1),
    justifyContent: "center",
    height: responsiveScreenWidth(12),
    width: responsiveScreenWidth(12),
    marginStart: responsiveScreenWidth(-3),
    marginTop: responsiveScreenWidth(3),
  },
  textInputstyle: {
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    fontSize: responsiveScreenFontSize(2),
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.1),
    width: "65%",
    alignSelf: "center",
    margin: responsiveScreenWidth(3),
    marginStart: 0,
    color: colors.BLACK,
    height:Platform.OS==="ios"?responsiveScreenWidth(12):responsiveScreenWidth(12)
  },
  errMsg: {
    color: colors.red,
    fontSize: responsiveScreenFontSize(1.4),
    fontWeight: "600",
    marginTop: responsiveScreenWidth(-1),
    width: "75%",
    alignSelf: "center",
  },
  eyeIcon: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    alignSelf: "center",
  },
  headerText: {
    fontSize: responsiveScreenFontSize(2.5),
    color: colors.BLACK,
    fontWeight: "600",
    marginStart: responsiveScreenWidth(14),
    marginTop: responsiveScreenWidth(5),
    marginBottom: responsiveScreenWidth(5),
  },
  titleText: {
    fontSize: responsiveScreenFontSize(1.6),
    color: colors.BLACK,
    fontWeight: "600",
    marginStart: responsiveScreenWidth(14),
  },
  starText: {
    fontSize: responsiveScreenFontSize(1.8),
    color: colors.RED,
    alignSelf: "center",
    fontWeight: "bold",
    paddingTop: responsiveScreenWidth(8),
  },
  rowView: {
    flexDirection: "row",
    width: "75%",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    marginTop: responsiveScreenWidth(10),
  },
  btnBlue: {
    backgroundColor: colors.blue,
    height: responsiveScreenWidth(10),
    width: responsiveScreenWidth(30),
    borderRadius: responsiveScreenWidth(2),
    justifyContent: "center",
    alignSelf: "center",
  },
  btnText: {
    alignSelf: "center",
    fontWeight: "bold",
    color: colors.WHITE,
    fontSize: responsiveScreenFontSize(2),
    marginTop: 0,
  },  modalView: {
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

export default ChangePasswordScreen;
