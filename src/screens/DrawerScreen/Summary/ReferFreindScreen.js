import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerActions } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
// Custom ======================================================================================
import TopHeaderView from "../../../component/Header";
import colors from "../../../res/colors/colors";
import images from "../../../res/imageConstant/images";
import strings from "../../../res/strings/strings";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "../../../utils/Size";
import { BaseURL, EndPoint } from "../../../api/ApiConstant";

const shareOptions = {
  title: "Title",
  message: "Message to share", // Note that according to the documentation at least one of "message" or "url" fields is required
  url: "www.example.com",
  subject: "Subject",
};
const ReferFreindScreen = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  // ==========================================useEffect Call================
  // useEffect(async () => {
  //   getReferFreindCall();
  // }, [getReferFreindCall]);
  // ==========================================Api Call================
  const getReferFreindCall = async () => {
    let token = await AsyncStorage.getItem("token");
    setIsVisible(true);
    var config = {
      method: "post",
      url: BaseURL + EndPoint.REFERFREIND,
      headers: {
        "x-access-token": token,
      },
    };
    await axios(config)
      .then(async (res) => {
        setIsVisible(false);
        console.log(JSON.stringify(res.data.result));
      })
      .catch((err) => {
        setIsVisible(false);
        console.log(JSON.stringify(err));
      });
  };
  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <TopHeaderView
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        headerText={strings.ReferFriends}
      />
      <View style={styles.container}>
        <Spinner visible={isVisible} />
        <View
          style={[
            styles.shadowView,
            { backgroundColor: colors.cyan, alignItems: "center" },
          ]}
        >
          <Text style={styles.whiteSmallBoldText}>{strings.text1}</Text>
          <Text style={styles.whiteSmallBoldText}>{strings.text2}</Text>
        </View>
        <View style={[styles.shadowView, { alignItems: "center" }]}>
          <Text style={styles.blackSmallBoldText}>{strings.text3}</Text>
          <Text
            style={[
              styles.blackSmallText,
              { marginTop: responsiveScreenWidth(3) },
            ]}
          >
            {strings.text4}
          </Text>
        </View>
        <View style={styles.shadowView}>
          <TouchableOpacity
            onPress={() => {
              Share.share(shareOptions);
            }}
          >
            <View>
              <Image style={styles.imageStyle} source={images.GmailIcon} />
              <Text style={styles.blackSmallText}>{strings.inviteGmail}</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.blackSmallText}>{strings.OR}</Text>
          <View style={styles.logoView}>
            <TouchableOpacity
              onPress={() => {
                Share.share(shareOptions);
              }}
            >
              <Image style={styles.imageStyle} source={images.TwitterIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Share.share(shareOptions);
              }}
            >
              <Image style={styles.imageStyle} source={images.FacebookIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Share.share(shareOptions);
              }}
            >
              <Image style={styles.imageStyle} source={images.WhatsAppIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.blackSmallText}>{strings.OR}</Text>

          <TouchableOpacity
            onPress={() => {
              Share.share(shareOptions);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: responsiveScreenWidth(5),
              }}
            >
              <Text style={styles.linkViewText}>{global.refferalCode}</Text>
              <Text style={styles.copyViewText}>{strings.CopyLink}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  shadowView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: colors.white,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    padding: responsiveScreenWidth(4),
    marginTop: responsiveScreenWidth(5),
    borderRadius: responsiveScreenWidth(2),
  },
  rowView: {
    flexDirection: "row",
    margin: responsiveScreenWidth(1),
    width: "80%",
  },
  blackSmallText: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: "500",
    marginTop: responsiveScreenWidth(5),
    alignSelf: "center",
  },
  blackSmallBoldText: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.9),
    fontWeight: "700",
    textAlign: "center",
  },
  whiteSmallBoldText: {
    textAlign: "center",
    color: colors.white,
    fontSize: responsiveScreenFontSize(2),
    fontWeight: "700",
  },
  linkViewText: {
    textAlign: "center",
    color: colors.white,
    fontSize: responsiveScreenFontSize(2),
    fontWeight: "700",
    backgroundColor: colors.gray,
    width: "65%",
    borderRadius: responsiveScreenWidth(1),
    height: responsiveScreenWidth(8),
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: responsiveScreenWidth(1),
  },
  copyViewText: {
    textAlign: "center",
    paddingTop: responsiveScreenWidth(1),
    color: colors.cyan,
    fontSize: responsiveScreenFontSize(2),
    fontWeight: "700",
    borderColor: colors.cyan,
    borderWidth: responsiveScreenWidth(0.2),
    width: "30%",
    borderRadius: responsiveScreenWidth(1),
    height: responsiveScreenWidth(8),
    justifyContent: "center",
    alignSelf: "center",
  },
  imageStyle: {
    height: responsiveScreenWidth(7),
    width: responsiveScreenWidth(7),
    alignSelf: "center",
  },
  logoView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: responsiveScreenWidth(5),
  },
});

export default ReferFreindScreen;
