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
  Platform,
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

const ForgotPasswordScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.forgotPasswordText}>{strings.ForgotPassword}</Text>

        <Text style={styles.rememberText}>{strings.ResetPassword}</Text>

        <TextInput
          value={password}
          onChangeText={password => {
            setPassword(password);
          }}
          placeholder={strings.EnterEmail}
          style={styles.textInputstyle}
        />

        <TouchableOpacity style={styles.loginBtn}>
          <Text
            style={[
              styles.loginText,
              {color: colors.WHITE, fontSize: responsiveScreenFontSize(2)},
            ]}>
            {strings.ResetLink}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  forgotPasswordText: {
    fontSize: responsiveScreenFontSize(3),
    color: colors.BLACK,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: responsiveScreenWidth(10),
  },
  textInputstyle: {
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.1),
    fontSize: responsiveScreenFontSize(2),
    width: '75%',
    alignSelf: 'center',
    margin: responsiveScreenWidth(3),
    height:Platform.OS==="ios"?responsiveScreenWidth(12):responsiveScreenWidth(12)
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
    marginTop: responsiveScreenWidth(10),
    width: '75%',
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
});

export default ForgotPasswordScreen;
