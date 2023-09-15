import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Modal,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// Custom ======================================================================================
import colors from "../../res/colors/colors";
import images from "../../res/imageConstant/images";
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "../../utils/Size";
import TopHeaderView from "../../component/Header";
import { BaseURL, EndPoint } from "../../api/ApiConstant";

const DashboardScreen = ({ navigation }) => {
  const [isConnected, setisConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [discountContribute, setdiscountContribute] = useState(0);
  const [pendingRefferalEarning, setpendingRefferalEarning] = useState(0);
  const [refferalEarning, setrefferalEarning] = useState(0);
  const [refferalCode, setrefferalCode] = useState(0);
  const [discountPointEarned, setdiscountPointEarned] = useState(0);
  const [loginType, setloginType] = useState("");
  const [fullname, setfullname] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [successModal, setsuccessModal] = useState(false);
  const [failureModal, setfailureModal] = useState(false);
  // UseEffect=================================================================================
  // ==========================================Api Call================
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setisConnected(state.isConnected);
      console.log(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    userDetailApiCall();
  }, [userDetailApiCall]);
  // ==========================================Api Call================
  const userDetailApiCall = async () => {
    let token = await AsyncStorage.getItem("token");
    let loginTypeTemp = await AsyncStorage.getItem("loginType");
    global.loginTypeTemp = loginTypeTemp;
    setloginType(loginTypeTemp);
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
        console.log("member",JSON.stringify(res.data.result));
        setfullname(res.data.result.first_name+" "+res.data.result.last_name)
        global.loginTypeTemp = res.data.result.member===null?"merchent":"member";
        setdiscountContribute(res.data.result.discount);
        setdiscountPointEarned(res.data.result.received_discount_points);
        setpendingRefferalEarning(res.data.result.pending_referral_earning);
        setrefferalCode(res.data.result.WinngooApp_user.referral_code);
        setrefferalEarning(res.data.result.referral_earning);
        global.refferalCode = res.data.result.WinngooApp_user.referral_code;
        global.image =
          res.data.result.image != null ? res.data.result.image : null;
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(JSON.stringify(err));
      });
  };
  const callLogOutApi = async () => {
    let token = await AsyncStorage.getItem("token");
    setIsModal(false);
    var config = {
      method: "post",
      url: BaseURL + EndPoint.LOGOUT,
      headers: {
        "x-access-token": token,
      },
    };
    await axios(config)
      .then(async () => {
        setsuccessModal(true);
        await AsyncStorage.clear();
      })
      .catch((err) => {
        setfailureModal(true);
        console.log(JSON.stringify(err));
      });
  };
  // Function=================================================================================
  const cardView = (title, answer, textcolor, image) => {
    return (
      <View style={styles.shadowcard}>
        <View style={[styles.heightView, { backgroundColor: textcolor }]} />
        <View style={[styles.rowView, { width: "70%" }]}>
          <Text style={[styles.titleText, { color: textcolor }]}>{title}</Text>
          <Text style={styles.ansText}>{answer}</Text>
        </View>
        <View style={[styles.rowView, { marginStart: 0 }]}>
          <Image source={image} resizeMode="contain" style={styles.blueIcon} />
        </View>
      </View>
    );
  };
  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerstyle}>
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
              style={{ marginTop: responsiveScreenWidth(1) }}
            >
              <Image
                source={images.HamburgerIcon}
                resizeMode="contain"
                style={styles.HamburgerIcon}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerText}>{""}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (!isModal) {
                  setIsModal(true);
                }
              }}
              style={{ marginTop: responsiveScreenWidth(1) }}
            >
              <Image
                source={
                  global.image === null || global.image === undefined
                    ? images.ProfileIcon
                    : { uri: global.image }
                }
                resizeMode="contain"
                style={styles.ProfileIcon}
              />
            </TouchableOpacity>
          </View>
          {/* <TopHeaderView
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}
          /> */}
          <Spinner visible={isLoading} />
          {isConnected || isConnected === undefined ? (
            <View>
               <TouchableOpacity
                onPress={() => {
                 Linking.openURL("https://winngoo.co.uk/amazing-deals")
                }}
                style={styles.loginBtn}
              >
                 <Image source={images.LogoIcon} style={styles.blueIcon1} />
                <Text
                  style={[
                    styles.loginText,
                    {
                      color: colors.WHITE,
                      fontSize: responsiveScreenFontSize(2),
                    },
                  ]}
                >
                  {"Visit To Website"}
                </Text>
              </TouchableOpacity>
               <Text numberOfLines={1} ellipsizeMode="tail" style={styles.headerText}>{"Welcome,"+fullname}</Text>
              {loginType === "member" ? (
                <View>
                  {cardView(
                    "TOTAL SAVINGS",
                    discountContribute,
                    colors.BLUETEXT,
                    images.CreditCardIcon
                  )}
                  {cardView(
                    "DISCOUNTS RECEIVED",
                    discountContribute,
                    colors.BLUETEXT,
                    images.CreditCardIcon
                  )}
                  {cardView(
                    "CASHBACK RECEIVED",
                    pendingRefferalEarning,
                    colors.orange,
                    images.DollarIcon
                  )}
                  {cardView(
                    "PENDING REFERRAL EARNING",
                    pendingRefferalEarning,
                    colors.yellow,
                    images.MultipleUserIcon
                  )}
                  {cardView(
                    "REFERRAL EARNINGS",
                    refferalEarning,
                    colors.green,
                    images.NewsPaerIcon
                  )}
                  {cardView(
                    "REFERRER CODE",
                    refferalCode,
                    colors.blue,
                    images.MemberCardIcon
                  )}
                  {cardView(
                    "DISCOUNT POINTS RECEIVED",
                    discountPointEarned,
                    colors.blue,
                    images.MemberCardIcon
                  )}
                </View>
              ) : (
                <View>
                  {cardView(
                    "DISCOUNTS CONTRIBUTED",
                    discountContribute,
                    colors.BLUETEXT,
                    images.CreditCardIcon
                  )}
                  {cardView(
                    "PENDING REFERRAL EARNING",
                    pendingRefferalEarning,
                    colors.orange,
                    images.DollarIcon
                  )}
                  {cardView(
                    "REFERRAL EARNINGS",
                    refferalEarning,
                    colors.yellow,
                    images.MultipleUserIcon
                  )}
                  {cardView(
                    "REFERRER CODE",
                    refferalCode,
                    colors.green,
                    images.NewsPaerIcon
                  )}
                  {cardView(
                    "DISCOUNT POINTS RECEIVED",
                    discountPointEarned,
                    colors.blue,
                    images.MemberCardIcon
                  )}
                </View>
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: responsiveScreenWidth(100),
                  width: responsiveScreenWidth(100),
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <Image
                  source={images.wifi}
                  resizeMode="contain"
                  style={styles.noData}
                />
                <Text
                  style={[
                    styles.paginatonTxt,
                    { fontSize: responsiveScreenFontSize(2.4) },
                  ]}
                >
                  {"No Internet Connection\nPlease try again."}
                </Text>
              </View>
            </View>
          )}

          <Modal transparent={true} visible={isModal} animationType="slide">
            <TouchableOpacity
              onPress={() => {
                console.log("Modal has been closed.");
                setIsModal(!isModal);
              }}
              style={{ backgroundColor: "#00000030", flex: 1 }}
            >
              <View style={styles.modalView}>
                <Text
                  onPress={() => {
                    setIsModal(!isModal);
                    navigation.navigate("PersonalInfoScreen");
                  }}
                  style={styles.modaltextStyle}
                >
                  Profile Information
                </Text>
                <View style={styles.modalline} />
                <Text
                  onPress={() => {
                    setIsModal(!isModal);
                    callLogOutApi();
                  }}
                  style={styles.modaltextStyle}
                >
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </Modal>

          <Modal
            transparent={true}
            visible={successModal}
            animationType="slide"
          >
            <View style={styles.modalView1}>
              <Image
                source={images.successIcon}
                resizeMode="contain"
                style={styles.ProfileIcon1}
              />
              <Text style={styles.modaltextStyle1}>
                You have been logged out.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsModal(false);
                  setsuccessModal(false);
                  navigation.navigate("MemberLoginScreen");
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
            <View style={styles.modalView1}>
              <Image
                source={images.cancelcon}
                resizeMode="contain"
                style={styles.ProfileIcon1}
              />
              <Text style={styles.modaltextStyle1}>
                Not able to log out from app.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsModal(false);
                  setfailureModal(false);
                  // navigation.goBack()
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
  },
  HamburgerIcon: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    alignSelf: "center",
    tintColor: colors.TOGGLEBLUE,
    marginTop: responsiveScreenWidth(0),
  },
  ProfileIcon: {
    height: responsiveScreenWidth(7),
    width: responsiveScreenWidth(7),
    alignSelf: "center",
    marginTop: responsiveScreenWidth(1),
  },
  modalIcon: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    alignSelf: "center",
    marginTop: responsiveScreenWidth(1),
    marginStart: responsiveScreenWidth(4),
    tintColor: colors.blue,
  },
  headerstyle: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenWidth(16),
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    backgroundColor: colors.WHITE,
    paddingStart: responsiveScreenWidth(6),
    paddingEnd: responsiveScreenWidth(6),
  },
  mainView: {
    width: responsiveScreenWidth(99.5),
    height: "100%",
    backgroundColor: "#0737f720",
  },
  shadowcard: {
    width: "80%",
    backgroundColor: colors.white,
    height: responsiveScreenWidth(25),
    borderRadius: responsiveScreenWidth(2),
    alignSelf: "center",
    margin: responsiveScreenWidth(5),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowView: {
    alignSelf: "center",
    margin: responsiveScreenWidth(5),
  },
  blueIcon: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    alignSelf: "center",
    tintColor: colors.DrawerTextBLUE,
    marginTop: responsiveScreenWidth(2),
  },
  blueIcon1: {
    height: responsiveScreenWidth(6),
    width: responsiveScreenWidth(6),
    alignSelf: "center",
    tintColor: colors.white,
    marginStart:responsiveScreenWidth(2),
    marginEnd:responsiveScreenWidth(2)
  },
  titleText: {
    fontWeight: "bold",
    fontSize: responsiveScreenFontSize(1.8),
    color: colors.blue,
  },
  modalText: {
    fontWeight: "500",
    fontSize: responsiveScreenFontSize(1.6),
    marginTop: responsiveScreenWidth(1),
    marginStart: responsiveScreenWidth(2),
    color: colors.BLACK,
    alignSelf: "center",
    textAlign: "center",
  },
  ansText: {
    fontWeight: "bold",
    fontSize: responsiveScreenFontSize(2.2),
    color: colors.gray_dark,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: responsiveScreenFontSize(3),
    color: colors.gray_dark,
    marginStart: responsiveScreenWidth(8),
    marginTop: responsiveScreenWidth(5),
  },
  heightView: {
    backgroundColor: colors.blue,
    height: responsiveScreenWidth(25),
    borderTopStartRadius: responsiveScreenWidth(2),
    borderBottomStartRadius: responsiveScreenWidth(2),
    width: responsiveScreenWidth(2),
  },
  modalView: {
    width: "50%",
    height: responsiveScreenWidth(20),
    borderRadius: responsiveScreenWidth(2),
    padding: responsiveScreenWidth(4),
    justifyContent: "center",
    alignSelf: "center",
    marginStart: responsiveScreenWidth(35),
    backgroundColor: colors.white,
    marginTop: responsiveScreenWidth(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  modalline: {
    width: "100%",
    height: responsiveScreenWidth(0.12),
    backgroundColor: colors.gray,
    alignSelf: "center",
    margin: responsiveScreenWidth(2),
  },
  linestyle: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: colors.blue,
    height: responsiveScreenWidth(0.2),
    margin: responsiveScreenWidth(2),
  },
  noData: {
    height: responsiveScreenWidth(20),
    width: responsiveScreenWidth(20),
    justifyContent: "center",
    alignSelf: "center",
    margin: responsiveScreenWidth(4),
    marginTop: responsiveScreenWidth(40),
    tintColor: colors.primary,
  },
  paginatonTxt: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
  HamburgerIcon: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    alignSelf: "center",
    tintColor: colors.TOGGLEBLUE,
    marginTop: responsiveScreenWidth(0),
  },
  ProfileIcon: {
    height: responsiveScreenWidth(7),
    width: responsiveScreenWidth(7),
    alignSelf: "center",
    marginTop: responsiveScreenWidth(1),
  },
  headerstyle: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenWidth(16),
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    backgroundColor: colors.WHITE,
    paddingStart: responsiveScreenWidth(6),
    paddingEnd: responsiveScreenWidth(6),
  },
  modalView: {
    width: "50%",
    height: responsiveScreenWidth(23),
    borderRadius: responsiveScreenWidth(2),
    padding: responsiveScreenWidth(4),
    alignSelf: "center",
    marginStart: responsiveScreenWidth(35),
    backgroundColor: colors.white,
    marginTop: responsiveScreenWidth(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  modalline: {
    width: "100%",
    height: responsiveScreenWidth(0.12),
    backgroundColor: colors.gray,
    alignSelf: "center",
    margin: responsiveScreenWidth(2),
  },
  linestyle: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: colors.blue,
    height: responsiveScreenWidth(0.2),
    margin: responsiveScreenWidth(2),
  },
  modaltextStyle: {
    textAlign: "left",
    fontWeight: "bold",
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(2),
    marginTop: 0,
  },

  modalView1: {
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
  ProfileIcon1: {
    height: responsiveScreenWidth(20),
    width: responsiveScreenWidth(20),
    justifyContent: "center",
    alignSelf: "center",
  },
  modaltextStyle1: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    marginTop: responsiveScreenWidth(8),
    fontWeight: "bold",
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
  },
  loginBtn: {
    width: responsiveScreenWidth(40),
    alignSelf: "flex-end",
    borderRadius: responsiveScreenWidth(1),
    height: responsiveScreenWidth(12),
    backgroundColor: colors.BLUETEXT,
    marginTop: responsiveScreenWidth(5),
    flexDirection:"row"
  },
  loginText: {
    fontSize: responsiveScreenFontSize(2.5),
    color: colors.BLACK,
    alignSelf: "center",
    fontWeight: "bold",
    width: "90%",
  },
});

export default DashboardScreen;
