import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
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

const CardDetailScreen = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [data, setData] = useState([]);
  // ==========================================useEffect Call================
  useEffect(async () => {
    getBankDetail();
  }, [getBankDetail]);
  // ==========================================Api Call================
  const getBankDetail = async () => {
    let token = await AsyncStorage.getItem("token");
    setIsVisible(true);
    var config = {
      method: "get",
      url: BaseURL + EndPoint.BANKDETAIL,
      headers: {
        "x-access-token": token,
      },
    };
    console.log("DD:",config);
    await axios(config)
      .then(async (res) => {
        setIsVisible(false);
        console.log(JSON.stringify(res.data.result));
        setData(res.data.result);
        setIsDetail(true);
      })
      .catch((err) => {
        setIsVisible(false);
        console.log(JSON.stringify(err));
      });
  };
  // ==========================================Api Call================
  const bankDetail = () => {
    return (
      <View style={styles.personalView}>
        <View style={styles.rowView}>
          <Text style={styles.blackSmallText}>Card Holder Name:</Text>
          <Text style={styles.blackSmallText}>{data?.account_holder_name}</Text>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.blackSmallText}>Card Number:</Text>
          <Text style={styles.blackSmallText}>{data?.account_number}</Text>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.blackSmallText}>Bank Name:</Text>
          <Text style={styles.blackSmallText}>{data?.bank_name}</Text>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.blackSmallText}>Expirt Date:</Text>
          <Text style={styles.blackSmallText}>{data?.sort_code}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <View style={styles.container}>
        <TopHeaderView
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
          headerText={strings.CardDetail}
        />
        <Spinner visible={isVisible} />
        <ButtonImage
          onPress={() => {
            navigation.navigate("AddBankDetailScreen");
          }}
          text={strings.AddCardDetail}
          loginBtn={{
            alignSelf: "flex-end",
            marginEnd: responsiveScreenWidth(5),
            marginTop: responsiveScreenWidth(5),
            width: "42%",
          }}
        />
        {/* // <FlatList data={data} renderItem={renderItem} /> */}
        {isDetail ? (
          <View>{bankDetail()}</View>
        ) : (
          <View style={styles.personalView}>
            <View style={styles.rowView}>
              <Text style={styles.blackSmallText}>No Data Found</Text>
            </View>
          </View>
        )}
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
  headerText: {
    fontSize: responsiveScreenFontSize(2.5),
    color: colors.BLACK,
    fontWeight: "600",
    marginStart: responsiveScreenWidth(14),
    marginTop: responsiveScreenWidth(5),
    marginBottom: responsiveScreenWidth(5),
  },
  personalView: {
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
    marginBottom: responsiveScreenWidth(5),
  },
  rowView: {
    flexDirection: "row",
    margin: responsiveScreenWidth(1),
  },
  blackSmallText: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: "500",
  },
});

export default CardDetailScreen;
