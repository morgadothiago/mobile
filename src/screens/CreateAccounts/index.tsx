import React, { useRef, useState } from 'react';
import { ImageBackground, Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback, View } from 'react-native';
import styles from './styles';
import Input from '../../components/Input';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import Link from '../../components/Link';
import Header from '../../components/Header';
import { Controller, useForm } from 'react-hook-form';

import apiServices from '../../services/api';
import * as yup from 'yup';
import CustomToast from '../../components/CustomToast';
import { TextInput } from 'react-native-gesture-handler';
import { yupResolver } from '@hookform/resolvers/yup';

type SignUpData = {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUpSchema = yup.object().shape({
  email: yup.string().email('Email invalido').required('Email e obrigatorio'),
  password: yup.string().required('Senha e obrigatoria'),
  confirmPassword: yup.string().required('Confirmacao de senha e obrigatoria'),
});

export default function CreateAccountsScreen() {
  const [isTypeToast, setIsTypeToast] = useState<'success' | 'error'>('success');
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<SignUpData>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const onSubmit = async (data: SignUpData) => {
    setIsLoading(true);
    if (data.password !== data.confirmPassword) {
      setToastMessage('As senhas não conferem');
      setToastVisible(true);
      setIsTypeToast('error');
      setIsLoading(false);
      return;
    }

    const SignUp = await apiServices.SignUp(data.email, data.password);
    setIsLoading(false);
    if (SignUp) {
      setIsTypeToast('error');
      if ([404, 409].includes(SignUp.status)) {
        setToastMessage(SignUp.message as string);
        setIsLoading(false);
      } else if (SignUp.status === 500) {
        setToastMessage('Conexao com o servidor falhou');
      }
      setToastVisible(true);
      return;
    }
    setIsTypeToast('success');
    setToastMessage('Usuario criado com sucesso');
    setToastVisible(true);

    setTimeout(() => {
      navigation.navigate('SignIn' as never);
    }, 2000);



  }

  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={require('../../assets/img/Image.png')} style={styles.container} resizeMode='cover'>
        <View>
          <Header title='Criar conta' />
        </View>

        <KeyboardAvoidingView behavior='padding' style={styles.form}>
          <View style={styles.formContent}>
            <View>
              <Controller
                control={control}
                rules={{ required: true }}
                name='email'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input

                    placeholder='Email'
                    secureTextEntry={false}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    onSubmitEditing={() => emailRef.current?.focus()}
                    enterKeyHint='next'
                  />
                )}
              />
              {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
            </View>

            <View>
              <Controller
                control={control}
                rules={{ required: true }}
                name='password'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    ref={emailRef}
                    placeholder='Senha'
                    icon onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={true}
                    keyboardAppearance='dark'
                    enterKeyHint='next'
                    onSubmitEditing={() => passwordRef.current?.focus()}
                  />
                )}
              />
              {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
            </View>
            <View>
              <Controller
                control={control}
                rules={{ required: true }}
                name='confirmPassword'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    ref={passwordRef}
                    placeholder='Confirmar Senha'
                    icon
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={true}
                    keyboardAppearance='dark'
                    enterKeyHint='done'
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                )}
              />
              {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
            </View>
          </View>


          <View style={styles.footer}>

            <Button title='Criar Conta' onPress={handleSubmit(onSubmit)} isLoading={isLoading} />
            <Link title='Ainda nao tem conta ?' onPress={() => navigation.navigate('SignIn' as never)} />

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