// import React, { useState } from "react";
// import {
//   Image,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Platform,
//   Modal
// } from "react-native";
// import { DrawerActions } from "@react-navigation/native";
// // Custom ======================================================================================
// import colors from "../../res/colors/colors";
// import images from "../../res/imageConstant/images";
// import {
//   responsiveScreenFontSize,
//   responsiveScreenHeight,
//   responsiveScreenWidth,
// } from "../../utils/Size";
// import strings from "../../res/strings/strings";
// import TopHeaderView from "../../component/Header";
// import ButtonText from "../../component/ButtonText";
// import ButtonImage from "../../component/ButtonImage";
// import { BaseURL, EndPoint } from "../../api/ApiConstant";
// import Spinner from "react-native-loading-spinner-overlay";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

// const MemberCardScreen = ({ navigation,route }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [cardNumber, setcardNumber] = useState("");
//   const [cardName, setcardName] = useState("");
//   const [expMonth, setexpMonth] = useState("");
//   const [expYear, setexpYear] = useState("");
//   const [cardcvv, setcardcvv] = useState("");
//   const [successModal, setsuccessModal] = useState(false);
//   const [failureModal, setfailureModal] = useState(false);
//   console.log(route.params.data.firstName)
//   const [error,setError] = useState({
//     cardName : "",
//     cardNumber : "",
//     expMonth : ""
//   })

//   const validateForm = () => {
//     let formErrors = {};
//     let isValid = true;

//     if (!cardName) {
//       formErrors.cardName = "This field is required"
//       isValid = false;
//     }
//     if (!cardNumber) {
//      formErrors.cardNumber = "Your card number is incomplete"
//     }
//     if (!expMonth) {
//       formErrors.expMonth = "Your card's expiry date is incomplete"
//     }
//     setError(formErrors)
//     return isValid
//   }
//   const checkValidation = () => {
//     if (validateForm()) {
//       const data = {
//         cardName,
//         cardNumber,
//         expMonth,
//       }
//       return true
//     }
//     return false
//   }
//   // ==========================================Api Call================
//   const callSignUpApi = async () => {
//     setIsLoading(true);
//     var myHeaders = new Headers();
//     myHeaders.append("Accept", "application/json");
// console.log(route.params.data)
//     var formdata = new FormData();
//     formdata.append("first_name", route.params.data.firstName);
//     formdata.append("last_name", route.params.data.lastName);
//     formdata.append("email", route.params.data.email);
//     formdata.append("password", route.params.data.password);
//     formdata.append("address_line_1", route.params.data.addressLine1);
//     formdata.append("address_line_2", route.params.data.addressLine2);
//     formdata.append("address_line_3", route.params.data.addressLine3);
//     formdata.append("city", route.params.data.city);
//     formdata.append("country", route.params.data.country);
//     formdata.append("post_code", route.params.data.postCode);
//     formdata.append("phone_number", route.params.data.phoneNumber);
//     formdata.append("birth_month", route.params.data.birthMonth); // corrected
//     formdata.append("gender", route.params.data.gender); // corrected

//     // formdata.append("birth_month", route.params.data.birthMonthc);
//     // formdata.append("gender", route.params.data.genderc);
//     formdata.append("referral_code", route.params.data.refferalCode);
//     formdata.append("discount_code", route.params.data.discountCode);
    
//     formdata.append('card_number', cardNumber);
//     formdata.append('card_exp_month', expMonth);
//     formdata.append('card_exp_year', expYear);
//     formdata.append('card_cvv', cardcvv);
//     formdata.append('card_fullname', cardName);
    

//     var requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: formdata,
//       redirect: "follow",
//     };

//     fetch(
//       "https://winngoo.co.uk/api/user/register-member",
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(JSON.stringify(result));
//         if (result.success === true) {
//           console.log(result.message);
//           setIsLoading(false);
//           setsuccessModal(true);
//         } else {
//           alert(result.message);
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//         setfailureModal(true);
//         console.log(JSON.stringify(error));
//         console.log("error", error);
//       });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* <ScrollView> */}
//       <View style={styles.container}>
//         <TopHeaderView
//           onPress={() => {
//             navigation.dispatch(DrawerActions.openDrawer());
//           }}
//           headerText={strings.AddCardDetail}
//         />
//         <View style={{marginTop:responsiveScreenWidth(5)}}>
//         <Spinner visible={isLoading} />
//            <TextInput placeholderTextColor={colors.gray}
//             value={cardName}
//             onChangeText={(accNumber) => {
//               setcardName(accNumber);
//             }}
//             placeholder={"Enter Card Holder Name here"}
//             style={styles.textInputstyle}
//             // keyboardType="number-pad"
//             keyboardType="email-address"
//           />
//           {error.cardName && <Text style={styles.errorText}>{error.cardName}</Text>}
//            {/* <TextInput placeholderTextColor={colors.gray}
//             value={cardNumber}
//             onChangeText={(cardNumber) => {
//               setcardNumber(cardNumber);
//             }}
//             placeholder={"Enter Card Number here"}
//             style={styles.textInputstyle}
//             // keyboardType="email-address"
//             keyboardType="number-pad"
//             maxLength={16}
//           /> */}

//          <TextInput
//             placeholderTextColor={colors.gray}
//             value={cardNumber}
//             onChangeText={(cardNumber) => {
//            // Allow only digits and truncate to 16 characters
//            const sanitizedCardNumber = cardNumber.replace(/[^0-9]/g, '').slice(0, 16);
//            setcardNumber(sanitizedCardNumber);
//            }}
//            placeholder={"Enter Card Number here"}
//            style={styles.textInputstyle}
//            keyboardType="number-pad"
//            maxLength={16}
//         />
//         {error.cardNumber && <Text style={styles.errorText}>{error.cardNumber}</Text>}
         
//           <View style={{flexDirection:"row",alignItems:"center",marginStart:responsiveScreenWidth(10)}}>
//           <TextInput placeholderTextColor={colors.gray}
//             value={expMonth}
//             onChangeText={(expMonth) => {
//               setexpMonth(expMonth);
//             }}
//             placeholder={"MM"}
//             style={[styles.textInputstyle,{
//                 width:"20%"
//             }]}
//             maxLength={2}
//             keyboardType="number-pad"
//           />
          
//            <TextInput placeholderTextColor={colors.gray}
//             value={expYear}
//             onChangeText={(expYear) => {
//                 setexpYear(expYear);
//             }}
//             placeholder={"YYYY"}
//             style={[styles.textInputstyle,{
//                 width:"20%"
//             }]}
//             maxLength={4}
//             keyboardType="number-pad"
//             />
//            <TextInput placeholderTextColor={colors.gray}
//             value={cardcvv}
//             onChangeText={(cardcvv) => {
//                 setcardcvv(cardcvv);
//             }}
//             placeholder={"123"}
//             style={[styles.textInputstyle,{
//                 width:"20%"
//             }]}
//             maxLength={3}
//             keyboardType="number-pad"
//             />
//             </View>
//             {error.expMonth && <Text style={styles.errorText}>{error.expMonth}</Text>}
         

//           <View style={styles.rowView}>
//             <ButtonText
//             onPress={()=>{
//               if (checkValidation()) {
//                 callSignUpApi();
//               }
              
//             }}
//               loginBtn={{
//                 width: responsiveScreenWidth(25),
//               }}
//               text={strings.Create}
//             />
//             <ButtonText
//               loginBtn={{
//                 width: responsiveScreenWidth(25),
//               }}
//               onPress={()=>{
//                 setcardNumber("")
//                 setcardName("")
//                 setexpMonth("")
//                 setexpYear("")
//                 setcardcvv("")
//               }}
//               text={strings.Reset}
//             />
//           </View>
//           <Modal transparent={true} visible={successModal} animationType="slide">
//             <View style={styles.modalView}>
//               <Image
//                 source={images.successIcon}
//                 resizeMode="contain"
//                 style={styles.ProfileIcon}
//               />
//               <Text
//                 style={styles.modaltextStyle}
//               >
//                 Your detail udpate successfully.
//               </Text>
//               <TouchableOpacity onPress={() => {
//                 setsuccessModal(false)
//                 navigation.navigate('MemberLoginScreen')
//               }}
//                 style={{
//                   width: "50%",
//                   padding: responsiveScreenWidth(2),
//                   marginTop: responsiveScreenWidth(8),
//                   backgroundColor: colors.primary,
//                   borderRadius: responsiveScreenWidth(2),
//                   justifyContent: "center",
//                   alignSelf: "center",
//                   alignContent: "center"
//                 }}
//               >
//                 <Text style={{
//                   color: colors.white, alignSelf: "center",
//                   fontSize: responsiveScreenFontSize(1.8),
//                   fontWeight: "bold",
//                 }}>Thank You</Text>
//               </TouchableOpacity>
//             </View>
//           </Modal>
//           <Modal transparent={true} visible={failureModal} animationType="slide">
//             <View style={styles.modalView}>
//               <Image
//                 source={images.cancelcon}
//                 resizeMode="contain"
//                 style={styles.ProfileIcon}
//               />
//               <Text
//                 style={styles.modaltextStyle}
//               >
//                 Update detail fails.
//               </Text>
//               <TouchableOpacity onPress={() => {
//                 setfailureModal(false)
//                 navigation.goBack()
//               }}
//                 style={{
//                   width: "50%",
//                   padding: responsiveScreenWidth(2),
//                   marginTop: responsiveScreenWidth(8),
//                   backgroundColor: colors.primary,
//                   borderRadius: responsiveScreenWidth(2),
//                   justifyContent: "center",
//                   alignSelf: "center",
//                   alignContent: "center"
//                 }}
//               >
//                 <Text style={{
//                   color: colors.white, alignSelf: "center",
//                   fontSize: responsiveScreenFontSize(1.8),
//                   fontWeight: "bold",
//                 }}>Try Again</Text>
//               </TouchableOpacity>
//             </View>
//           </Modal>
//         </View>
//       </View>
//       {/* </ScrollView> */}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.white,
//   },
//   textInputstyle: {
//     backgroundColor: colors.TEXTINPUTBACKGROUND,
//     borderColor: colors.BLACK,
//     borderWidth: responsiveScreenWidth(0.02),
//     fontSize: responsiveScreenFontSize(2),
//     width: "75%",
//     alignSelf: "center",
//     margin: responsiveScreenWidth(3),
//     color: colors.BLACK,
//     height:Platform.OS==="ios"?responsiveScreenWidth(12):responsiveScreenWidth(12)
//   },
//   rowView: {
//     flexDirection: "row",
//     width: "75%",
//     justifyContent: "space-between",
//     alignItems: "center",
//     alignContent: "center",
//     alignSelf: "center",
//     marginTop: responsiveScreenWidth(10),
//   },
//   modalView: {
//     width: "80%",
//     height: responsiveScreenWidth(60),
//     marginTop: responsiveScreenWidth(60),
//     borderRadius: responsiveScreenWidth(2),
//     padding: responsiveScreenWidth(4),
//     justifyContent: "center",
//     alignContent: "center",
//     alignSelf: "center",
//     backgroundColor: colors.white,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.29,
//     shadowRadius: 4.65,

//     elevation: 7,
//   },
//   ProfileIcon: {
//     height: responsiveScreenWidth(20),
//     width: responsiveScreenWidth(20),
//     justifyContent: "center",
//     alignSelf: "center"
//   },  modaltextStyle: {
//     color: colors.BLACK,
//     fontSize: responsiveScreenFontSize(1.8),
//     marginTop: responsiveScreenWidth(8),
//     fontWeight: "bold",
//     width: "100%",
//     alignSelf: "center",
//     textAlign: "center"
//   },
//   errorText: {
//     color: colors.red,
//     fontSize: responsiveScreenFontSize(1.8),
//     marginBottom: responsiveScreenHeight(1),
//     marginLeft: responsiveScreenWidth(12),
//   },
// });

// export default MemberCardScreen;







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

const MemberCardScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cardNumber, setcardNumber] = useState("");
  const [cardName, setcardName] = useState("");
  const [expMonth, setexpMonth] = useState("");
  const [expYear, setexpYear] = useState("");
  const [cardcvv, setcardcvv] = useState("");
  const [successModal, setsuccessModal] = useState(false);
  const [failureModal, setfailureModal] = useState(false);
  const [error, setError] = useState({
    cardName: "",
    cardNumber: "",
    expMonth: ""
  });

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!cardName) {
      formErrors.cardName = "This field is required";
      isValid = false;
    }
    if (!cardNumber) {
      formErrors.cardNumber = "Your card number is incomplete";
      isValid = false;
    }
    if (!expMonth) {
      formErrors.expMonth = "Your card's expiry date is incomplete";
      isValid = false;
    }
    setError(formErrors);
    return isValid;
  }

  const checkValidation = () => {
    if (validateForm()) {
      return true;
    }
    return false;
  }

  // ==========================================Api Call================
  const callSignUpApi = async () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

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
    formdata.append("birth_month", route.params.data.birthMonth); // corrected
    formdata.append("gender", route.params.data.gender); // corrected

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
      "https://winngoo.co.uk/api/user/register-member",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(JSON.stringify(result));
        setIsLoading(false);
        console.log("API Response:", result)

        if (result.success) {
          setsuccessModal(true);
        } else { 
          if (result.errors && result.errors.email) {
            alert("Email exists, try with another email.");
          } else {

            alert(result.message || "Something went wrong.");
          }
          //alert(result.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setfailureModal(true);
        console.log("error", error);
      });
  };

  const handleSubmit = () => {
    if (checkValidation()) {
      callSignUpApi();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* <TopHeaderView
          onPress={() => {
           // navigation.dispatch(DrawerActions.openDrawer());
          }}
          headerText={strings.AddCardDetail}
          hideLeftIcon={true} // Add this to hide the left icon
          hideRightIcon={true} 
        /> */}
        <View style={styles.headerContainer}>
  <Text style={styles.headerText}>{strings.AddCardDetail}</Text>
</View>

       
        <View style={{ marginTop: responsiveScreenWidth(5) }}>
          <Spinner visible={isLoading} />
          <TextInput
            placeholderTextColor={colors.gray}
            value={cardName}
            onChangeText={(text) => setcardName(text)}
            placeholder={"Enter Card Holder Name here"}
            style={styles.textInputstyle}
            keyboardType="default"
          />
          {error.cardName && <Text style={styles.errorText}>{error.cardName}</Text>}

          <TextInput
            placeholderTextColor={colors.gray}
            value={cardNumber}
            onChangeText={(text) => {
              const sanitizedCardNumber = text.replace(/[^0-9]/g, '').slice(0, 16);
              setcardNumber(sanitizedCardNumber);
            }}
            placeholder={"Enter Card Number here"}
            style={styles.textInputstyle}
            keyboardType="number-pad"
            maxLength={16}
          />
          {error.cardNumber && <Text style={styles.errorText}>{error.cardNumber}</Text>}

          <View style={{ flexDirection: "row", alignItems: "center", marginStart: responsiveScreenWidth(10) }}>
            <TextInput
              placeholderTextColor={colors.gray}
              value={expMonth}
              onChangeText={(text) => setexpMonth(text)}
              placeholder={"MM"}
              style={[styles.textInputstyle, { width: "20%" }]}
              maxLength={2}
              keyboardType="number-pad"
            />

            <TextInput
              placeholderTextColor={colors.gray}
              value={expYear}
              onChangeText={(text) => setexpYear(text)}
              placeholder={"YYYY"}
              style={[styles.textInputstyle, { width: "20%" }]}
              maxLength={4}
              keyboardType="number-pad"
            />
            <TextInput
              placeholderTextColor={colors.gray}
              value={cardcvv}
              onChangeText={(text) => setcardcvv(text)}
              placeholder={"123"}
              style={[styles.textInputstyle, { width: "20%" }]}
              maxLength={3}
              keyboardType="number-pad"
            />
          </View>
          {error.expMonth && <Text style={styles.errorText}>{error.expMonth}</Text>}

          <View style={styles.rowView}>
            <ButtonText
              onPress={handleSubmit}
              loginBtn={{ width: responsiveScreenWidth(25) }}
              text={strings.Create}
            />
            <ButtonText
              onPress={() => {
                setcardNumber("");
                setcardName("");
                setexpMonth("");
                setexpYear("");
                setcardcvv("");
              }}
              loginBtn={{ width: responsiveScreenWidth(25) }}
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
                Your detail update successfully.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setsuccessModal(false);
                  navigation.navigate('MemberLoginScreen');
                }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Thank You</Text>
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
              <TouchableOpacity
                onPress={() => {
                  setfailureModal(false);
                  // Stay on the same page
                }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    </SafeAreaView>
  );
}

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
    height: Platform.OS === "ios" ? responsiveScreenWidth(12) : responsiveScreenWidth(12),
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
    alignSelf: "center",
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
  errorText: {
    color: colors.red,
    fontSize: responsiveScreenFontSize(1.8),
    marginBottom: responsiveScreenHeight(1),
    marginLeft: responsiveScreenWidth(12),
  },
  modalButton: {
    width: "50%",
    padding: responsiveScreenWidth(2),
    marginTop: responsiveScreenWidth(8),
    backgroundColor: colors.primary,
    borderRadius: responsiveScreenWidth(2),
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
  },
  modalButtonText: {
    color: colors.white,
    alignSelf: "center",
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: "bold",
  },
  headerText: {
    fontSize: responsiveScreenFontSize(2.5), // Adjust size as needed
    fontWeight: 'bold', // Makes the text bold
    textAlign: 'center', // Centers the text horizontally
    flex: 1, // Ensures the text takes up available space
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsiveScreenHeight(2), // Adjust padding as needed
  },
});

export default MemberCardScreen;
