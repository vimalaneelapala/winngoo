import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import {launchImageLibrary} from 'react-native-image-picker'
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
import { BaseURL, EndPoint } from "../../../api/ApiConstant";

const PersonalInfoScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setsuccessModal] = useState(false);
  const [failureModal, setfailureModal] = useState(false);
  // ==========================================Api Call================
  useEffect(async () => {
    userDetailApiCall();
  }, [userDetailApiCall]);
  // ==========================================Api Call================
  const userDetailApiCall = async () => {
    let token = await AsyncStorage.getItem("token");
    setIsLoading(true);
    var config = {
      method: "get",
      url: BaseURL + EndPoint.USER,
      headers: {
        "x-access-token": token,
      },
    };
    await axios(config)
      .then(async (res) => {
        setIsLoading(false);
        console.log(JSON.stringify(res.data.result));
        setName(res.data.result.first_name + " " + res.data.result.last_name);
        setEmail(res.data.result.email);
        setPhoneNumber(res.data.result.phone_number);
        setDateOfBirth("11 Oct 1994");

        setAddress1(res.data.result.address.address_line_1);
        setCity(res.data.result.address.city);
        setCountry(res.data.result.address.country);
        setPostalCode(res.data.result.address.post_code);
        res.data.result.email_verified_at != ""
          ? setEmailVerify("Verified")
          : null;
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(JSON.stringify(err));
      });
  };
  const handleChoosePhoto = () => {
    launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    },
      (response) => {
        profileInfoCall(response.assets[0].uri)
        console.log(response.assets[0].uri);
        console.log(response.assets[0]);
      })
  }
  // ==========================================Api Call================
  const profileInfoCall = async (data) => {
    let token = await AsyncStorage.getItem("token");
    setIsLoading(true);
    var config = {
      method: "put",
      url: BaseURL + EndPoint.PROFILEIMAGE,
      headers: {
        "x-access-token": token,
      },
      data: {
        image: data
      }
    };
    await axios(config)
      .then(async (res) => {
        setIsLoading(false);
        setsuccessModal(true)
        global.image=data
        console.log(JSON.stringify(res));
      })
      .catch((err) => {
        setIsLoading(false);
        setfailureModal(true)
        console.log(JSON.stringify(err));
      });
  };
  // ==========================================Render Call================
  return (
    <SafeAreaView style={styles.container}>
      <TopHeaderView
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        headerText={strings.PersonalInformation}
      />
      <Spinner visible={isLoading} />
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
            </View>
            <View style={{ width: "60%" }}>
              <TouchableOpacity onPress={() => {
                handleChoosePhoto()
              }}
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
                  {strings.EditProfilePicture}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProfileEditScreen", {
                    email: email,
                    name: name,
                    address1: address1,
                    address2: address2,
                    address3: address3,
                    city: city,
                    country: country,
                    postalcode: postalcode,
                  });
                }}
                style={styles.loginBtn}
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
                  {strings.EditAddress}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.personalView}>
            <View style={styles.rowView}>
              <Text style={styles.blackSmallText}>{strings.Name}</Text>
              <Text style={styles.blackSmallText}>{name}</Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.blackSmallText}>{strings.Email}</Text>
              <Text style={styles.blackSmallText}>{email}</Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.blackSmallText}>{strings.EmailStatus}</Text>
              <Text style={styles.blackSmallText}>{emailVerify}</Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.blackSmallText}>{strings.PhoneNumber}</Text>
              <Text style={styles.blackSmallText}>{phone}</Text>
            </View>
          </View>
          <View style={styles.personalView}>
            <Text style={styles.blackSmallText}>{strings.Address}</Text>
            <Text numberOfLines={4} style={styles.blackSmallText}>
              {address1 + ", " + city + ", " + country + "-" + postalcode + "."}
            </Text>
            <View style={styles.rowView}>
              <Text style={styles.blackSmallText}>{strings.DateOfBirth}</Text>
              <Text style={styles.blackSmallText}>{dateOfBirth}</Text>
            </View>
          </View>
          <View
            style={[
              styles.personalView,
              { marginBottom: responsiveScreenWidth(10) },
            ]}
          >
            <Text style={styles.blackSmallText}>Note:</Text>
            <Text style={styles.blackSmallText}>
              Only address field is editable.
            </Text>
            <Text style={styles.blackSmallText}>
              In case of any emergancy, please contact our
            </Text>
            <Text style={styles.blueSmallText}>Help & Supports</Text>
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
    backgroundColor: colors.TEXTINPUTBACKGROUND,
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
});

export default PersonalInfoScreen;
