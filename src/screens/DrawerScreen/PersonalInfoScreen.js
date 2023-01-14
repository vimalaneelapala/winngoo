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
import { DrawerActions } from "@react-navigation/native";
// Custom ======================================================================================
import colors from "../../res/colors/colors";
import images from "../../res/imageConstant/images";
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "../../utils/Size";
import strings from "../../res/strings/strings";
import TopHeaderView from "../../component/Header";

const PersonalInfoScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TopHeaderView
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      />
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              marginStart: responsiveScreenWidth(4),
              marginEnd: responsiveScreenWidth(4),
            }}
          >
            <View style={{ width: "40%" }}>
              <Text
                numberOfLines={2}
                style={[
                  styles.loginText,
                  { marginTop: responsiveScreenWidth(5) },
                ]}
              >
                Personal Information
              </Text>
            </View>
            <View style={{ width: "60%" }}>
              <TouchableOpacity
                style={[styles.loginBtn, { backgroundColor: colors.yellow }]}
              >
                <Text
                  style={[
                    styles.loginText,
                    {
                      color: colors.WHITE,
                      fontSize: responsiveScreenFontSize(2),
                    },
                  ]}
                >
                  {strings.EditProfile}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginBtn}>
                <Text
                  style={[
                    styles.loginText,
                    {
                      color: colors.WHITE,
                      fontSize: responsiveScreenFontSize(2),
                    },
                  ]}
                >
                  {strings.EditAddress}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.personalView}>
            <View style={styles.rowView}>
              <Text style={styles.blackSmallText}>Name:</Text>
              <Text style={styles.blackSmallText}>Dhruvika Chauhan</Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.blackSmallText}>Email:</Text>
              <Text style={styles.blackSmallText}>DhruvikaChauhan@gmail.com</Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.blackSmallText}>Email Verification Status:</Text>
              <Text style={styles.blackSmallText}>Verified</Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.blackSmallText}>Phone Number:</Text>
              <Text style={styles.blackSmallText}>9998208121</Text>
            </View>
          </View>
          <View style={styles.personalView}>
            <Text style={styles.blackSmallText}>Address:</Text>
            <Text numberOfLines={4} style={styles.blackSmallText}>
              Manek Chowk, Madvini Pole, Ahmedabad, Gujarat, 380001.
            </Text>
            <View style={styles.rowView}>
              <Text style={styles.blackSmallText}>Birth Month:</Text>
              <Text style={styles.blackSmallText}>October</Text>
            </View>
          </View>
          <View style={[styles.personalView,{marginBottom:responsiveScreenWidth(10)}]}>
            <Text style={styles.blackSmallText}>Note:</Text>
            <Text style={styles.blackSmallText}>Only address field is editable.</Text>
            <Text style={styles.blackSmallText}>In case of any emergancy, please contact our</Text>
            <Text style={styles.blueSmallText}>Help & Supports</Text>
          
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.TEXTINPUTBACKGROUND,
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
  },
  rowView: {
    flexDirection: "row",
    margin: responsiveScreenWidth(1),
  },
  blackSmallText: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: "400",
  },
  blueSmallText: {
    color: colors.blue,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: "400",
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
    width: "82%",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: responsiveScreenWidth(1),
    height: responsiveScreenWidth(12),
    backgroundColor: colors.BLUETEXT,
    marginTop: responsiveScreenWidth(5),
  },
  loginText: {
    fontSize: responsiveScreenFontSize(2.5),
    color: colors.BLACK,
    alignSelf: "center",
    fontWeight: "bold",
    width: "80%",
  },
  imageicon: {
    height: responsiveScreenWidth(20),
    width: responsiveScreenWidth(20),
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
  personalView: {
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
});

export default PersonalInfoScreen;
