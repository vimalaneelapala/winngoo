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
  ActivityIndicator,
  FlatList,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Custom ======================================================================================
import colors from "../../../res/colors/colors";
import images from "../../../res/imageConstant/images";
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "../../../utils/Size";
import strings from "../../../res/strings/strings";
import TopHeaderView from "../../../component/HeaderAdd";
import ButtonText from "../../../component/ButtonText";
import ButtonImage from "../../../component/ButtonImage";
import { BaseURL, EndPoint } from "../../../api/ApiConstant";
import { DrawerActions } from "@react-navigation/native";

const BusinessTaglineScreen = ({ navigation }) => {
  const [loadMore, setloadMore] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [taglineData, settaglineData] = useState([]);
  // UseEffect ======================================================================================
  useEffect(async () => {
    taglineDataApiCall();
  }, [taglineDataApiCall]);
  // ==========================================Api Call================
  const taglineDataApiCall = async () => {
    let token = await AsyncStorage.getItem("token");
    setIsLoading(true);
    console.log("!");
    var formdata = new FormData();
    formdata.append("perPage", pageSize);
    formdata.append("page", page);
    formdata.append("order", "DESC");
    console.log("!2");
    
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("x-access-token", token);
    console.log("!23");
    
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    console.log("!235");

    fetch(BaseURL + EndPoint.MERCHENTTAGLINELIST, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(JSON.stringify(result));
        setIsLoading(false);
        // setrewardSummary(result.result);
        result?.data===""?settaglineData([]):settaglineData(result.errors.business_tagline)
        console.log(JSON.stringify(result.result));
      })
      .catch((err) => {
        setIsLoading(false);
        // alert(err);
        console.log(JSON.stringify(err));
      });
  };
  //  Function ======================================================================================
  const deleteTaglineApi = async (taglineId) => {
    let token = await AsyncStorage.getItem("token");
    setIsLoading(true);
    var config = {
      method: "put",
      url: BaseURL + EndPoint.MERCHENTTAGLINE + taglineId,
      headers: {
        "x-access-token": token,
        "Content-Type": "multipart/form-data",
      },
    };
    await axios(config)
      .then(async (res) => {
        setIsLoading(false);
        console.log(JSON.stringify(res));
        alert("Tagline deleted successfully");
        navigation.goBack();
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
              <Text style={styles.headerText}>Tagline:</Text>
              <Text style={styles.anwserText}>{item.name}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.headerText}>Status:</Text>
              <Text style={styles.anwserText1}>{item.status}</Text>
            </View>
          </View>
          <View style={{ width: "20%", justifyContent: "center" }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditTaglineScreen");
                }}
              >
                <Image
                  style={{ height: 20, width: 20, tintColor: colors.green }}
                  source={images.EditIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  deleteTaglineApi(item.id);
                }}
              >
                <Image
                  style={{ height: 20, width: 20, tintColor: colors.red }}
                  source={images.DeleteIcon}
                />
              </TouchableOpacity>
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
        headerText={strings.BusinessTagline}
        onPress1={() => {
          navigation.navigate("AddTaglineScreen");
        }}
      />
      <Spinner visible={isloading} />
      {taglineData.length > 0 ? (
        <View
          style={{
            height: responsiveScreenWidth(100),
            width: responsiveScreenWidth(100),
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Image
            source={images.noData}
            resizeMode="contain"
            style={styles.noData}
          />
          <Text
            style={[
              styles.paginatonTxt,
              { fontSize: responsiveScreenFontSize(2.4) },
            ]}
          >
            {"No Data Found"}
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={taglineData}
            renderItem={renderItemView}
            pagingEnabled={true}
            style={{
              width: "80%",
              alignSelf: "center",
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              padding: responsiveScreenWidth(1),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (page > 1) {
                  var pageTemp = Number(page) - Number(1);
                  setPage(pageTemp);
                  var pageSizeTemp = Number(pageSize) - Number(10);
                  setPageSize(pageSizeTemp);
                  setIsLoading(true);
                  taglineDataApiCall();
                }
              }}
            >
              <Image
                source={images.leftArrow}
                resizeMode="contain"
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <Text style={styles.paginatonTxt}>
              {page}/{pageSize}
            </Text>
            <TouchableOpacity
              onPress={() => {
                var pageTemp = Number(page) + Number(1);
                setPage(pageTemp);
                var pageSizeTemp = Number(pageSize) + Number(10);
                setPageSize(pageSizeTemp);
                setIsLoading(true);
                taglineDataApiCall();
              }}
            >
              <Image
                source={images.rightarrow}
                resizeMode="contain"
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#800000",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  noData: {
    height: responsiveScreenWidth(35),
    width: responsiveScreenWidth(35),
    justifyContent: "center",
    alignSelf: "center",
    margin: responsiveScreenWidth(4),
    marginTop: responsiveScreenWidth(40),
  },
  paginatonTxt: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    alignSelf: "center",
    fontWeight: "bold",
  },
  socialIcon: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    justifyContent: "center",
    alignSelf: "center",
    margin: responsiveScreenWidth(4),
  },
});

export default BusinessTaglineScreen;
