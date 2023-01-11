import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Modal,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
// Custom ======================================================================================
import colors from '../../res/colors/colors';
import images from '../../res/imageConstant/images';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from '../../utils/Size';
import {DrawerActions} from '@react-navigation/native';

const DashboardScreen = ({navigation}) => {
  const [isModal, setIsModal] = useState(false);
  // UseEffect=================================================================================

  // Function=================================================================================
  const TopHeaderView = () => {
    return (
      <View style={styles.headerstyle}>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
          style={{marginTop: responsiveScreenWidth(1)}}>
          <Image
            source={images.HamburgerIcon}
            resizeMode="contain"
            style={styles.HamburgerIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsModal(true);
          }}
          style={{marginTop: responsiveScreenWidth(1)}}>
          <Image
            source={images.ProfileIcon}
            resizeMode="contain"
            style={styles.ProfileIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const cardView = (title, answer, textcolor, image) => {
    return (
      <View style={styles.shadowcard}>
        <View style={[styles.heightView, {backgroundColor: textcolor}]} />
        <View style={[styles.rowView, {width: '70%'}]}>
          <Text style={[styles.titleText, {color: textcolor}]}>{title}</Text>
          <Text style={styles.ansText}>{answer}</Text>
        </View>
        <View style={[styles.rowView, {marginStart: 0}]}>
          <Image source={image} resizeMode="contain" style={styles.blueIcon} />
        </View>
      </View>
    );
  };
  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <TopHeaderView />
          {cardView(
            'Total Savings',
            '5000',
            colors.BLUETEXT,
            images.CreditCardIcon,
          )}
          {cardView('Total Savings', '5000', colors.orange, images.DollarIcon)}
          {cardView(
            'Total Savings',
            '5000',
            colors.yellow,
            images.MultipleUserIcon,
          )}
          {cardView('Total Savings', '5000', colors.green, images.NewsPaerIcon)}
          {cardView(
            'Total Savings',
            '5000',
            colors.blue,
            images.MemberCardIcon,
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
  },
  HamburgerIcon: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    alignSelf: 'center',
    tintColor: colors.TOGGLEBLUE,
    marginTop: responsiveScreenWidth(0),
  },
  ProfileIcon: {
    height: responsiveScreenWidth(7),
    width: responsiveScreenWidth(7),
    alignSelf: 'center',
    marginTop: responsiveScreenWidth(1),
  },
  modalIcon: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    alignSelf: 'center',
    marginTop: responsiveScreenWidth(1),
    marginStart: responsiveScreenWidth(4),
    tintColor: colors.blue,
  },
  headerstyle: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenWidth(16),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    paddingStart: responsiveScreenWidth(6),
    paddingEnd: responsiveScreenWidth(6),
  },
  mainView: {
    width: responsiveScreenWidth(99.5),
    height: '100%',
    backgroundColor: '#0737f720',
  },
  shadowcard: {
    width: '80%',
    backgroundColor: colors.white,
    height: responsiveScreenWidth(25),
    borderRadius: responsiveScreenWidth(2),
    alignSelf: 'center',
    margin: responsiveScreenWidth(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowView: {
    alignSelf: 'center',
    margin: responsiveScreenWidth(5),
  },
  blueIcon: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    alignSelf: 'center',
    tintColor: colors.DrawerTextBLUE,
    marginTop: responsiveScreenWidth(2),
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: responsiveScreenFontSize(1.8),
    color: colors.blue,
  },
  modalText: {
    fontWeight: '500',
    fontSize: responsiveScreenFontSize(1.6),
    marginTop: responsiveScreenWidth(1),
    marginStart: responsiveScreenWidth(2),
    color: colors.BLACK,
    alignSelf: 'center',
    textAlign: 'center',
  },
  ansText: {
    fontWeight: 'bold',
    fontSize: responsiveScreenFontSize(2.2),
    color: colors.gray_dark,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: responsiveScreenFontSize(3),
    color: colors.gray_dark,
    marginStart: responsiveScreenWidth(12),
    marginTop: responsiveScreenWidth(5),
  },
  heightView: {
    backgroundColor: colors.blue,
    height: responsiveScreenWidth(25),
    borderTopStartRadius: responsiveScreenWidth(2),
    borderBottomStartRadius: responsiveScreenWidth(2),
    width: responsiveScreenWidth(2),
  },
  modalView: {
    width: '90%',
    height: responsiveScreenWidth(20),
    borderRadius: responsiveScreenWidth(2),
    alignSelf: 'center',
    backgroundColor: colors.white,
    marginTop: responsiveScreenWidth(20),
  },
  linestyle: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: colors.blue,
    height: responsiveScreenWidth(0.2),
    margin: responsiveScreenWidth(2),
  },
});

export default DashboardScreen;
