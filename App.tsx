import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Raleway_700Bold } from '@expo-google-fonts/raleway';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_900Black, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { theme } from './src/global/theme';
import { useEffect, useState } from 'react';
import { SplashScreen } from './src/components/splashscreen';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthProvider, { AuthContext } from './src/context/AuthContext';
import { MainStacks } from './src/router/mainStacks';
import Routes from './src/router';
import { LogBox } from 'react-native';
import { PaperProvider } from 'react-native-paper';

LogBox.ignoreLogs(['Text strings must be rendered within a <Text> component']);

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded, error] = useFonts({
    Raleway_700Bold,
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_900Black,
    Roboto_500Medium,
  });

  useEffect(() => {

    if (fontsLoaded) {
      setTimeout(() => {
        setIsLoading(true);
      }, 3000);
    }
  }, [error, fontsLoaded]);

  if (!isLoading) {
    return (

      <SplashScreen />

    )
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <View style={{ flex: 1, backgroundColor: theme.colors.primary }}>
          <PaperProvider>
            <Routes />
          </PaperProvider>
          <StatusBar hidden />
        </View>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

