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
import colors from "../../res/colors/colors";
import images from "../../res/imageConstant/images";
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "../../utils/Size";
import strings from "../../res/strings/strings";
import TopHeaderView from "../../component/Header";
import ButtonText from "../../component/ButtonText";
import ButtonImage from "../../component/ButtonImage";
import { BaseURL, EndPoint } from "../../api/ApiConstant";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const MemberCardScreen = ({ navigation,route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cardNumber, setcardNumber] = useState("");
  const [cardName, setcardName] = useState("");
  const [expMonth, setexpMonth] = useState("");
  const [expYear, setexpYear] = useState("");
  const [cardcvv, setcardcvv] = useState("");
  const [successModal, setsuccessModal] = useState(false);
  const [failureModal, setfailureModal] = useState(false);
  console.log(route.params.data.firstName)
  // ==========================================Api Call================
  const callSignUpApi = async () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
console.log(route.params.data)
    var formdata = new FormData();
    formdata.append("first_name", route.params.data.firstName);
    formdata.append("last_name", route.params.data.lastName);
    formdata.append("email", route.params.data.email);
    formdata.append("password", route.params.data.password);
    formdata.append("address_line_1", route.params.data.addressLine1);
    formdata.append("address_line_2", route.params.data.addressLine2);
    formdata.append("address_line_3", route.params.data.addressLine3);
    formdata.append("city", route.params.data.city);
    formdata.append("country", route.params.data.country);
    formdata.append("post_code", route.params.data.postCode);
    formdata.append("phone_number", route.params.data.phoneNumber);
    formdata.append("birth_month", route.params.data.birthMonthc);
    formdata.append("gender", route.params.data.genderc);
    formdata.append("referral_code", route.params.data.refferalCode);
    formdata.append("discount_code", route.params.data.discountCode);
    
    formdata.append('card_number', cardNumber);
    formdata.append('card_exp_month', expMonth);
    formdata.append('card_exp_year', expYear);
    formdata.append('card_cvv', cardcvv);
    formdata.append('card_fullname', cardName);
    

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
          setIsLoading(false);
          setsuccessModal(true);
        } else {
          alert(result.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setfailureModal(true);
        console.log(JSON.stringify(error));
        console.log("error", error);
      });
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <View style={styles.container}>
        <TopHeaderView
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
          headerText={strings.AddCardDetail}
        />
        <View style={{marginTop:responsiveScreenWidth(5)}}>
        <Spinner visible={isLoading} />
           <TextInput placeholderTextColor={colors.gray}
            value={cardName}
            onChangeText={(accNumber) => {
              setcardName(accNumber);
            }}
            placeholder={"Enter Card Holder Name here"}
            style={styles.textInputstyle}
            keyboardType="number-pad"
          />
           <TextInput placeholderTextColor={colors.gray}
            value={cardNumber}
            onChangeText={(cardNumber) => {
              setcardNumber(cardNumber);
            }}
            placeholder={"Enter Card Number here"}
            style={styles.textInputstyle}
            keyboardType="email-address"
          />
         
          <View style={{flexDirection:"row",alignItems:"center",marginStart:responsiveScreenWidth(10)}}>
          <TextInput placeholderTextColor={colors.gray}
            value={expMonth}
            onChangeText={(expMonth) => {
              setexpMonth(expMonth);
            }}
            placeholder={"MM"}
            style={[styles.textInputstyle,{
                width:"20%"
            }]}
            maxLength={2}
            keyboardType="number-pad"
          />
           <TextInput placeholderTextColor={colors.gray}
            value={expYear}
            onChangeText={(expYear) => {
                setexpYear(expYear);
            }}
            placeholder={"YYYY"}
            style={[styles.textInputstyle,{
                width:"20%"
            }]}
            maxLength={4}
            keyboardType="number-pad"
            />
           <TextInput placeholderTextColor={colors.gray}
            value={cardcvv}
            onChangeText={(cardcvv) => {
                setcardcvv(cardcvv);
            }}
            placeholder={"123"}
            style={[styles.textInputstyle,{
                width:"20%"
            }]}
            maxLength={3}
            keyboardType="number-pad"
            />
            </View>
         

          <View style={styles.rowView}>
            <ButtonText
            onPress={()=>{callSignUpApi()}}
              loginBtn={{
                width: responsiveScreenWidth(25),
              }}
              text={strings.Create}
            />
            <ButtonText
              loginBtn={{
                width: responsiveScreenWidth(25),
              }}
              onPress={()=>{
                setcardNumber("")
                setcardName("")
                setexpMonth("")
                setexpYear("")
                setcardcvv("")
              }}
              text={strings.Reset}
            />
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
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textInputstyle: {
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.02),
    fontSize: responsiveScreenFontSize(2),
    width: "75%",
    alignSelf: "center",
    margin: responsiveScreenWidth(3),
    color: colors.BLACK,
    height:Platform.OS==="ios"?responsiveScreenWidth(12):responsiveScreenWidth(12)
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

export default MemberCardScreen;
