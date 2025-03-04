import React, { useState } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import FundoImg from '../../assets/img/Image.png';
import LogoImg from '../../assets/img/logo.png';

import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import Button from '../../components/Button';
import Link from '../../components/Link';
import { useAuth } from '../../context/AuthContext';


export default function IntroScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();

  const handleLogin = () => {
    navigation.navigate('SignIn' as never);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };



  return (
    <ImageBackground source={FundoImg} style={styles.background}>
      <View style={styles.logoContainer}>
        <Image source={LogoImg} style={styles.logo} />
        <Text style={styles.title}>Receitas perfeitas. Em qualquer quantidade.</Text>
      </View>
      <View style={styles.btnsArea}>
        <Button title="Entrar" onPress={handleLogin} />
        <Button title="Criar conta" onPress={() => navigation.navigate('CreateAccounts' as never)} createAccount />
      </View>
      <View style={styles.footer}>
        <Link title='Esqueceu sua senha?' onPress={() => navigation.navigate('ForgotPassword' as never)} />
      </View>
    </ImageBackground>
  );
}
