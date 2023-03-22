import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Custom Drawer
import CustomDrawer from "./CustomDrawer";
// Screens
import colors from "../res/colors/colors";
import { responsiveScreenWidth } from "../utils/Size";
import DashboardScreen from "../screens/DrawerScreen/DashboardScreen";
import PersonalInfoScreen from "../screens/DrawerScreen/ProfileDetail/PersonalInfoScreen";
import WinngooCardDetail from "../screens/DrawerScreen/ProfileDetail/WinngooCardDetail";
import ChangePasswordScreen from "../screens/DrawerScreen/ProfileDetail/ChangePasswordScreen";
import CardDetailScreen from "../screens/DrawerScreen/ProfileDetail/CardDetailScreen";
import ProfileEditScreen from "../screens/DrawerScreen/ProfileDetail/ProfileEditScreen";
import AddBankDetailScreen from "../screens/DrawerScreen/ProfileDetail/AddBankDetailScreen";

import BusinessDetailScreen from "../screens/DrawerScreen/BusinessDetail/BusinessDetailScreen";
import BusinessInformationScreen from "../screens/DrawerScreen/BusinessDetail/BusinessInformationScreen";
import BusinessTaglineScreen from "../screens/DrawerScreen/BusinessDetail/BusinessTaglineScreen";
import EditTaglineScreen from "../screens/DrawerScreen/BusinessDetail/EditTaglineScreen";
import AddTaglineScreen from "../screens/DrawerScreen/BusinessDetail/AddTaglineScreen";

import FranchiseScreen from "../screens/DrawerScreen/Summary/FranchiseScreen";
import CashbackHistoryScreen from "../screens/DrawerScreen/Summary/CashbackHistoryScreen";
import MemberNewsScreen from "../screens/DrawerScreen/Summary/MemberNewsScreen";
import NewsLetterScreen from "../screens/DrawerScreen/Summary/NewsLetterScreen";
import NewsScreen from "../screens/DrawerScreen/Summary/NewsScreen";
import ReferFreindScreen from "../screens/DrawerScreen/Summary/ReferFreindScreen";
import RewardSummaryScreen from "../screens/DrawerScreen/Summary/RewardSummaryScreen";
import TransactionHistoryScreen from "../screens/DrawerScreen/Summary/TransactionHistoryScreen";
import TransactionInterfaceScreen from "../screens/DrawerScreen/Summary/TransactionInterfaceScreen";
import AboutUsScreen from "../screens/DrawerScreen/WebScreen/AboutUsScreen";
import FAQScreen from "../screens/DrawerScreen/WebScreen/FAQScreen";
import PrivacyPolicyScreen from "../screens/DrawerScreen/WebScreen/PrivacyPolicyScreen";
import TermConditionScreen from "../screens/DrawerScreen/WebScreen/TermConditionScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: colors.WHITE,
          width: responsiveScreenWidth(80),
        },
      }}
      initialRouteName={DashboardScreen}
    >
      <Drawer.Screen
        name={"DashboardScreen"}
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"PersonalInfoScreen"}
        component={PersonalInfoScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"ChangePasswordScreen"}
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"CardDetailScreen"}
        component={CardDetailScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"ProfileEditScreen"}
        component={ProfileEditScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"AddBankDetailScreen"}
        component={AddBankDetailScreen}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name={"BusinessDetailScreen"}
        component={BusinessDetailScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"BusinessInformationScreen"}
        component={BusinessInformationScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"BusinessTaglineScreen"}
        component={BusinessTaglineScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"AddTaglineScreen"}
        component={AddTaglineScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"EditTaglineScreen"}
        component={EditTaglineScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"WinngooCardDetail"}
        component={WinngooCardDetail}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name={"MemberNewsScreen"}
        component={MemberNewsScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"FranchiseScreen"}
        component={FranchiseScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"NewsLetterScreen"}
        component={NewsLetterScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"NewsScreen"}
        component={NewsScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"ReferFreindScreen"}
        component={ReferFreindScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"RewardSummaryScreen"}
        component={RewardSummaryScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"CashbackHistoryScreen"}
        component={CashbackHistoryScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"TransactionHistoryScreen"}
        component={TransactionHistoryScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"TransactionInterfaceScreen"}
        component={TransactionInterfaceScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"PrivacyPolicyScreen"}
        component={PrivacyPolicyScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"FAQScreen"}
        component={FAQScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"TermConditionScreen"}
        component={TermConditionScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={"AboutUsScreen"}
        component={AboutUsScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
