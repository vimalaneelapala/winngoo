import React, { useEffect } from "react";
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

const BusinessDetailScreen = ({ navigation }) => {
  // UseEffect ======================================================================================

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
        <View style={styles.shadowView}>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Category}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"Textile Industry"}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.SubCategory}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"Textile Industry"}
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
              {"Textile Industry"}
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
              {"Textile Industry"}
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
              {"Textile Industry"}
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
              {"12:00 - 7:00"}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Tuesday}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"12:00 - 7:00"}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Wednesday}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"12:00 - 7:00"}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Thursday}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"12:00 - 7:00"}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Friday}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"12:00 - 7:00"}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Saturday}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"12:00 - 7:00"}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackSmallBoldText}>{strings.Sunday}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.blackSmallText}
            >
              {"12:00 - 7:00"}
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
