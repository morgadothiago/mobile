import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, ImageBackground, Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback, View } from 'react-native';
import styles from './styles';
import Input from '../../components/Input';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import Link from '../../components/Link';
import Header from '../../components/Header';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import apiServices from '../../services/api';
import * as yup from 'yup';
import CustomToast from '../../components/CustomToast';
import { TextInput } from 'react-native-gesture-handler';

type ChangePasswordProps = {

  password?: string;
  confirmPassword?: string;
}

const SignUpSchema = yup.object().shape({
  password: yup.string().required('Senha e obrigatoria'),
  confirmPassword: yup.string().required('Confirmacao de senha e obrigatoria'),
});

export default function CreateAccountsScreen() {
  const [isTypeToast, setIsTypeToast] = useState<'success' | 'error'>('success');
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<ChangePasswordProps>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const onSubmit = async (data: SignUpData) => {



  }

  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={require('../../assets/img/Image.png')} style={styles.container} resizeMode='cover'>
        <View>
          <Header title='Criar conta' />
        </View>

        <KeyboardAvoidingView behavior='padding' style={styles.form}>
          <Text>
            Informe sua nova senha ?
          </Text>

          <View>
            <Input placeholder="Digite a senha" />
            {
              errors.password && (
                <Text>
                  {errors.password.message}
                </Text>
              )
            }
          </View>

          <View>
            <Input placeholder="confirme a senha" />
            {
              errors.confirmPassword && (
                <Text>
                  {errors.confirmPassword.message}
                </Text>
              )
            }
          </View>
          <View style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            marginBottom: 20,
          }}>
            <Button title='Criar Conta' onPress={handleSubmit(onSubmit)} isLoading={isLoading} />
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