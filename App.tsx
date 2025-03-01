import 'react-native-gesture-handler';



import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Raleway_700Bold } from '@expo-google-fonts/raleway';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_900Black, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { theme } from './src/global/theme';
import { useEffect, useState } from 'react';
import { SplashScreen } from './src/components/splashscreen';
import Routes from './src/router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthProvider, { AuthContext } from './src/context/AuthContext';

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

          <Routes />
          <StatusBar hidden />
        </View>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

