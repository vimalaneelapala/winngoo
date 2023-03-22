import React, { useEffect,useState } from "react";
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

const BusinessInformationScreen = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
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
        console.log(JSON.stringify(res.data.result));
        setData(res.data.result)
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
        headerText={strings.BusinessInformation}
      />
       <Spinner visible={isVisible} />
      <View style={styles.container}>
        <View style={styles.shadowView}>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.BusinessType}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"Textile Industry"}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.TradingName}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"K"}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>
              {strings.BusinessRelationship}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"K"}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>
              {strings.BusinessDescription}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"K"}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.YearsTrading}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"K"}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.OwnerName}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"K"}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>
              {strings.RegistrationNumber}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"K"}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Franchise}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"K"}
            </Text>
          </View>
        </View>
        <View style={styles.shadowView}>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Name}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"K"}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Email}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"K"}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.PhoneNumber}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"K"}
            </Text>
          </View>
        </View>
        <View style={styles.shadowView}>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Address}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"K"}
            </Text>
          </View>
        </View>
        <View style={styles.shadowView}>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.StartDate}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"K"}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.ExpireDate}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"K"}
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

export default BusinessInformationScreen;
