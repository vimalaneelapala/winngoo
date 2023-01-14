import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  NativeModules,
  StyleSheet,
  Modal,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import colors from "../res/colors/colors";
import { responsiveScreenFontSize, responsiveScreenWidth } from "../utils/Size";
import images from "../res/imageConstant/images";

const CustomDrawer = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView>
          <Image source={images.ProfileIcon} style={styles.ProfileIcon} />
          <View style={styles.line} />
          <Text style={styles.titletextStyle}>Dhruvika Chauhan</Text>
          <View style={styles.line} />
          <Text style={styles.textStyle}>Profile</Text>
          <Image source={images.ProfileIconD} style={styles.blueIcon} />
          <Text
            onPress={() => {
              setIsVisible(true);
            }}
            style={styles.titletextStyle}
          >
            Profile Detail
          </Text>
          <View style={styles.line} />
          <Text style={styles.textStyle}>Summary</Text>
          <Image source={images.ProfileIconD} style={styles.blueIcon} />
          <Text style={styles.titletextStyle}>Profile Detail</Text>
          <Image source={images.MultipleUserIcon} style={styles.blueIcon} />
          <Text style={styles.titletextStyle}>Refer Friends</Text>
          <Image source={images.DollarIcon} style={styles.blueIcon} />
          <Text style={styles.titletextStyle}>Reward Summary</Text>
          <Image source={images.CreditCardIcon} style={styles.blueIcon} />
          <Text style={styles.titletextStyle}>Transaction History</Text>
          <Image source={images.ProfileIconD} style={styles.blueIcon} />
          <Text style={styles.titletextStyle}>Cashback History</Text>
          <Image source={images.MemberCardIcon} style={styles.blueIcon} />
          <Text style={styles.titletextStyle}>Member News</Text>
          <Image source={images.TagIcon} style={styles.blueIcon} />
          <Text style={styles.titletextStyle}>Newsletter</Text>
          <Image source={images.NewsPaerIcon} style={styles.blueIcon} />
          <Text style={styles.titletextStyle}>News</Text>
        </ScrollView>
        <Modal transparent={true} visible={isVisible} animationType="slide">
          <View style={styles.modalView}>
            <Text
              onPress={() => {
                setIsVisible(false);
                navigation.navigate("PersonalInfoScreen")
              }}
              style={styles.modaltextStyle}
            >
              Personal Information
            </Text>
            <View style={styles.modalline} />
            <Text
              onPress={() => {
                setIsVisible(false);
              }}
              style={styles.modaltextStyle}
            >
              Winngoo Card Detail
            </Text>
            <View style={styles.modalline} />
            <Text
              onPress={() => {
                setIsVisible(false);
                navigation.navigate("ChangePasswordScreen")
              }}
              style={styles.modaltextStyle}
            >
              Change Password
            </Text>
            <View style={styles.modalline} />
            <Text
              onPress={() => {
                navigation.navigate("CardDetailScreen")
                setIsVisible(false);
              }}
              style={styles.modaltextStyle}
            >
              Bank Detail
            </Text>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.DrawerBLUE,
  },
  ProfileIcon: {
    height: responsiveScreenWidth(50),
    width: responsiveScreenWidth(50),
    alignSelf: "center",
  },
  blueIcon: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    alignSelf: "center",
    tintColor: colors.DrawerTextBLUE,
    marginTop: responsiveScreenWidth(4),
  },
  line: {
    width: "90%",
    height: responsiveScreenWidth(0.12),
    backgroundColor: colors.white,
    alignSelf: "center",
    margin: responsiveScreenWidth(2),
  },
  modalline: {
    width: "90%",
    height: responsiveScreenWidth(0.12),
    backgroundColor: colors.DrawerBLUE,
    alignSelf: "center",
    margin: responsiveScreenWidth(2),
  },
  titletextStyle: {
    fontSize: responsiveScreenFontSize(1.6),
    color: colors.white,
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    width: "50%",
  },
  modaltextStyle: {
    fontSize: responsiveScreenFontSize(1.6),
    color: colors.BLACK,
    alignSelf: "center",
    fontWeight: "bold",
    width: "80%",
  },
  textStyle: {
    fontSize: responsiveScreenFontSize(1.5),
    color: colors.DrawerTextBLUE,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: responsiveScreenWidth(2),
  },
  rowView1: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    padding: responsiveScreenWidth(4),
  },
  rowView: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    padding: responsiveScreenWidth(2),
  },
  modalView: {
    backgroundColor: colors.white,
    padding: responsiveScreenWidth(2),
    width: "50%",
    height: "25%",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: responsiveScreenWidth(70),
    marginStart: responsiveScreenWidth(30),
    borderRadius: responsiveScreenWidth(2),
  },
});
export default CustomDrawer;
