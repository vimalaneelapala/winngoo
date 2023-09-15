import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = ({ navigation }) => {
  const [profileModal, setProfileModal] = useState(false);
  const [businessModal, setBusinessModal] = useState(false);
  const [loginType, setloginType] = useState(global.loginTypeTemp);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView>
          <View style={{ flexDirection: "row", padding: responsiveScreenWidth(2) }}>
            <Image source={images.ProfileIcon} style={styles.ProfileIcon} />
            <Text style={styles.titletextStyle1}>Dhruvika Chauhan</Text>
          </View>
          <View style={styles.line} />
          <TouchableOpacity onPress={() => {
            navigation.navigate("DashboardScreen");
          }} style={{ flexDirection: "row", }}>
            <Image source={images.LogoIcon} style={styles.blueIcon} />
            <Text style={styles.titletextStyle}>
             Dashboard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setProfileModal(true);
          }} style={{ flexDirection: "row", }}>
            <Image source={images.ProfileIconD} style={styles.blueIcon} />
            <Text style={styles.titletextStyle}>
              Profile Detail
            </Text>
          </TouchableOpacity>
          {global.loginTypeTemp === "member" ? null :
            <View>
              <TouchableOpacity
                onPress={() => {
                  setBusinessModal(true);
                }}
                style={{ flexDirection: "row" }}
              >
                <Image source={images.ProfileIconD} style={styles.blueIcon} />
                <Text style={styles.titletextStyle}>Business Detail</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("FranchiseScreen")
                }}
                style={{ flexDirection: "row", }}
              >
                <Image source={images.ProfileIconD} style={styles.blueIcon} />
                <Text style={styles.titletextStyle}>Franchise</Text>
              </TouchableOpacity>
            </View>}
          <View style={styles.line} />
          <TouchableOpacity onPress={() => {
            navigation.navigate("ReferFreindScreen");
          }} style={{ flexDirection: "row", }}>
            <Image source={images.MultipleUserIcon} style={styles.blueIcon} />
            <Text

              style={styles.titletextStyle}
            >
              Refer Friends
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate("RewardSummaryScreen");
          }} style={{ flexDirection: "row", }}>
            <Image source={images.DollarIcon} style={styles.blueIcon} />
            <Text
              style={styles.titletextStyle}
            >
              Reward Summary
            </Text>
          </TouchableOpacity>
          {global.loginTypeTemp === "member" ? null :
            <TouchableOpacity onPress={() => {
              navigation.navigate("TransactionInterfaceScreen");
            }} style={{ flexDirection: "row", }}>
              <Image source={images.ProfileIconD} style={styles.blueIcon} />
              <Text

                style={styles.titletextStyle}
              >
                Transaction Interface
              </Text>
            </TouchableOpacity>}
          <TouchableOpacity onPress={() => {
            navigation.navigate("TransactionHistoryScreen");
          }} style={{ flexDirection: "row", }}>
            <Image source={images.CreditCardIcon} style={styles.blueIcon} />
            <Text

              style={styles.titletextStyle}
            >
              Transaction History
            </Text>
          </TouchableOpacity>
      
          <TouchableOpacity onPress={() => {
            navigation.navigate("CashbackHistoryScreen");
          }} style={{ flexDirection: "row" }}>
            <Image source={images.ProfileIconD} style={styles.blueIcon} />
            <Text style={styles.titletextStyle}>Cashback History</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate("MemberNewsScreen");
          }} style={{ flexDirection: "row", }}>

            <Image source={images.MemberCardIcon} style={styles.blueIcon} />
            <Text

              style={styles.titletextStyle}
            >
              Member News
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate("NewsLetterScreen");
          }} style={{ flexDirection: "row", }}>
            <Image source={images.TagIcon} style={styles.blueIcon} />
            <Text

              style={styles.titletextStyle}
            >
              Newsletter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate("NewsScreen");
          }} style={{ flexDirection: "row", }}>
            <Image source={images.NewsPaerIcon} style={styles.blueIcon} />
            <Text

              style={styles.titletextStyle}
            >
              News
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <Modal transparent={true} visible={profileModal} animationType="slide">
        <TouchableOpacity
              onPress={() => {
                console.log("Modal has been closed.");
                setProfileModal(!profileModal);
              }}
              style={{ backgroundColor: "#00000030", flex: 1 }}
            >
          <View style={styles.modalView}>
            <Text
              onPress={() => {
                setProfileModal(false);
                navigation.navigate("PersonalInfoScreen");
              }}
              style={styles.modaltextStyle}
            >
              Personal Information
            </Text>
            {global.loginTypeTemp === "member" ?  <View style={styles.modalline} />:null}
            {global.loginTypeTemp === "member" ? <Text
              onPress={() => {
                setProfileModal(false);
                navigation.navigate("WinngooCardDetail");
              }}
              style={styles.modaltextStyle}
            >
              Winngoo Card Detail
            </Text> : null}
            <View style={styles.modalline} />
            <Text
              onPress={() => {
                setProfileModal(false);
                navigation.navigate("ChangePasswordScreen");
              }}
              style={styles.modaltextStyle}
            >
              Change Password
            </Text>
            <View style={styles.modalline} />
            <Text
              onPress={() => {
                navigation.navigate("CardDetailScreen");
                setProfileModal(false);
              }}
              style={styles.modaltextStyle}
            >
              Bank Detail
            </Text>
          </View>
          </TouchableOpacity>
        </Modal>
        <Modal transparent={true} visible={businessModal} animationType="slide">
        <TouchableOpacity
              onPress={() => {
                console.log("Modal has been closed.");
                setBusinessModal(!businessModal);
              }}
              style={{ backgroundColor: "#00000030", flex: 1 }}
            >
          <View style={styles.modalView}>
            <Text
              onPress={() => {
                setBusinessModal(false);
                navigation.navigate("BusinessInformationScreen");
              }}
              style={styles.modaltextStyle}
            >
              Business Information
            </Text>
            <View style={styles.modalline} />
            <Text
              onPress={() => {
                setBusinessModal(false);
                navigation.navigate("BusinessDetailScreen");
              }}
              style={styles.modaltextStyle}
            >
              Business Detail
            </Text>
            <View style={styles.modalline} />
            <Text
              onPress={() => {
                setBusinessModal(false);
                navigation.navigate("BusinessTaglineScreen");
              }}
              style={styles.modaltextStyle}
            >
              Business Tagline
            </Text>
          </View>
          </TouchableOpacity>
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
    height: responsiveScreenWidth(10),
    width: responsiveScreenWidth(10),
    marginStart: responsiveScreenWidth(4),
    alignSelf: "center",
  },
  blueIcon: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    alignSelf: "center",
    tintColor: colors.DrawerTextBLUE,
    marginStart: responsiveScreenWidth(7),
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
  titletextStyle1: {
    fontSize: responsiveScreenFontSize(2.2),
    color: colors.white,
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    margin: responsiveScreenWidth(4),
  },
  titletextStyle: {
    margin: responsiveScreenWidth(4),
    fontSize: responsiveScreenFontSize(1.6),
    color: colors.white,
    alignSelf: "center",
    fontWeight: "bold",
    width: "70%",
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
