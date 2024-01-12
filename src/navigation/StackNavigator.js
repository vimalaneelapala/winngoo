import React, {Component, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
// Library ======================================================================================
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

// Screens ======================================================================================
import SplashScreen from '../screens/SplashScreen'
import DrawerNavigator from './DrawerNavigator';

import MemberForgotPasswordScreen from '../screens/Member/MemberForgotPasswordScreen';
import MemberLoginScreen from '../screens/Member/MemberLoginScreen';
import MemberSignUpScreen from '../screens/Member/MemberSignUpScreen';

import MerchentForgotPasswordScreen from '../screens/Merchent/MerchentForgotPasswordScreen';
import MerchentLoginScreen from '../screens/Merchent/MerchentLoginScreen';
import MerchentSignUpScreen from '../screens/Merchent/MerchentSignUpScreen';
import MerchentSignUpAddressScreen from '../screens/Merchent/MerchentSignUpAddressScreen';
import MerchentSignUpBusinessScreen from '../screens/Merchent/MerchentSignUpBusinessScreen';
import MemberCardScreen from '../screens/Member/MemberCardScreen';


const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"SplashScreen"}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        options={{headerShown: false}}
        name={'SplashScreen'}
        component={SplashScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'MemberSignUpScreen'}
        component={MemberSignUpScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'MemberLoginScreen'}
        component={MemberLoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'MemberForgotPasswordScreen'}
        component={MemberForgotPasswordScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'MemberCardScreen'}
        component={MemberCardScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'MerchentForgotPasswordScreen'}
        component={MerchentForgotPasswordScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'MerchentLoginScreen'}
        component={MerchentLoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'MerchentSignUpScreen'}
        component={MerchentSignUpScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'MerchentSignUpBusinessScreen'}
        component={MerchentSignUpBusinessScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'MerchentSignUpAddressScreen'}
        component={MerchentSignUpAddressScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'DrawerNavigator'}
        component={DrawerNavigator}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
