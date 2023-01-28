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
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
// Custom ======================================================================================
import colors from "../../res/colors/colors";
import images from "../../res/imageConstant/images";
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "../../utils/Size";
import strings from "../../res/strings/strings";
import TopHeaderView from "../../component/Header";
import ButtonText from "../../component/ButtonText";
import ButtonImage from "../../component/ButtonImage";

const CardDetailScreen = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDetail, setIsDetail] = useState(false);

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
        {isDetail ? (
          <View style={styles.personalView}>
            <View style={styles.rowView}>
              <Text style={styles.blackSmallText}>Card Holder Name:</Text>
              <Text style={styles.blackSmallText}>Dhruvika Chauhan</Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.blackSmallText}>Card Number:</Text>
              <Text style={styles.blackSmallText}>123456781234</Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.blackSmallText}>Issue Date:</Text>
              <Text style={styles.blackSmallText}>2023/01/04</Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.blackSmallText}>Expirt Date:</Text>
              <Text style={styles.blackSmallText}>2026/01/04</Text>
            </View>
          </View>
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
