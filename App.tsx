import React from 'react';
import {Navigation} from './src/navigation/AppNavigation'
import { UserProvider } from "./src/context/UsuarioContext";
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';

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
  return (
    <NavigationContainer>
      <AppState>
        <Navigation /> 
      </AppState> 
    </NavigationContainer>
    
  ) 
}
export default App;