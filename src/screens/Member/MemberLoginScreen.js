import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
// Custom ======================================================================================
import colors from '../../res/colors/colors';
import images from '../../res/imageConstant/images';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from '../../utils/Size';
import strings from '../../res/strings/strings';

const MemberLoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image
          source={images.LogoIcon}
          resizeMode="contain"
          style={styles.imageicon}
        />
        <Text style={styles.loginText}>{strings.LOGIN}</Text>

        <TextInput
          value={email}
          onChangeText={email => {
            setEmail(email);
          }}
          placeholder={strings.EnterEmail}
          style={styles.textInputstyle}
        />
        <TextInput
          value={password}
          onChangeText={password => {
            setPassword(password);
          }}
          secureTextEntry={isShowPassword}
          placeholder={strings.EnterPassword}
          style={styles.textInputstyle}
        />

        <View style={styles.rowView}>
          <View>
            <TouchableOpacity
              onPress={() => {
                setIsRemember(!isRemember);
              }}
              style={styles.boxView}>
              <Image
                source={isRemember ? images.Check : null}
                style={styles.checkImage}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginStart: responsiveScreenWidth(-8)}}>
            <Text style={styles.rememberText}>{strings.RememberMe}</Text>
          </View>
          <View>
            <Text
              onPress={() => {
                navigation.navigate('MemberForgotPasswordScreen');
              }}
              style={styles.forgotText}>
              {strings.ForgotPassword}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DrawerNavigator');
          }}
          style={styles.loginBtn}>
          <Text
            style={[
              styles.loginText,
              {color: colors.WHITE, fontSize: responsiveScreenFontSize(2)},
            ]}>
            {strings.LOGINMember}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MemberSignUpScreen');
          }}
          style={styles.signupView}>
          <Text style={styles.rememberText}>
            {strings.DontAccount}
            <Text style={styles.forgotText}>{strings.SignUp}</Text>
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => {
            navigation.navigate('MerchentLoginScreen');
          }}
          style={styles.partnerUsstyle}>
          {strings.PartnerUs}
        </Text>
        <View style={styles.bottomView}>
          <Image
            source={images.InstagramIcon}
            resizeMode="contain"
            style={styles.socialIcon}
          />
          <Image
            source={images.FacebookIcon}
            resizeMode="contain"
            style={styles.socialIcon}
          />
          <Image
            source={images.YoutubeIcon}
            resizeMode="contain"
            style={styles.socialIcon}
          />
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
  textInputstyle: {
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.1),
    fontSize: responsiveScreenFontSize(2),
    width: '75%',
    alignSelf: 'center',
    margin: responsiveScreenWidth(3),
    color: colors.BLACK,
  },
  rowView: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '75%',
    marginTop: responsiveScreenWidth(2),
  },
  forgotText: {
    color: colors.BLUETEXT,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: 'bold',
  },
  rememberText: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: '600',
    marginTop: responsiveScreenWidth(0),
    width: '100%',
    alignSelf: 'center',
  },
  loginBtn: {
    width: '75%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: responsiveScreenWidth(1),
    height: responsiveScreenWidth(12),
    backgroundColor: colors.BLUETEXT,
    marginTop: responsiveScreenWidth(5),
  },
  loginText: {
    fontSize: responsiveScreenFontSize(4),
    color: colors.BLACK,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  imageicon: {
    height: responsiveScreenWidth(20),
    width: responsiveScreenWidth(20),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  socialIcon: {
    height: responsiveScreenWidth(10),
    width: responsiveScreenWidth(10),
    justifyContent: 'center',
    alignSelf: 'center',
    margin: responsiveScreenWidth(4),
  },
  boxView: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.2),
  },
  checkImage: {
    height: responsiveScreenWidth(3),
    width: responsiveScreenWidth(3),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  signupView: {
    alignSelf: 'flex-end',
    marginEnd: responsiveScreenWidth(13),
    marginTop: responsiveScreenWidth(4),
  },
  partnerUsstyle: {
    color: colors.BLUETEXT,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: 'bold',
    alignSelf: 'center',
    position: 'absolute',
    bottom: responsiveScreenWidth(18),
  },
  bottomView: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export default MemberLoginScreen;
