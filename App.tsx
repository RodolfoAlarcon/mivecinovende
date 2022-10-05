import React, {useEffect} from 'react';
import OneSignal from 'react-native-onesignal';
import {Navigation} from './src/navigation/AppNavigation'
import { UserProvider } from "./src/context/UsuarioContext";
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { io } from 'socket.io-client';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

export const AppState =({children}: {children: JSX.Element | JSX.Element[]}) => {

  return (
    <UserProvider>
      {children}
    </UserProvider>
    
  ) 
}

const App = () => {
 
  useEffect(()=>{
    OneSignal.setLogLevel(6, 0);
 
    OneSignal.setAppId("f4e0f05a-e5de-4fac-b340-eba2b6c77b35");
    OneSignal.setLanguage('es')

    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log("Prompt response:", response);
    });
  },[])
  
  return (
    <NavigationContainer>
      <AppState>
        <Navigation /> 
      </AppState> 
    </NavigationContainer>
    
  ) 
}
export default App;