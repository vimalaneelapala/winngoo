import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
// Library ======================================================================================
import { Dropdown } from "react-native-element-dropdown";
// Custom ======================================================================================
import colors from "../../res/colors/colors";
import images from "../../res/imageConstant/images";
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "../../utils/Size";
import strings from "../../res/strings/strings";
import axios from "axios";
import { BaseURL, EndPoint } from "../../api/ApiConstant";

const genderList = [
  { label: "Female", value: "Female" },
  { label: "Male", value: "Male" },
  { label: "Other", value: "other" },
];
const MerchentSignUpAddressScreen = ({ navigation ,route}) => {
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressLine3, setAddressLine3] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("United Kingdom");

  const [addressLine1Err, setAddressLine1Err] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [postCodeErr, setPostCodeErr] = useState(false);
  const [countryErr, setCountryErr] = useState(false);

  // ==========================================Api Call================

  // ==========================================Api Call================
  const validationForm = () => {
    if (addressLine1 === "") {
      setAddressLine1Err(true);
    } else if (city === "") {
      setCityErr(true);
    } else if (country === "") {
      setCountryErr(true);
    } else if (postCode === "") {
      setPostCodeErr(true);
    } else {
      setUserDetail();
    }
  };
  const setUserDetail = async () => {
    try {
      var data = {
        addressLine1:addressLine1,
        addressLine2:addressLine2,
        addressLine3:addressLine3,
        city:city,
        country:country,
        postCode:postCode
      };
      navigation.navigate("MerchentSignUpBusinessScreen", { addressdetail: data,detail:route.params });
    } catch (e) {
      console.log(e);
    }
  };
  // ==========================================Render Call================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.container}>
          <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={()=>{
                navigation.goBack()
              }}>

<Image source={images.leftArrow} style={{height:responsiveScreenWidth(5),width:responsiveScreenWidth(5),margin:responsiveScreenWidth(5)}}/>
              </TouchableOpacity>
            <Text style={[styles.loginText,{marginTop:responsiveScreenWidth(1)}]}>{strings.AddressDetail}</Text>
            </View>

            <View style={styles.mainview}>
               <TextInput placeholderTextColor={colors.gray}
                value={addressLine1}
                onChangeText={(addressLine1) => {
                  setAddressLine1(addressLine1);
                  setAddressLine1Err(false)
                }}
                placeholder={strings.EnterAddress1}
                style={styles.textInputstyle}
              />
              {addressLine1Err ? (
                <Text style={styles.starText}>{strings.EnterAddress1Err}</Text>
              ) : null}
               <TextInput placeholderTextColor={colors.gray}
                value={addressLine2}
                onChangeText={(addressLine2) => {
                  setAddressLine2(addressLine2);
                }}
                placeholder={strings.EnterAddress2}
                style={styles.textInputstyle}
              />
               <TextInput placeholderTextColor={colors.gray}
                value={addressLine3}
                onChangeText={(addressLine3) => {
                  setAddressLine3(addressLine3);
                }}
                placeholder={strings.EnterAddress3}
                style={styles.textInputstyle}
              />
               <TextInput placeholderTextColor={colors.gray}
                value={city}
                onChangeText={(city) => {
                  setCity(city);
                  setCityErr(false)
                }}
                placeholder={strings.EnterCity}
                style={styles.textInputstyle}
              />
              {cityErr ? (
                <Text style={styles.starText}>{strings.EnterCityErr}</Text>
              ) : null}
               <TextInput placeholderTextColor={colors.gray}
                value={country}
                // onChangeText={(country) => {
                //   setCountry(country);
                //   setCountryErr(false)
                // }}
                editable={false}
                placeholder={strings.EnterCountry}
                style={styles.textInputstyle}
              />
              {countryErr ? (
                <Text style={styles.starText}>{strings.EnterCountryErr}</Text>
              ) : null}
               <TextInput placeholderTextColor={colors.gray}
                value={postCode}
                onChangeText={(postCode) => {
                  setPostCode(postCode);
                  setPostCodeErr(false)
                }}
                placeholder={strings.EnterPostCode}
                style={styles.textInputstyle}
              />
              {postCodeErr ? (
                <Text style={styles.starText}>{strings.EnterPostCodeErr}</Text>
              ) : null}
            </View>

            <TouchableOpacity
              onPress={() => {
                validationForm();
                // navigation.navigate("MerchentSignUpBusinessScreen")
              }}
              style={styles.loginBtn}
            >
              <Text
                style={[
                  styles.loginText,
                  {
                    color: colors.WHITE,
                    fontSize: responsiveScreenFontSize(2),
                    marginTop: 0,
                  },
                ]}
              >
                {strings.Continue}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  loginText: {
    fontSize: responsiveScreenFontSize(3),
    color: colors.BLACK,
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: responsiveScreenWidth(5),
  },
  starText: {
    fontSize: responsiveScreenFontSize(1.8),
    color: colors.RED,
    fontWeight: "400",
  },
  textInputstyle: {
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    borderColor: colors.BLACK,
    color:colors.BLACK,
    borderWidth: responsiveScreenWidth(0.2),
    fontSize: responsiveScreenFontSize(2),
    width: "100%",
    alignSelf: "center",
    margin: responsiveScreenWidth(3),
    marginTop: responsiveScreenWidth(4),
    height:Platform.OS==="ios"?responsiveScreenWidth(12):responsiveScreenWidth(12)
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
  mainview: {
    width: "75%",
    alignSelf: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: responsiveScreenFontSize(1.6),
    color: colors.BLACK,
    fontWeight: "600",
  },

  dropdown: {
    height: responsiveScreenWidth(12),
    borderRadius: responsiveScreenWidth(1),
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.1),
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    marginTop: responsiveScreenWidth(4),
    width: "100%",
    alignSelf: "center",
    paddingStart: responsiveScreenWidth(1),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  imageicon: {
    height: responsiveScreenWidth(20),
    width: responsiveScreenWidth(50),
    justifyContent: "center",
    alignSelf: "center",
    margin: responsiveScreenWidth(5),
  },
});

export default MerchentSignUpAddressScreen;
