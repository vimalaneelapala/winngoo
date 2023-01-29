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

const businessType = [
  { label: "Sole Trader", value: "Sole Trader" },
  { label: "Partnership", value: "Partnership" },
  { label: "Limited Company", value: "Limited Company" },
  { label: "Freelancer", value: "Freelancer" },
  { label: "PLC", value: "PLC" },
];
const businessRelation = [
  { label: "Director", value: "Director" },
  { label: "Partner", value: "Partner" },
  { label: "Sole Trader", value: "Sole Trader" },
  { label: "Other", value: "Other" },
];
const discount = [
  { label: "Discount", value: "Discount" },
  { label: "Reward", value: "Reward" },
];
const MerchentSignUpBusinessScreen = ({ navigation }) => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [subCategoryValue, setSubCategoryValue] = useState([]);
  const [businessTypeValue, setBusinessType] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [businessRelationValue, setBusinessRelation] = useState("");
  const [discountValue, setdiscountValue] = useState("");
  const [tradingYear, settradingYear] = useState("");
  const [detail, setdetail] = useState("");
  const [discountTerm, setdiscountTerm] = useState("");
  const [websiteLink, setwebsiteLink] = useState("");
  const [refferalCode, setrefferalCode] = useState("");
  const [photo, setphoto] = useState("");
  // ==========================================Api Call================
  useEffect(() => {
    getCategoryApi();
  }, [getCategoryApi]);
  // ==========================================Api Call================
  // ============Category Api Call================
  const getCategoryApi = async () => {
    await axios
      .get(BaseURL + EndPoint.CATEGORIES)
      .then((res) => {
        console.log(BaseURL + EndPoint.CATEGORIES);
        setCategory(res.data.result);
      })
      .catch((err) => console.log("err1", JSON.stringify(err)));
  };
  // ============Sub Category Api Call================
  const getSubCategoryApi = async (id) => {
    await axios
      .get(BaseURL + EndPoint.SUBCATEGORIES + id)
      .then((res) => {
        setSubCategory(res.data.result);
      })
      .catch((err) => console.log("err2", JSON.stringify(err)));
  };
  // ============Register Api Call================
  const registerApiCall = async () => {
    var data = {
      first_name: "Dhruvika",
      last_name: "Chauhan",
      phone_number: "+919998208121",
      email: "dhruvikachauhan1110@gmail.com",
      password: "Admin@123",
      address_line_1: "Manek chowk",
      latitude: "22.999880",
      longitude: "72.660614",
      city: "Ahmedabad",
      country: "India",
      post_code: "380001",
      business_name: "Y.H.Print",
      business_type: "Limited Company",
      business_relationship: "Director",
      business_description: "Textile Company",
      trading_years: "25",
      image: "",
      category_id: [6],
      sub_category_id: [46],
      discountType: "DISCOUNT",
      discount_percentage: "10%",
      terms_and_conditions: "yes",
    };

    await axios
      .post(BaseURL + EndPoint.REGISTERMERCHENT, data)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => console.log(JSON.stringify(err)));
  };
  // ==========================================Render Call================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.loginText}>{strings.EnterBusinessDetail}</Text>

            <View style={styles.mainview}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={category}
                search={false}
                maxHeight={300}
                labelField="name"
                valueField="slug"
                placeholder={"Select category here"}
                value={categoryValue}
                onChange={(item) => {
                  // alert(JSON.stringify(item))
                  setCategoryValue(item.name);
                  getSubCategoryApi(item.id);
                }}
              />

              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={subCategory}
                search={false}
                maxHeight={300}
                labelField="name"
                valueField="slug"
                placeholder={"Select sub category here"}
                value={subCategoryValue}
                onChange={(item) => {
                  // alert(JSON.stringify(item))
                  setSubCategoryValue(item.name);
                }}
              />
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={businessType}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select business type"}
                value={businessTypeValue}
                onChange={(item) => {
                  setBusinessType(item.value);
                }}
              />

              <TextInput
                value={registrationNumber}
                onChangeText={(registrationNumber) => {
                  setRegistrationNumber(registrationNumber);
                }}
                placeholder={strings.EnterregistrationNumber}
                style={styles.textInputstyle}
              />
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={businessRelation}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select business relation"}
                value={businessRelationValue}
                onChange={(item) => {
                  setBusinessRelation(item.value);
                }}
              />

              <TextInput
                value={businessDescription}
                onChangeText={(businessDescription) => {
                  setBusinessDescription(businessDescription);
                }}
                placeholder={strings.EnterbusinessDescription}
                style={styles.textInputstyle}
              />

              <TextInput
                value={tradingYear}
                onChangeText={(tradingYear) => {
                  settradingYear(tradingYear);
                }}
                placeholder={strings.EntertradingYear}
                style={styles.textInputstyle}
              />

              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={discount}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select discount type"}
                value={discountValue}
                onChange={(item) => {
                  setdiscountValue(item.value);
                }}
              />

              <TextInput
                value={detail}
                onChangeText={(detail) => {
                  setdetail(detail);
                }}
                placeholder={strings.EnterbusinessDetail}
                style={styles.textInputstyle}
              />

              <TextInput
                value={websiteLink}
                onChangeText={(websiteLink) => {
                  setwebsiteLink(websiteLink);
                }}
                placeholder={strings.EnterwebsiteLink}
                style={styles.textInputstyle}
              />

              <TextInput
                value={refferalCode}
                onChangeText={(refferalCode) => {
                  setrefferalCode(refferalCode);
                }}
                placeholder={strings.EnterReferralCode}
                style={styles.textInputstyle}
              />
            </View>

            <TouchableOpacity onPress={registerApiCall} style={styles.loginBtn}>
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
                {strings.SignUpMerchent}
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
    backgroundColor: colors.white,
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.2),
    fontSize: responsiveScreenFontSize(2),
    width: "100%",
    alignSelf: "center",
    margin: responsiveScreenWidth(3),
    marginTop: responsiveScreenWidth(4),
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
    backgroundColor: colors.white,
    marginTop: responsiveScreenWidth(5),
    width: "99%",
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

export default MerchentSignUpBusinessScreen;
