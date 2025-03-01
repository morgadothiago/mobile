import { ImageBackground, Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';

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

type CodeOtpData = {
  code?: string;
}

const CodeOtpSchema = yup.object().shape({
  code: yup
    .string()
    .required('Codigo e obrigatorio')
    .min(4, 'Codigo invalido')
    .max(4, 'Codigo invalido'),
});

export default function CodeOtpScreen() {
  const [isTypeToast, setIsTypeToast] = useState<'success' | 'error'>('success');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { email } = useRoute().params as { email: string };
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [time, setTime] = useState(30);

  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm<CodeOtpData>({
    resolver: yupResolver(CodeOtpSchema),
    defaultValues: {
      code: '0',
    },
  });
  const onSubmit = (data: CodeOtpData) => {
    console.log(data);
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
      <ImageBackground source={require('../../assets/img/Image.png')} style={styles.container}>
        <View >
          <Header title='Verificação' />
        </View>

        <View style={styles.form}>
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


            <View>
              {
                !isTimeOut ? <Text>Aguarde {time} segundos</Text> : <Link title='Reenviar código' onPress={sendNewCode} />
              }
            </View>
          </View>

          <View style={styles.footer}>
            <Button title='Enviar' onPress={handleSubmit(onSubmit)} />
            <Link title='Ainda nao tem conta ?' onPress={() => navigation.navigate('CreateAccounts' as never)} />
          </View>


        </View>

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