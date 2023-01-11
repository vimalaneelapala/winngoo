import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
// Library ======================================================================================
import {Dropdown} from 'react-native-element-dropdown';
// Custom ======================================================================================
import colors from '../../res/colors/colors';
import images from '../../res/imageConstant/images';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from '../../utils/Size';
import strings from '../../res/strings/strings';

const genderList = [
  {label: 'Female', value: 'Female'},
  {label: 'Male', value: 'Male'},
];
const MemberSignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [addressLine3, setAddressLine3] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [refferalCode, setRefferalCode] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.container}>
          <Image
          source={images.LogoWingo}
          resizeMode="contain"
          style={styles.imageicon}
        />
            <Text style={styles.loginText}>{strings.SignUp}</Text>

            <View style={styles.mainview}>
              <Text style={styles.titleText}>
                {strings.FirstName}
                <Text style={styles.starText}>{' *'}</Text>
              </Text>
              <TextInput
                value={firstName}
                onChangeText={firstName => {
                  setFirstName(firstName);
                }}
                placeholder={strings.EnterFname}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>
                {strings.LastName}
                <Text style={styles.starText}>{' *'}</Text>
              </Text>
              <TextInput
                value={lastName}
                onChangeText={lastName => {
                  setLastName(lastName);
                }}
                placeholder={strings.EnterLname}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>
                {strings.Gender}
                <Text style={styles.starText}>{' *'}</Text>
              </Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={genderList}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Select item'}
                value={gender}
                onChange={item => {
                  setGender(item.value);
                }}
              />
              <Text style={styles.titleText}>
                {strings.Email}
                <Text style={styles.starText}>{' *'}</Text>
              </Text>
              <TextInput
                value={email}
                onChangeText={email => {
                  setEmail(email);
                }}
                placeholder={strings.EnterEmail}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>
                {strings.ConfirmEmail}
                <Text style={styles.starText}>{' *'}</Text>
              </Text>
              <TextInput
                value={confirmEmail}
                onChangeText={confirmEmail => {
                  setConfirmEmail(confirmEmail);
                }}
                placeholder={strings.EnterConfirmEmail}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>
                {strings.AddressLine1}
                <Text style={styles.starText}>{' *'}</Text>
              </Text>
              <TextInput
                value={addressLine1}
                onChangeText={addressLine1 => {
                  setAddressLine1(addressLine1);
                }}
                placeholder={strings.EnterAddress1}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>{strings.AddressLine2}</Text>
              <TextInput
                value={addressLine2}
                onChangeText={addressLine2 => {
                  setAddressLine2(addressLine2);
                }}
                placeholder={strings.EnterAddress2}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>{strings.AddressLine3}</Text>
              <TextInput
                value={addressLine3}
                onChangeText={addressLine3 => {
                  setAddressLine3(addressLine3);
                }}
                placeholder={strings.EnterAddress3}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>
                {strings.City}
                <Text style={styles.starText}>{' *'}</Text>
              </Text>
              <TextInput
                value={city}
                onChangeText={city => {
                  setCity(city);
                }}
                placeholder={strings.EnterCity}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>
                {strings.PostCode}
                <Text style={styles.starText}>{' *'}</Text>
              </Text>
              <TextInput
                value={postCode}
                onChangeText={postCode => {
                  setPostCode(postCode);
                }}
                placeholder={strings.EnterPostCode}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>
                {strings.Country}
                <Text style={styles.starText}>{' *'}</Text>
              </Text>
              <Text style={styles.titleText}>
                {strings.PhoneNumber}
                <Text style={styles.starText}>{' *'}</Text>
              </Text>
              <TextInput
                value={phoneNumber}
                onChangeText={phoneNumber => {
                  setPhoneNumber(phoneNumber);
                }}
                placeholder={strings.EnterPhoneNumber}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>{strings.Reffereal}</Text>
              <TextInput
                value={refferalCode}
                onChangeText={refferalCode => {
                  setRefferalCode(refferalCode);
                }}
                placeholder={strings.EnterReferralCode}
                style={styles.textInputstyle}
              />
              <Text style={styles.titleText}>
                {strings.BirthMonth}
                <Text style={styles.starText}>{' *'}</Text>
              </Text>
            </View>

            <TouchableOpacity style={styles.loginBtn}>
              <Text
                style={[
                  styles.loginText,
                  {
                    color: colors.WHITE,
                    fontSize: responsiveScreenFontSize(2),
                    marginTop: 0,
                  },
                ]}>
                {strings.SignUpMember}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  loginText: {
    fontSize: responsiveScreenFontSize(3),
    color: colors.BLACK,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: responsiveScreenWidth(5),
  },
  starText: {
    fontSize: responsiveScreenFontSize(1.8),
    color: colors.RED,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingTop: responsiveScreenWidth(8),
  },
  textInputstyle: {
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.1),
    fontSize: responsiveScreenFontSize(2),
    width: '100%',
    alignSelf: 'center',
    margin: responsiveScreenWidth(3),
  },
  loginBtn: {
    width: '75%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: responsiveScreenWidth(1),
    height: responsiveScreenWidth(12),
    backgroundColor: colors.BLUETEXT,
    marginTop: responsiveScreenWidth(5),
    marginBottom: responsiveScreenWidth(5),
  },
  mainview: {
    width: '75%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: responsiveScreenFontSize(1.6),
    color: colors.BLACK,
    fontWeight: '600',
  },

  dropdown: {
    height: responsiveScreenWidth(12),
    borderRadius: responsiveScreenWidth(1),
    borderColor: colors.BLACK,
    borderWidth: responsiveScreenWidth(0.1),
    backgroundColor: colors.TEXTINPUTBACKGROUND,
    marginTop: responsiveScreenWidth(2),
    width: '100%',
    alignSelf: 'center',
    paddingStart: responsiveScreenWidth(1),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  imageicon: {
    height: responsiveScreenWidth(20),
    width: responsiveScreenWidth(50),
    justifyContent: 'center',
    alignSelf: 'center',
    margin:responsiveScreenWidth(5)
  },
});

export default MemberSignUpScreen;
