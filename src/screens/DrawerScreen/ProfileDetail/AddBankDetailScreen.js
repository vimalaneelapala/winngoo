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
import { BaseURL, EndPoint } from "../../../api/ApiConstant";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AddBankDetailScreen = ({ navigation }) => {
  console.log('AddBankDetailScreen rendered');
  console.log('Navigation prop:', navigation);

  const [isLoading, setIsLoading] = useState(false);
  const [accNumber, setAccNumber] = useState("");
  const [accName, setAccName] = useState("");
  const [bankName, setBankName] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [successModal, setsuccessModal] = useState(false);
  const [failureModal, setfailureModal] = useState(false);
  const [errors, setErrors] = useState({
    accNumber : "",
    accName : "",
    bankName : "",
    sortCode : "",
    rollNumber : ""
  })
  const validate = () => {
    let formError = {}
    let isValid = true
    if(! accNumber){
    formError.accNumber  = 'This field is required'
    isValid = false;
    }
    if(! accName) {
      formError.accName = "This field is requird"
      isValid = false;
    }
    if(! bankName) {
      formError.bankName ="This field is required"
      isValid = false;
    }
    if(! sortCode) {
      formError.sortCode = "This field is required"
      isValid = false;
    }
    if(! rollNumber) {
      formError.rollNumber = "This field is required"
      isValid = false;
    }
    setErrors(formError)
    return isValid
  }
   const checkValidation = () => {
     if(validate()) {
       const data = {
         accNumber,
         accName,
         bankName,
         sortCode,
         rollNumber
       }
       return true
     }
     return false
   }

  
  // // ==========================================Api Call================
  const addBankDetailApi = async () => {
    let token = await AsyncStorage.getItem("token");
    setIsLoading(true);
    var data = new FormData();

    data.append("account_number", accNumber);
    data.append("account_holder_name", accName);
    data.append("bank_name", bankName);
    data.append("sort_code", sortCode);
    data.append("building_society_roll_number", rollNumber);

    var config = {
      method: "post",
      url: BaseURL + EndPoint.BANKDETAIL,
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
        setAccName("")
        setAccNumber("")
        setBankName("")
        setSortCode("")
        setRollNumber("")
        navigation.goBack()
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(JSON.stringify(err));
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
            value={accNumber}
            onChangeText={(accNumber) => {
              setAccNumber(accNumber);
            }}
            placeholder={strings.CardNumber}
            style={styles.textInputstyle}
            keyboardType="number-pad"
          />
          {errors.accNumber && <Text style={styles.errorText}>{errors.accNumber}</Text>}
           <TextInput placeholderTextColor={colors.gray}
            value={accName}
            onChangeText={(accName) => {
              setAccName(accName);
            }}
            placeholder={strings.CardName}
            style={styles.textInputstyle}
            keyboardType="email-address"
          />
          {errors.accName && <Text style={styles.errorText}>{errors.accName}</Text>}
           <TextInput placeholderTextColor={colors.gray}
            value={bankName}
            onChangeText={(bankName) => {
              setBankName(bankName);
            }}
            placeholder={strings.BankName}
            style={styles.textInputstyle}
          />
          {errors.bankName && <Text style={styles.errorText}>{errors.bankName}</Text>}
           <TextInput placeholderTextColor={colors.gray}
            value={sortCode}
            onChangeText={(sortCode) => {
              setSortCode(sortCode);
            }}
            placeholder={strings.SortNumber}
            style={styles.textInputstyle}
            keyboardType="number-pad"
          />
          {errors.sortCode && <Text style={styles.errorText}>{errors.sortCode}</Text>}
           <TextInput placeholderTextColor={colors.gray}
            value={rollNumber}
            onChangeText={(rollNumber) => {
              setRollNumber(rollNumber);
            }}
            placeholder={strings.RollNumber}
            style={styles.textInputstyle}
            keyboardType="number-pad"
          />
          {errors.rollNumber && <Text style={styles.errorText}>{errors.rollNumber}</Text>}
          <View style={styles.rowView}>
            <ButtonText
            onPress={()=>{
              if(checkValidation())
              addBankDetailApi()
            }}
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
                setAccName("")
                setAccNumber("")
                setBankName("")
                setSortCode("")
                setRollNumber("")
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
    backgroundColor: colors.TEXTINPUTBACKGROUND,
  },
  textInputstyle: {
    backgroundColor: colors.WHITE,
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
  errorText: {
    color: colors.red,
    fontSize: responsiveScreenFontSize(1.8),
    marginBottom: responsiveScreenHeight(1),
    marginLeft: responsiveScreenWidth(12),
  },
});

export default AddBankDetailScreen;
