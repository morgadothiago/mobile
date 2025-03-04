import { ImageBackground, Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback, View, } from 'react-native';

import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../../components/Button';
import Link from '../../components/Link';
import Header from '../../components/Header';

import OtpInput from '../../components/OtpInput';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';

import apiServices from '../../services/api';
import CustomToast from '../../components/CustomToast';
import { isLoading } from 'expo-font';
import { ERoutes } from '../../router/mainStacks';
import { NavigationRoot } from '../../utils';

type code = {
  code?: string;
}

const CodeOtpSchema = yup.object().shape({
  code: yup
    .string()
    .required('Codigo e obrigatorio')
    .min(4, 'Codigo invalido')
    .max(4, 'Codigo invalido'),
});

export default function SignInScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTypeToast, setIsTypeToast] = useState<'success' | 'error'>('success');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { email } = useRoute().params as { email: string };
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [time, setTime] = useState(30);

  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm<code>({
    resolver: yupResolver(CodeOtpSchema),
    defaultValues: {
      code: '0',
    },
  });
  const onSubmit = async (data: code) => {
    setIsLoading(true);
    const verifyRecoveryCode = await apiServices.verifyRecoveryCode(data.code, email);
    setIsLoading(false);

    console.log(verifyRecoveryCode);

    if ('status' in verifyRecoveryCode) {
      if (verifyRecoveryCode.status === 422) {
        // Utilizar Object.entries
      }
      setToastVisible(true);
      setIsTypeToast('error');
      setToastMessage(verifyRecoveryCode.message as string);

      return
    }

    // Sucesso
    setToastVisible(true);
    setIsTypeToast('success');
    setToastMessage('Email enviado com sucesso');


    setTimeout(() => {

      NavigationRoot(navigation, ERoutes.ChangePassword, {
        recoveryToken: verifyRecoveryCode.recoveryToken
      });
    }, 2000);

    console.log(verifyRecoveryCode)
  }
  const startTimer = () => {
    const interval = setInterval(() => {
      setTime(time => {
        if (time === 0) {
          setIsTimeOut(true);
          clearInterval(interval);

          return 0;
        }
        return time - 1;
      });
    }, 1000);
  }


  const sendNewCode = async () => {
    const recoveryCode = await apiServices.sendEmailRecovery(email);

    if (recoveryCode) {
      setToastVisible(true);
      setIsTypeToast('success');
      setToastMessage('Email enviado com sucesso');
    }

    setIsTimeOut(false);
    setTime(30);
    startTimer();

  }
  useEffect(startTimer, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={require('../../assets/img/Image.png')} style={styles.container} resizeMode='cover'>
        <View>
          <Header title='Verificação' />
        </View>
        <KeyboardAvoidingView behavior='padding' style={styles.form}>

          <View style={styles.formContent}>
            <Text style={styles.formTitle}>Informe seu email para enviarmos o código de verificação..</Text>
            <View>
              <Controller
                control={control}
                rules={{ required: true }}
                name='code'
                render={({ field: { onChange, onBlur, value } }) => (
                  <OtpInput onChangeText={onChange} onBlur={onBlur} value={value} isValid={
                    !errors.code
                  } />
                )}
              />
              {errors.code && <Text style={styles.error}>{errors.code.message}</Text>}
            </View>


            <View style={{

              width: '100%',
            }}>
              {
                !isTimeOut ? <Text>Aguarde {time} segundos</Text> : <Link title='Reenviar código' onPress={sendNewCode} />
              }
            </View>
          </View>

          <View style={styles.footer}>
            <Button title='Enviar' onPress={handleSubmit(onSubmit)} isLoading={isLoading} />

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