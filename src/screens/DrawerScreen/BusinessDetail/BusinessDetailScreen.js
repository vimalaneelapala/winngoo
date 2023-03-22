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
import { DrawerActions } from "@react-navigation/native";
import { BaseURL, EndPoint } from "../../../api/ApiConstant";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BusinessDetailScreen = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTimeDetail, setIsTimeDetail] = useState([]);
  const [data, setData] = useState([]);
  // ==========================================useEffect Call================
  useEffect(async () => {
    getBusinessDetail();
  }, [getBusinessDetail]);
  // ==========================================Api Call================
  const getBusinessDetail = async () => {
    let token = await AsyncStorage.getItem("token");
    setIsVisible(true);
    var config = {
      method: "get",
      url: BaseURL + EndPoint.MERCHENTBUSINESSDETAIL,
      headers: {
        "x-access-token": token,
      },
    };
    await axios(config)
      .then(async (res) => {
        setIsVisible(false);
        setData(res.data.result)
        setIsTimeDetail(res.data.result.business_hours)
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
        headerText={strings.BusinessDetails}
      />
      <View style={styles.container}>
        <Spinner visible={isVisible} />
        <View style={styles.shadowView}>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Category}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {data?.category}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.SubCategory}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {data?.sub_category}
            </Text>
          </View>
        </View>
        <View style={styles.shadowView}>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.RewardValue}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {data?.reward_value}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>
              {strings.RewardDetail}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {data?.reward_detail}
            </Text>
          </View>
        </View>
        <View style={styles.shadowView}>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>
              {strings.TermsCondition}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {data?.terms_and_condition}
            </Text>
          </View>
        </View>
        <View style={styles.shadowView}>
          <Text style={styles.blackSmallBoldText}>
            {strings.Timing}
          </Text>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Monday}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {isTimeDetail[0]?.opening_time + " - " + isTimeDetail[0]?.closing_time}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Tuesday}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {isTimeDetail[1]?.opening_time + "-" + isTimeDetail[1]?.closing_time}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Wednesday}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {isTimeDetail[2]?.opening_time + "-" + isTimeDetail[2]?.closing_time}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Thursday}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {isTimeDetail[3]?.opening_time + "-" + isTimeDetail[3]?.closing_time}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Friday}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {isTimeDetail[4]?.opening_time + "-" + isTimeDetail[4]?.closing_time}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Saturday}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {isTimeDetail[5]?.opening_time + "-" + isTimeDetail[5]?.closing_time}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Sunday}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {isTimeDetail[6]?.opening_time + "-" + isTimeDetail[6]?.closing_time}
            </Text>
          </View>
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
    fontWeight: "400",
  },
  blackSmallBoldText: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.9),
    fontWeight: "700",
  },
});

export default BusinessDetailScreen;
