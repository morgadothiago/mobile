import { ImageBackground, Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback, View, TextInput } from 'react-native';
import styles from './styles';
import Input from '../../components/Input';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import Link from '../../components/Link';
import Header from '../../components/Header';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import apiServices from '../../services/api';
import React, { useRef, useState } from 'react';
import CustomToast from '../../components/CustomToast';
import { useAuth } from '../../context/AuthContext';

type FormData = {
  email?: string;
  password?: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Email invalido').required('Email e obrigatorio'),
  password: yup.string().required('Senha e obrigatoria'),
}).required();

export default function SignInScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isTypeToast, setIsTypeToast] = useState<'success' | 'error'>('success');
  const { setData } = useAuth()

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const SignIn = await apiServices.login(data.email, data.password);

    if ('status' in SignIn) {
      if (SignIn.status !== 422) {
        setToastMessage(SignIn.message.toString());
        setToastVisible(true);
        setIsTypeToast('error');
        setIsLoading(false);

      }
      return;
    }

    setIsTypeToast('success');
    setToastMessage('Login efetuado com sucesso');
    setToastVisible(true);

    // Staraage Secure
    setTimeout(async () => {
      setToastVisible(false);
      await setData(SignIn.accessToken, SignIn.user, SignIn.refreshToken);
    }, 2000);

    setIsLoading(false);

  };
  const PasswordRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={require('../../assets/img/Image.png')} style={styles.container} resizeMode='cover'>
        <View>
          <Header title='Entrar' />
        </View>
        <KeyboardAvoidingView behavior='padding' style={styles.form}>

          <View style={styles.formContent}>
            <Text style={styles.formTitle}>Email</Text>
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

            <Text style={styles.formTitle}>Senha</Text>
            <View>
              <Controller

                control={control}
                name='password'
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    ref={PasswordRef}
                    placeholder='Senha'
                    icon onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={true}
                    onSubmitEditing={handleSubmit(onSubmit)}
                    returnKeyType='done'
                  />
                )}
              />
              {errors.password && (
                <Text style={styles.error}>Senha e obrigatoria</Text>
              )}
            </View>
            <View style={{
              marginTop: 20,
              marginBottom: 10,
            }}>
              <Link title='Esqueceu sua senha?' onPress={() => navigation.navigate('ForgotPassword' as never)} />
            </View>

          </View>

          <View style={styles.footer}>
            <Button title='Entrar' onPress={handleSubmit(onSubmit)} isLoading={isLoading} />
            <Link title='Ainda nao tem conta ?' onPress={() => navigation.navigate('CreateAccounts' as never)} />
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