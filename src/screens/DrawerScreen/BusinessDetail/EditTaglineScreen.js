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
import Spinner from "react-native-loading-spinner-overlay";
import { BaseURL, EndPoint } from "../../../api/ApiConstant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const EditTaglineScreen = ({ navigation }) => {
  const [tagline, settagline] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [successModal, setsuccessModal] = useState(false);
  const [failureModal, setfailureModal] = useState(false);
  // ==========================================Api Call================
  const callEditApi = async () => {
    let token = await AsyncStorage.getItem("token");
    setIsLoading(true);
    var data = new FormData();
    data.append("business_tagline", tagline);
    var config = {
      method: "post",
      url: BaseURL + EndPoint.MERCHENTTAGLINE+id,
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
        alert("Tagline udpate successfully.");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(JSON.stringify(err));
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopHeaderView
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        headerText={strings.BusinessTagline}
      />
      <Spinner visible={isLoading} />
      <ScrollView>
        <View style={styles.container}>
           {/* Business Tagline */}
           <Text style={styles.titleText}>
            {strings.BusinessTagline}
          </Text>
          <View style={styles.textinputRow}>
            <TextInput
              value={tagline}
              onChangeText={(tagline) => {
                settagline(tagline);
              }}
              style={styles.textInputstyle}
            />
          </View>  
          <View style={styles.rowView}>
            <TouchableOpacity
              onPress={() => {
               callEditApi()
              }}
              style={styles.btnBlue}
            >
              <Text style={styles.btnText}>{strings.Update}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { settagline("");
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
    backgroundColor: colors.white,
    width:"100%"
  },
  textinputRow: {
    justifyContent: "center",
    alignSelf: "center",
width:"95%",
  },
  touchable: {
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.1),
    justifyContent: "center",
    height: responsiveScreenWidth(12),
    width: responsiveScreenWidth(12),
    marginStart: responsiveScreenWidth(-3),
    marginTop: responsiveScreenWidth(3),
  },
  textInputstyle: {
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    fontSize: responsiveScreenFontSize(2),
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.1),
    width: "78%",
    alignSelf: "center",
    margin: responsiveScreenWidth(3),
    marginStart: 0,
    color: colors.BLACK,
    height:Platform.OS==="ios"?responsiveScreenWidth(12):responsiveScreenWidth(12)
  },
  errMsg: {
    color: colors.red,
    fontSize: responsiveScreenFontSize(1.4),
    fontWeight: "600",
    marginTop: responsiveScreenWidth(-1),
    width: "75%",
    alignSelf: "center",
  },
  eyeIcon: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    alignSelf: "center",
  },
  headerText: {
    fontSize: responsiveScreenFontSize(2.5),
    color: colors.BLACK,
    fontWeight: "600",
    marginStart: responsiveScreenWidth(14),
    marginTop: responsiveScreenWidth(5),
    marginBottom: responsiveScreenWidth(5),
  },
  titleText: {
    fontSize: responsiveScreenFontSize(1.6),
    color: colors.BLACK,
    fontWeight: "600",
    marginStart: responsiveScreenWidth(12),
  },
  starText: {
    fontSize: responsiveScreenFontSize(1.8),
    color: colors.RED,
    alignSelf: "center",
    fontWeight: "bold",
    paddingTop: responsiveScreenWidth(8),
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
  modaltextStyle: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    marginTop: responsiveScreenWidth(8),
    fontWeight: "bold",
    width: "100%",
    alignSelf: "center",
    textAlign: "center"
  },
  ProfileIcon: {
    height: responsiveScreenWidth(20),
    width: responsiveScreenWidth(20),
    justifyContent: "center",
    alignSelf: "center"
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

export default EditTaglineScreen;
