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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import { DrawerActions } from "@react-navigation/native";
// Custom ======================================================================================
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "../../../utils/Size";
import TopHeaderView from "../../../component/Header";
import colors from "../../../res/colors/colors";
import images from "../../../res/imageConstant/images";
import strings from "../../../res/strings/strings";
import { BaseURL, EndPoint } from "../../../api/ApiConstant";
import WebView from "react-native-webview";

const AboutUsScreen = ({ navigation }) => {
  const scripts = `
  document.body.style.fontSize = '25px';
  document.querySelector("h1").style.color = 'skyblue';
  document.querySelector("p").style.padding = '25px';
  document.querySelector("p").style.fontSize = '25px';
  true;
`;
  const [isVisible, setIsVisible] = useState(false);
  const [webViewData, setWebViewData] = useState("");
  // UseEffect ======================================================================================
  useEffect(async () => {
    getAboutUsApiCall();
  }, [getAboutUsApiCall]);
  // ==========================================Api Call================
  const getAboutUsApiCall = async () => {
    setIsVisible(true);

    var config = {
      method: "get",
      url: BaseURL + EndPoint.ABOUT,
    };
    await axios(config)
      .then(async (res) => {
        setIsVisible(false);
        console.log(JSON.stringify(res.data.result));
        setWebViewData(res.data.result.content);
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
        headerText={"About Us"}
      />
      <View style={styles.container}>
        <Spinner visible={isVisible} />
          {webViewData === "" ? (
        <View style={styles.shadowView}>
            <Text style={styles.blackSmallText}>
              {"WinngooApp Re Launch soon."}
            </Text>
        </View>
          ) : (
            <WebView
            style={{height:"80%",width:"100%",alignItems:"center"}}
            source={{html:webViewData}}
            injectedJavaScript={scripts}
            onLoadStart={() => setIsVisible(true)}
            onLoad={() => setIsVisible(false)}
          />
          )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
  blackSmallText: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: "500",
    alignSelf: "center",
  },
});

export default AboutUsScreen;