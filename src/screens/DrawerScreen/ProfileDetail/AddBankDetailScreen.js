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

const AddBankDetailScreen = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [accNumber, setAccNumber] = useState("");
  const [accName, setAccName] = useState("");
  const [bankName, setBankName] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [rollNumber, setRollNumber] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <View style={styles.container}>
        <TopHeaderView
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
          headerText={strings.AddCardDetail}
        />
        <View style={{marginTop:responsiveScreenWidth(5)}}>
          <TextInput
            value={accNumber}
            onChangeText={(accNumber) => {
              setAccNumber(accNumber);
            }}
            placeholder={strings.CardNumber}
            style={styles.textInputstyle}
            keyboardType="number-pad"
          />
          <TextInput
            value={accName}
            onChangeText={(accName) => {
              setAccName(accName);
            }}
            placeholder={strings.CardName}
            style={styles.textInputstyle}
            keyboardType="email-address"
          />
          <TextInput
            value={bankName}
            onChangeText={(bankName) => {
              setBankName(bankName);
            }}
            placeholder={strings.BankName}
            style={styles.textInputstyle}
          />
          <TextInput
            value={sortCode}
            onChangeText={(sortCode) => {
              setSortCode(sortCode);
            }}
            placeholder={strings.SortNumber}
            style={styles.textInputstyle}
            keyboardType="number-pad"
          />
          <TextInput
            value={rollNumber}
            onChangeText={(rollNumber) => {
              setRollNumber(rollNumber);
            }}
            placeholder={strings.RollNumber}
            style={styles.textInputstyle}
            keyboardType="number-pad"
          />

          <View style={styles.rowView}>
            <ButtonText
              loginBtn={{
                width: responsiveScreenWidth(25),
              }}
              text={strings.Create}
            />
            <ButtonText
              loginBtn={{
                width: responsiveScreenWidth(25),
              }}
              text={strings.Reset}
            />
          </View>
        </View>
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
  textInputstyle: {
    backgroundColor: colors.WHITE,
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.02),
    fontSize: responsiveScreenFontSize(2),
    width: "75%",
    alignSelf: "center",
    margin: responsiveScreenWidth(3),
    color: colors.BLACK,
  },
  rowView: {
    flexDirection: "row",
    width: "75%",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    marginTop: responsiveScreenWidth(10),
  },
});

export default AddBankDetailScreen;
