import { ImageBackground, Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import Input from '../../components/Input';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import Link from '../../components/Link';
import Header from '../../components/Header';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { TextInput } from 'react-native-gesture-handler';
import { useRef, useState } from 'react';

import apiServices from '../../services/api';

import CustomToast from '../../components/CustomToast';
import { ERoutes } from '../../router/mainStacks';


type RootStackParamList = {
  CodeOtp: { email: string };
  CreateAccounts: undefined;
};

type ForgotPasswordData = {
  email?: string;
}

const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Email invalido').required('Email e obrigatorio'),
});
export default function SignInScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTypeToast, setIsTypeToast] = useState<'success' | 'error'>('success');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<ForgotPasswordData>({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });


  const onSubmit = async (data: ForgotPasswordData) => {
    setIsLoading(true);
    const recoveryPassword = await apiServices.sendEmailRecovery(data.email);

    console.log(recoveryPassword);

    if ('status' in recoveryPassword) {
      if (recoveryPassword.status === 404) {
        setTimeout(() => {
          setToastMessage(recoveryPassword.message.toString());
          setToastVisible(true);
          setIsTypeToast('error');
          setIsLoading(false);
        }, 2000);

        setValue('email', '');

      }

      return;
    }



    setToastVisible(true);
    setIsTypeToast('success');
    setToastMessage('Email enviado com sucesso');


    setTimeout(() => {

      navigation.navigate(ERoutes.CodeOtp as never, { email: data.email });
    }, 2000);


    setIsLoading(false);

  }

  const handleOpenModalForgotPassword = () => {
    setModalSheetShow(true);
  }
  const PasswordRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={require('../../assets/img/Image.png')} style={styles.container} resizeMode='cover'>
        <View>
          <Header title='Recuperar conta' />
        </View>
        <KeyboardAvoidingView behavior='padding' style={styles.form}>

          <View style={styles.formContent}>
            <Text style={styles.formTitle}>Informe seu email para enviarmos o código de verificação.</Text>
            <View>
              <Controller
                control={control}
                name='email'
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder='Email'
                    secureTextEntry={false}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    onSubmitEditing={() => PasswordRef.current?.focus()}
                    returnKeyType='next'


                  />
                )}
              />
              {errors.email && (
                <Text style={styles.error}>Email e obrigatorio</Text>
              )}
            </View>
          </View>

          <View style={styles.footer}>
            <Button title='Entrar' onPress={handleSubmit(onSubmit)} isLoading={isLoading} />
            <Link title='Ainda nao tem conta ?' onPress={handleOpenModalForgotPassword} />
          </View>
        </KeyboardAvoidingView>

        {toastVisible && (
          <CustomToast
            message={toastMessage}
            visible={toastVisible}
            type={isTypeToast}
            onDismiss={() => setToastVisible(false)}
          />
        )}
      </ImageBackground>

    </TouchableWithoutFeedback>
  );
}