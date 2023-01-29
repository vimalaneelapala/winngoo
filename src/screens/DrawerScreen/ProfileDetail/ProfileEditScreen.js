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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay/lib";
// Custom ======================================================================================
import colors from "../../../res/colors/colors";
import images from "../../../res/imageConstant/images";
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "../../../utils/Size";
import TopHeaderView from "../../../component/Header";
import strings from "../../../res/strings/strings";
import { BaseURL, EndPoint } from "../../../api/ApiConstant";


const ProfileEditScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState(route.params.email);
  const [firstName, setFirstName] = useState(route.params.name);
  const [lastName, setLastName] = useState(route.params.name);
  const [address1, setAddress1] = useState(route.params.address1);
  const [address2, setAddress2] = useState(route.params.address2);
  const [address3, setAddress3] = useState(route.params.address1);
  const [city, setCity] = useState(route.params.city);
  const [country, setCountry] = useState(route.params.country);
  const [postalCode, setPostalCode] = useState(route.params.postalcode);
  const [isLoading, setIsLoading] = useState(false);
  // ==========================================Api Call================
  const updateAddressApi = async () => {
    let token = await AsyncStorage.getItem("token");
    setIsLoading(true);
    var data = new FormData();
    data.append("address_line_1", address1);
    data.append("address_line_2", address2);
    data.append("address_line_3", address3);
    data.append("city", city);
    data.append("country", country);
    data.append("postal_code", postalCode);

    var config = {
      method: "put",
      url: BaseURL + EndPoint.ADDRESS,
      headers: {
        "x-access-token": token,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };
    await axios(config)
      .then(async (res) => {
        setIsLoading(false);
        console.log(JSON.stringify(res));
        alert("Your detail udpate successfully.");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(JSON.stringify(err));
      });
  };
  // ==========================================Render Call================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <TopHeaderView
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        headerText={strings.EditProfile}
      />
        <View style={styles.container}>
          <Spinner visible={isLoading} />
         
          <TextInput
            value={firstName}
            editable={false}
            style={styles.textInputstyle}
          />
          <TextInput
            value={lastName}
            editable={false}
            style={styles.textInputstyle}
          />
          <TextInput
            value={email}
            editable={false}
            style={styles.textInputstyle}
          />
          <TextInput
            value={address1}
            onChangeText={(address1) => {
              setAddress1(address1);
            }}
            placeholder={strings.AddressLine1}
            style={styles.textInputstyle}
          />
          <TextInput
            value={address2}
            onChangeText={(address2) => {
              setAddress2(address2);
            }}
            placeholder={strings.AddressLine2}
            style={styles.textInputstyle}
          />
          <TextInput
            value={address1}
            onChangeText={(address3) => {
              setAddress3(address3);
            }}
            placeholder={strings.AddressLine3}
            style={styles.textInputstyle}
          />
          <TextInput
            value={city}
            onChangeText={(city) => {
              setCity(city);
            }}
            placeholder={strings.City}
            style={styles.textInputstyle}
          />
          <TextInput
            value={country}
            onChangeText={(country) => {
              setCountry(country);
            }}
            placeholder={strings.Country}
            style={styles.textInputstyle}
          />
          <TextInput
            value={postalCode}
            onChangeText={(postalCode) => {
              setPostalCode(postalCode);
            }}
            placeholder={strings.PostCode}
            style={styles.textInputstyle}
          />

          <View style={styles.rowView}>
            <TouchableOpacity
              onPress={() => {
                updateAddressApi();
              }}
              style={styles.btnBlue}
            >
              <Text style={styles.btnText}>{strings.Update}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setAddress1("");
                setAddress2("");
                setAddress3("");
                setCity("");
                setCountry("");
                setPostalCode("");
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
        </View>
      </ScrollView>
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
    width: "74%",
    alignSelf: "center",
    margin: responsiveScreenWidth(3),
    color: colors.BLACK,
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
    marginBottom: responsiveScreenWidth(5),
  },
  loginText: {
    fontSize: responsiveScreenFontSize(2.5),
    color: colors.BLACK,
    alignSelf: "center",
    fontWeight: "bold",
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
  rowView: {
    flexDirection: "row",
    width: "75%",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    marginTop: responsiveScreenWidth(5),
    marginBottom: responsiveScreenWidth(10),
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
  },
});

export default ProfileEditScreen;
