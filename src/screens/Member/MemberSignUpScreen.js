import React, { useState } from "react";
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
  Modal,
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
import Spinner from "react-native-loading-spinner-overlay/lib";
import axios from "axios";
import { BaseURL, EndPoint } from "../../api/ApiConstant";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const genderList = [
  { label: "Female", value: "female" },
  { label: "Male", value: "male" },
  { label: "Other", value: "other" },
];
const monthList = [
  { label: "January", value: "january" },
  { label: "February", value: "february" },
  { label: "March", value: "march" },
  { label: "April", value: "april" },
  { label: "May", value: "may" },
  { label: "June", value: "june" },
  { label: "July", value: "july" },
  { label: "August", value: "august" },
  { label: "September", value: "september" },
  { label: "October", value: "october" },
  { label: "November", value: "november" },
  { label: "December", value: "december" },
];
const MemberSignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressLine3, setAddressLine3] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("UK");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [discountCode, setdiscountCode] = useState("");
  const [refferalCode, setRefferalCode] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [genderc, setGenderC] = useState("");
  const [birthMonthc, setBirthMonthC] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isAgrree, setisAgrree] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [successModal, setsuccessModal] = useState(false);
  const [failureModal, setfailureModal] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowPassword1, setIsShowPassword1] = useState(true);
  // ==========================================Api Call================
  const checkValidation = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      gender === "" ||
      email === "" ||
      password === "" ||
      addressLine1 === "" ||
      city === "" ||
      country === "" ||
      postCode === "" ||
      phoneNumber === "" ||
      birthMonth === "" ||
      phoneNumber.length < 10
    ) {
      alert("Please fill form properly!!!");
    } else {
      const data={
      "firstName" :firstName,
      "lastName" :lastName,
      "gender":gender,
      "email":email,
      "password":password,
      "addressLine1" :addressLine1,
      "addressLine2" :addressLine2,
      "addressLine3" :addressLine3,
      "city":city,
      "country":country,
      "postCode" :postCode,
      "phoneNumber": phoneNumber,
      "birthMonth":birthMonth
      }
      isAgrree
        ? navigation.navigate("MemberCardScreen",{data:data})
        : alert("Please accept term and condition to procced");
    }
  };

  const callSignUpApi = async () => {
    setisLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var formdata = new FormData();
    formdata.append("first_name", firstName);
    formdata.append("last_name", lastName);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("address_line_1", addressLine1);
    formdata.append("address_line_2", addressLine2);
    formdata.append("address_line_3", addressLine3);
    formdata.append("city", city);
    formdata.append("country", country);
    formdata.append("post_code", postCode);
    formdata.append("phone_number", phoneNumber);
    formdata.append("birth_month", birthMonthc);
    formdata.append("gender", genderc);
    formdata.append("referral_code", refferalCode);
    formdata.append("discount_code", discountCode);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://WinngooappApp.co.uk/api/user/register-member",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(JSON.stringify(result));
        if (result.success === true) {
          console.log(result.message);
          setisLoading(false);
          setsuccessModal(true);
        } else {
          alert(result.message);
        }
      })
      .catch((error) => {
        setisLoading(false);
        setfailureModal(true);
        console.log(JSON.stringify(error));
        console.log("error", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView nestedScrollEnabled={true} style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.container}>
            <Spinner visible={isLoading} />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Image
                  source={images.leftArrow}
                  style={{
                    height: responsiveScreenWidth(5),
                    width: responsiveScreenWidth(5),
                    margin: responsiveScreenWidth(5),
                  }}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.loginText,
                  { marginTop: responsiveScreenWidth(1) },
                ]}
              >
                {strings.MemberPersonalDetail}
              </Text>
            </View>
            <View style={styles.mainview}>
              <Text style={styles.titleText}>
                {strings.FirstName}
                <Text style={styles.starText}>{" *"}</Text>
              </Text>
              <TextInput
                placeholderTextColor={colors.gray}
                value={firstName}
                onChangeText={(firstName) => {
                  setFirstName(firstName);
                }}
                placeholder={strings.EnterFname}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>
                {strings.LastName}
                <Text style={styles.starText}>{" *"}</Text>
              </Text>
              <TextInput
                placeholderTextColor={colors.gray}
                value={lastName}
                onChangeText={(lastName) => {
                  setLastName(lastName);
                }}
                placeholder={strings.EnterLname}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>
                {strings.Gender}
                <Text style={styles.starText}>{" *"}</Text>
              </Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={genderList}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select Gender"}
                value={gender}
                onChange={(item) => {
                  setGender(item.value);
                  setGenderC(item.value);
                }}
              />
              <Text style={styles.titleText}>
                {strings.Email}
                <Text style={styles.starText}>{" *"}</Text>
              </Text>
              <TextInput
                placeholderTextColor={colors.gray}
                value={email}
                onChangeText={(email) => {
                  setEmail(email);
                }}
                placeholder={strings.EnterEmail}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>
                {strings.ConfirmEmail}
                <Text style={styles.starText}>{" *"}</Text>
              </Text>
              <TextInput
                placeholderTextColor={colors.gray}
                value={confirmEmail}
                onChangeText={(confirmEmail) => {
                  setConfirmEmail(confirmEmail);
                }}
                placeholder={strings.EnterConfirmEmail}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>
                {strings.Password}
                <Text style={styles.starText}>{" *"}</Text>
              </Text>
              <View style={[styles.textInputstyle1, { flexDirection: "row" }]}>
                <TextInput
                  placeholderTextColor={colors.gray}
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
                <TouchableOpacity
                  onPress={() => {
                    setIsShowPassword(!isShowPassword);
                  }}
                >
                  <Image
                    source={
                      isShowPassword ? images.InvisibleIcon : images.EyeIcon
                    }
                    style={{
                      height: responsiveScreenWidth(5),
                      width: responsiveScreenWidth(5),
                      marginTop: responsiveScreenWidth(3),
                    }}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.titleText}>
                {strings.ConfirmPassword}
                <Text style={styles.starText}>{" *"}</Text>
              </Text>
              <View style={[styles.textInputstyle1, { flexDirection: "row" }]}>
                <TextInput
                  placeholderTextColor={colors.gray}
                  value={confirmPassword}
                  onChangeText={(confirmPassword) => {
                    setConfirmPassword(confirmPassword);
                  }}
                  secureTextEntry={isShowPassword1}
                  placeholder={strings.EnterPassword}
                  style={{
                    fontSize: responsiveScreenFontSize(2),
                    width: "85%",
                    alignSelf: "center",
                    color: colors.BLACK,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setIsShowPassword1(!isShowPassword1);
                  }}
                >
                  <Image
                    source={
                      isShowPassword1 ? images.InvisibleIcon : images.EyeIcon
                    }
                    style={{
                      height: responsiveScreenWidth(5),
                      width: responsiveScreenWidth(5),
                      marginTop: responsiveScreenWidth(3),
                    }}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.titleText}>
                {strings.AddressLine1}
                <Text style={styles.starText}>{" *"}</Text>
              </Text>
              {/* <GooglePlacesAutocomplete
                styles={{
                  backgroundColor: colors.TEXTINPUTBACKGROUND,
                  borderColor: colors.BLACK,
                  borderWidth: responsiveScreenWidth(0.1),
                  width: "100%",
                  alignSelf: "center",
                  margin: responsiveScreenWidth(3),
                  color: colors.BLACK,
                  height:
                    Platform.OS === "ios"
                      ? responsiveScreenWidth(12)
                      : responsiveScreenWidth(12),
                }}
                placeholder="Enter Address Detail 1 here"
                onPress={(data, details = null) => console.log(data, details)}
                query={{ key: "AIzaSyBvr3MA7Y0y7F9cg_PflaY3jCa0yiPkF8I" }}
                fetchDetails={true}
                onFail={(error) => console.log(error)}
                onNotFound={() => console.log("no results")}
                listEmptyComponent={() => (
                  <View style={{ flex: 1 }}>
                    <Text>No results were found</Text>
                  </View>
                )}
              /> */}
              <TextInput placeholderTextColor={colors.gray}
                value={addressLine1}
                onChangeText={(addressLine1) => {
                  setAddressLine1(addressLine1);
                }}
                placeholder={strings.EnterAddress1}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>{strings.AddressLine2}</Text>
              <TextInput
                placeholderTextColor={colors.gray}
                value={addressLine2}
                onChangeText={(addressLine2) => {
                  setAddressLine2(addressLine2);
                }}
                placeholder={strings.EnterAddress2}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>{strings.AddressLine3}</Text>
              <TextInput
                placeholderTextColor={colors.gray}
                value={addressLine3}
                onChangeText={(addressLine3) => {
                  setAddressLine3(addressLine3);
                }}
                placeholder={strings.EnterAddress3}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>
                {strings.City}
                <Text style={styles.starText}>{" *"}</Text>
              </Text>
              <TextInput
                placeholderTextColor={colors.gray}
                value={city}
                onChangeText={(city) => {
                  setCity(city);
                }}
                placeholder={strings.EnterCity}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>
                {strings.PostCode}
                <Text style={styles.starText}>{" *"}</Text>
              </Text>
              <TextInput
                placeholderTextColor={colors.gray}
                value={postCode}
                onChangeText={(postCode) => {
                  setPostCode(postCode);
                }}
                placeholder={strings.EnterPostCode}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>
                {strings.Country}
                <Text style={styles.starText}>{" *"}</Text>
              </Text>
              <TextInput
                placeholderTextColor={colors.gray}
                editable={false}
                value={country}
                // onChangeText={(country) => {
                //   setCountry(country);
                // }}
                placeholder={strings.EnterCity}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>
                {strings.PhoneNumber}
                <Text style={styles.starText}>{" *"}</Text>
              </Text>
              <TextInput
                placeholderTextColor={colors.gray}
                value={phoneNumber}
                onChangeText={(phoneNumber) => {
                  setPhoneNumber(phoneNumber);
                }}
                placeholder={strings.EnterPhoneNumber}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>{strings.Reffereal}</Text>
              <TextInput
                placeholderTextColor={colors.gray}
                value={refferalCode}
                onChangeText={(refferalCode) => {
                  setRefferalCode(refferalCode);
                }}
                placeholder={strings.EnterReferralCode}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>{strings.DiscountCode}</Text>
              <TextInput
                placeholderTextColor={colors.gray}
                value={discountCode}
                onChangeText={(discountCode) => {
                  setdiscountCode(discountCode);
                }}
                placeholder={strings.EnterdiscountCodeCode}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>
                {strings.BirthMonth}
                <Text style={styles.starText}>{" *"}</Text>
              </Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={monthList}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select Birthmonth"}
                value={birthMonth}
                onChange={(item) => {
                  setBirthMonth(item.value);
                  setBirthMonthC(item.value);
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginTop: responsiveScreenWidth(3),
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setisAgrree(!isAgrree);
                  }}
                  style={{
                    height: 20,
                    width: 20,
                    borderColor: "black",
                    borderWidth: 1,
                    marginEnd: responsiveScreenWidth(2),
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={isAgrree ? images.Check : null}
                    style={{ height: 15, width: 15, alignSelf: "center" }}
                  ></Image>
                </TouchableOpacity>
                <Text style={styles.modaltextStyle1}>
                  {"I accept "}
                  <Text
                    style={[
                      styles.modaltextStyle1,
                      { colors: colors.BLUETEXT },
                    ]}
                  >
                    Privacy Policy
                  </Text>
                  {" and "}
                  <Text
                    style={[
                      styles.modaltextStyle1,
                      { colors: colors.BLUETEXT },
                    ]}
                  >
                    Terms and Conditions
                  </Text>
                  <Text> of WinngooappApp.</Text>
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                checkValidation();
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
                {strings.SignUpMember}
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            transparent={true}
            visible={successModal}
            animationType="slide"
          >
            <View style={styles.modalView}>
              <Image
                source={images.successIcon}
                resizeMode="contain"
                style={styles.ProfileIcon}
              />
              <Text style={styles.modaltextStyle}>
                You have created account successfully.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setsuccessModal(false);
                  navigation.goBack();
                }}
                style={{
                  width: "50%",
                  padding: responsiveScreenWidth(2),
                  marginTop: responsiveScreenWidth(8),
                  backgroundColor: colors.primary,
                  borderRadius: responsiveScreenWidth(2),
                  justifyContent: "center",
                  alignSelf: "center",
                  alignContent: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    alignSelf: "center",
                    fontSize: responsiveScreenFontSize(1.8),
                    fontWeight: "bold",
                  }}
                >
                  Thank You
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Modal
            transparent={true}
            visible={failureModal}
            animationType="slide"
          >
            <View style={styles.modalView}>
              <Image
                source={images.cancelcon}
                resizeMode="contain"
                style={styles.ProfileIcon}
              />
              <Text style={styles.modaltextStyle}>Update detail fails.</Text>
              <TouchableOpacity
                onPress={() => {
                  setfailureModal(false);
                  navigation.goBack();
                }}
                style={{
                  width: "50%",
                  padding: responsiveScreenWidth(2),
                  marginTop: responsiveScreenWidth(8),
                  backgroundColor: colors.primary,
                  borderRadius: responsiveScreenWidth(2),
                  justifyContent: "center",
                  alignSelf: "center",
                  alignContent: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    alignSelf: "center",
                    fontSize: responsiveScreenFontSize(1.8),
                    fontWeight: "bold",
                  }}
                >
                  Try Again
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
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
    alignSelf: "center",
    fontWeight: "bold",
    paddingTop: responsiveScreenWidth(8),
  },
  textInputstyle: {
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.2),
    fontSize: responsiveScreenFontSize(2),
    width: "100%",
    alignSelf: "center",
    margin: responsiveScreenWidth(3),
    marginTop: responsiveScreenWidth(4),
    height:
      Platform.OS === "ios"
        ? responsiveScreenWidth(12)
        : responsiveScreenWidth(12),
  },
  textInputstyle1: {
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.1),
    width: "100%",
    alignSelf: "center",
    margin: responsiveScreenWidth(3),
    color: colors.BLACK,
    height:
      Platform.OS === "ios"
        ? responsiveScreenWidth(12)
        : responsiveScreenWidth(12),
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
    marginTop: responsiveScreenWidth(2),
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
  modaltextStyle: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    marginTop: responsiveScreenWidth(8),
    fontWeight: "bold",
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
  },
  modaltextStyle1: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: "400",
  },
  ProfileIcon: {
    height: responsiveScreenWidth(20),
    width: responsiveScreenWidth(20),
    justifyContent: "center",
    alignSelf: "center",
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
});

export default MemberSignUpScreen;
