import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ExamDetailsScreen from '../screens/ExamDetailsScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PaymentScreen from '../screens/PaymentScreen';
import StatusScreen from '../screens/StatusScreen';
import SeatResultsScreen from '../screens/SeatResultsScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen 
          name="ExamDetails" 
          component={ExamDetailsScreen}
          options={{
            headerShown: true,
            title: 'Exam Details',
          }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{
            headerShown: true,
            title: 'Register for Exam',
          }}
        />
        <Stack.Screen 
          name="Payment" 
          component={PaymentScreen}
          options={{
            headerShown: true,
            title: 'Payment',
          }}
        />
        <Stack.Screen 
          name="Status" 
          component={StatusScreen}
          options={{
            headerShown: true,
            title: 'Application Status',
          }}
        />
        <Stack.Screen 
          name="SeatResults" 
          component={SeatResultsScreen}
          options={{
            headerShown: true,
            title: 'Seat Allocation Results',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;