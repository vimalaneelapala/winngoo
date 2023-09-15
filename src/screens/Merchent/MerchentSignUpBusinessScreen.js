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
import { launchImageLibrary } from "react-native-image-picker";
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
const MerchentSignUpBusinessScreen = ({ navigation, route }) => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState([]);
  const [subCategoryValue, setSubCategoryValue] = useState([]);
  const [businessTypeValue, setBusinessType] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [businessRelationValue, setBusinessRelation] = useState("");
  const [discountValue, setdiscountValue] = useState("");
  const [tradingYear, settradingYear] = useState("");
  const [detail, setdetail] = useState("");
  const [businessName, setbusinessName] = useState("");
  const [discountTerm, setdiscountTerm] = useState("");
  const [websiteLink, setwebsiteLink] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [refferalCode, setrefferalCode] = useState("");
  const [photo, setphoto] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [isAgrree, setisAgrree] = useState(false);
  console.log(">>>>>>>>>>>>>>>>>>>>", route.params.addressdetail);
  console.log(">>>>>>>>>>>>>>>>>>>>", route.params.addressdetail.addressLine1);
  console.log(">>>>>>>>>>>>>>>>>>>>", JSON.stringify(route.params.detail));
  console.log(
    ">>>>>>>>>>>>>>>>>>>>",
    JSON.stringify(route.params.detail.details)
  );
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
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var formdata = new FormData();
    formdata.append("first_name", route.params.detail.details.firstName),
      formdata.append("last_name", route.params.detail.details.lastName),
      formdata.append("phone_number", route.params.detail.details.phoneNumber),
      formdata.append("email", route.params.detail.details.email),
      formdata.append("password", route.params.detail.details.password),
      formdata.append("address_line_1", route.params.address_line_1),
      formdata.append("address_line_2", route.params.address_line_2),
      formdata.append("address_line_3", route.params.address_line_3),
      formdata.append("city", route.params.city),
      formdata.append("country", route.params.country),
      formdata.append("post_code", route.params.post_code),
      formdata.append("business_name", businessName),
      formdata.append("business_type", businessType),
      formdata.append("business_relationship", businessRelation),
      formdata.append("business_description", businessDescription),
      formdata.append("trading_years", tradingYear),
      formdata.append("image", imageUrl),
      formdata.append("category_id", categoryId),
      formdata.append("sub_category_id", subCategoryId),
      formdata.append("discountType", discountValue),
      formdata.append("discount_percentage", discountPercentage),
      formdata.append("status[0]", "Open");
    formdata.append("status[1]", "Open");
    formdata.append("status[2]", "Open");
    formdata.append("status[3]", "Open");
    formdata.append("status[4]", "Open");
    formdata.append("status[5]", "Open");
    formdata.append("status[6]", "Open");
    formdata.append("openingTime[]", "");
    formdata.append("closingTime[]", "");
    formdata.append("dayOfWeek[]", "Monday");
    formdata.append("terms_and_conditions", "yes");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    console.log(requestOptions);
    console.log(BaseURL + EndPoint.REGISTERMERCHENT);
    fetch(BaseURL + EndPoint.REGISTERMERCHENT, requestOptions)
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
  // ==========================================Render Call================
  const selectFile = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        setimageUrl(response.assets[0].uri);
        console.log(response.assets[0].uri);
        console.log(response.assets[0]);
      }
    );
  };
  // ==========================================Render Call================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.container}>
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
                {strings.EnterBusinessDetail}
              </Text>
            </View>

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
                  setCategoryValue(item.slug);
                  setCategoryId(item.id);
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
                  setSubCategoryValue(item.slug);
                  setSubCategoryId(item.id);
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
                placeholderTextColor={colors.gray}
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
                placeholderTextColor={colors.gray}
                value={businessName}
                onChangeText={(businessName) => {
                  setbusinessName(businessName);
                }}
                placeholder={strings.EnterbusinessDescriptionName}
                style={styles.textInputstyle}
              />
              <TextInput
                placeholderTextColor={colors.gray}
                value={businessDescription}
                onChangeText={(businessDescription) => {
                  setBusinessDescription(businessDescription);
                }}
                placeholder={strings.EnterbusinessDescription}
                style={styles.textInputstyle}
              />

              <TextInput
                placeholderTextColor={colors.gray}
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
                placeholderTextColor={colors.gray}
                value={discountPercentage}
                onChangeText={(text) => {
                  setDiscountPercentage(text);
                }}
                placeholder={"Discount Percentage"}
                style={styles.textInputstyle}
              />
              <TextInput
                placeholderTextColor={colors.gray}
                value={detail}
                onChangeText={(detail) => {
                  setdetail(detail);
                }}
                placeholder={strings.EnterbusinessDetail}
                style={styles.textInputstyle}
              />

              <TextInput
                placeholderTextColor={colors.gray}
                value={websiteLink}
                onChangeText={(websiteLink) => {
                  setwebsiteLink(websiteLink);
                }}
                placeholder={strings.EnterwebsiteLink}
                style={styles.textInputstyle}
              />

              <TextInput
                placeholderTextColor={colors.gray}
                value={refferalCode}
                onChangeText={(refferalCode) => {
                  setrefferalCode(refferalCode);
                }}
                placeholder={strings.EnterReferralCode}
                style={styles.textInputstyle}
              />

              <TouchableOpacity
                style={[
                  styles.textInputstyle,
                  {
                    flexDirection: "row",
                    height: responsiveScreenWidth(10),
                    alignItem: "center",
                    padding: 5,
                  },
                ]}
                onPress={() => {
                  selectFile();
                }}
              >
                <Image
                  source={images.GalleryIcon}
                  style={{
                    height: 20,
                    width: 20,
                    alignSelf: "center",
                    marginStart: 10,
                  }}
                ></Image>

                <Text
                  style={[
                    styles.modaltextStyle1,
                    {
                      colors: colors.BLUETEXT,
                      alignSelf: "center",
                      marginStart: 15,
                    },
                  ]}
                >
                  Select Image
                </Text>
              </TouchableOpacity>

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
                  I agree to the{" "}
                  <Text
                    style={[
                      styles.modaltextStyle1,
                      { colors: colors.BLUETEXT },
                    ]}
                  >
                    Affiliate/Partner Agreement
                  </Text>
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                if (categoryValue === "") {
                  alert("Please select category to procced");
                } else if (subCategoryValue === "") {
                  alert("Please select sub category to procced");
                } else if (businessType === "") {
                  alert("Please select business type to procced");
                } else if (businessRelationValue === "") {
                  alert("Please select business relation to procced");
                } else if (businessDescription === "") {
                  alert("Please select business description to procced");
                } else if (tradingYear === "") {
                  alert("Please select number of trading years to procced");
                } else if (discountValue === "") {
                  alert("Please select type of discount to procced");
                } else if (discountPercentage === "") {
                  alert("Please select discount percentage to procced");
                } else if (imageUrl === "") {
                  alert("Please select image to procced");
                } else {
                  isAgrree
                    ? registerApiCall()
                    : alert("Please accept agrrement to procced");
                }
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
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    borderColor: colors.BLACK,
    color: colors.BLACK,
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
    height: responsiveScreenWidth(13),
    borderRadius: responsiveScreenWidth(1),
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.2),
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    marginTop: responsiveScreenWidth(3),
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
  modaltextStyle1: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: "400",
  },
});

export default MerchentSignUpBusinessScreen;
