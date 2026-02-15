import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";

import SplashScreen from "../screens/SplashScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ExamDetailsScreen from "../screens/ExamDetailsScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PaymentScreen from "../screens/PaymentScreen";
import StatusScreen from "../screens/StatusScreen";
import SeatResultScreen from "../screens/SeatResultScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="ExamDetails" component={ExamDetailsScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Status" component={StatusScreen} />
        <Stack.Screen name="SeatResult" component={SeatResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
