import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Custom Drawer
import CustomDrawer from './CustomDrawer';
// Screens
import colors from '../res/colors/colors';
import {responsiveScreenWidth} from '../utils/Size';
import DashboardScreen from '../screens/DrawerScreen/DashboardScreen';
import PersonalInfoScreen from '../screens/DrawerScreen/PersonalInfoScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: colors.WHITE,
          width: responsiveScreenWidth(40),
        },
      }}
      initialRouteName={DashboardScreen}
      >
      <Drawer.Screen
        name={'DashboardScreen'}
        component={DashboardScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={'PersonalInfoScreen'}
        component={PersonalInfoScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
