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
  const [isLoading, setIsLoading] = useState(true);
  const [discountContribute, setdiscountContribute] = useState(0);
  const [pendingRefferalEarning, setpendingRefferalEarning] = useState(0);
  const [refferalEarning, setrefferalEarning] = useState(0);
  const [refferalCode, setrefferalCode] = useState(0);
  const [discountPointEarned, setdiscountPointEarned] = useState(0);
  const [loginType, setloginType] = useState("");
  // UseEffect=================================================================================
  // ==========================================Api Call================
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setisConnected(state.isConnected);
      console.log(state.isConnected)
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
        console.log(JSON.stringify(res.data.result));
        setdiscountContribute(res.data.result.discount);
        setdiscountPointEarned(res.data.result.received_discount_points);
        setpendingRefferalEarning(res.data.result.pending_referral_earning);
        setrefferalCode(res.data.result.winngoo_user.referral_code);
        setrefferalEarning(res.data.result.referral_earning);
        global.refferalCode = res.data.result.winngoo_user.referral_code;
        global.image=res.data.result.image!=null?res.data.result.image:null
      })
      .catch((err) => {
        setIsLoading(false);
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
          <TopHeaderView
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}
          />
          <Spinner visible={isLoading} />
          {isConnected ||isConnected===undefined?
          <View>
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
          </View>:
          <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
             <View style={{
            height: responsiveScreenWidth(100),
            width: responsiveScreenWidth(100),
            justifyContent: "center",
            alignSelf: "center",
          }}>
            <Image
              source={images.wifi}
              resizeMode="contain"
              style={styles.noData}
            />
            <Text style={[styles.paginatonTxt, { fontSize: responsiveScreenFontSize(2.4) }]}>{"No Internet Connection\nPlease try again."}</Text>
          </View>
        </View>}
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
    marginStart: responsiveScreenWidth(12),
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
    height: responsiveScreenWidth(35),
    width: responsiveScreenWidth(35),
    justifyContent: 'center',
    alignSelf: 'center',
    margin: responsiveScreenWidth(4),
    marginTop: responsiveScreenWidth(40),
    tintColor:colors.primary
  },
  paginatonTxt: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold"
  },
});

export default DashboardScreen;
