import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image
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
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from "../../../utils/Size";
import { BaseURL, EndPoint } from "../../../api/ApiConstant";

const RewardSummaryScreen = ({ navigation }) => {
  const [rewardSummary, setrewardSummary] = useState([0]);
  const [loadMore, setloadMore] = useState(false)
  const [isloading, setIsLoading] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)

  // UseEffect ======================================================================================
  // UseEffect ======================================================================================
  useEffect(async () => {
    refferalTransactionApiCall();
  }, [refferalTransactionApiCall]);
  // ==========================================Api Call================
  const refferalTransactionApiCall = async () => {
    let token = await AsyncStorage.getItem("token");
    setIsLoading(true);
    var data = {
      "perPage": pageSize,
      "page": page,
      // "order": "DESC",
    };
    var config = {
      method: "post",
      url: BaseURL + EndPoint.REFERRALTRANSACTION,
      headers: {
        "x-access-token": token,
      },
      data: data
    };
    await axios(config)
      .then(async (res) => {
        setIsLoading(false);
        console.log(JSON.stringify(res.data.result));
        console.log(JSON.stringify(res.data.result.data));
        res.data.result.data.length>0?
        setrewardSummary(res.data.result.data)
        :null
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(JSON.stringify(err));
      });
  };
  // Render Function ======================================================================================
  const renderItemView = ({ item, index }) => {
    return (
      <View
        style={{
          padding: responsiveScreenWidth(3),
          borderColor: colors.gray,
          borderWidth: 0.5,
          marginTop: responsiveScreenWidth(3),
          borderRadius: responsiveScreenWidth(1),
        }}
      >
        <View style={{ flexDirection: "row", width: "100%" }}>
          <View style={{ width: "80%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.headerText, { width: responsiveScreenWidth(30), }]}>Refferal Name:</Text>
              <Text style={styles.anwserText}>{item.name}</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <View style={{ width: "100%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.headerText}>Amount:</Text>
              <Text style={styles.anwserText}>{item.amount}</Text>
            </View>
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", width: "50%" }}>
                <Text style={[styles.headerText, {
                  width: responsiveScreenWidth(15),
                }]}>Status:</Text>
                <Text style={styles.anwserText1}>{item.status}</Text>
              </View>
              <View style={{ flexDirection: "row", width: "50%", marginStart: responsiveScreenWidth(4) }}>
                <Text style={[styles.headerText, {
                  width: responsiveScreenWidth(12),
                }]}>Date:</Text>
                <Text style={[styles.anwserText1, {
                  width: responsiveScreenWidth(20),
                }]}>{item.date}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <TopHeaderView
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        headerText={strings.ReferSummary}
      />
      <Spinner visible={isloading} />
      <View>
        {rewardSummary.length > 0 ?
          <View style={{
            height: responsiveScreenWidth(100),
            width: responsiveScreenWidth(100),
            justifyContent: "center",
            alignSelf: "center",
          }}>
            <Image
              source={images.noData}
              resizeMode="contain"
              style={styles.noData}
            />
            <Text style={[styles.paginatonTxt, { fontSize: responsiveScreenFontSize(2.4) }]}>{"No Data Found"}</Text>
          </View>
          : <View style={styles.container}>
            <FlatList
              data={rewardSummary}
              renderItem={renderItemView}
              pagingEnabled={true}
              style={{
                width: "80%",
                alignSelf: "center",
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index}
            />
            <View style={{ flexDirection: "row", justifyContent: "center", padding: responsiveScreenWidth(1) }}>
              <TouchableOpacity
                onPress={() => {
                  if (page > 1) {
                    var pageTemp = Number(page) - Number(1)
                    setPage(pageTemp)
                    var pageSizeTemp = Number(pageSize) - Number(10)
                    setPageSize(pageSizeTemp)
                    setIsLoading(true)
                    refferalTransactionApiCall()
                  }
                }}>
                <Image
                  source={images.leftArrow}
                  resizeMode="contain"
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
              <Text style={styles.paginatonTxt}>{page}/{pageSize}</Text>
              <TouchableOpacity
                onPress={() => {
                  var pageTemp = Number(page) + Number(1)
                  setPage(pageTemp)
                  var pageSizeTemp = Number(pageSize) + Number(10)
                  setPageSize(pageSizeTemp)
                  setIsLoading(true)
                  refferalTransactionApiCall()
                }}>
                <Image
                  source={images.rightarrow}
                  resizeMode="contain"
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
            </View>
          </View>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  headerText: {
    color: colors.gray_dark,
    fontSize: responsiveScreenFontSize(2),
    fontWeight: "bold",
    alignSelf: "center",
    width: responsiveScreenWidth(18),
  },
  anwserText: {
    color: colors.gray_dark,
    fontSize: responsiveScreenFontSize(1.8),
    alignSelf: "center",
    marginTop: responsiveScreenWidth(0.5),
  },
  anwserText1: {
    color: colors.WHITE,
    fontWeight: "bold",
    fontSize: responsiveScreenFontSize(1.8),
    alignSelf: "center",
    backgroundColor: colors.yellow,
    width: responsiveScreenWidth(18),
    borderRadius: responsiveScreenWidth(2),
    paddingStart: responsiveScreenWidth(2),
    marginTop: responsiveScreenWidth(0.5),
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  noData: {
    height: responsiveScreenWidth(35),
    width: responsiveScreenWidth(35),
    justifyContent: 'center',
    alignSelf: 'center',
    margin: responsiveScreenWidth(4),
    marginTop: responsiveScreenWidth(40)
  },
  socialIcon: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    justifyContent: 'center',
    alignSelf: 'center',
    margin: responsiveScreenWidth(4),
  },
  paginatonTxt: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    alignSelf: "center",
    fontWeight: "bold"
  },
});

export default RewardSummaryScreen;
