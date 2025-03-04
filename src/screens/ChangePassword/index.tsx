import { ImageBackground, Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback, View, TextInput } from 'react-native';
import styles from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import apiServices from '../../services/api';
import React, { useRef, useState } from 'react';
import CustomToast from '../../components/CustomToast';
import { useAuth } from '../../context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationRoot } from '../../utils';
import { ERoutes } from '../../router/mainStacks';


type FormData = {
  password?: string;
  confirmPassword?: string;
  recoveryToken?: string;
}

type routeProps = {
  recoveryToken: string;
}

const schema = yup.object().shape({
  password: yup.string().required('Senha e obrigatoria'),
  confirmPassword: yup.string().required('Confirmacao de senha e obrigatoria'),
}).required();

export default function ChangePasswordScreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isTypeToast, setIsTypeToast] = useState<'success' | 'error'>('success');
  const navigation = useNavigation();
  const routes = useRoute();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const { recoveryToken } = routes.params as routeProps;



    if (data.password !== data.confirmPassword) {
      setToastMessage('As senhas não conferem');
      setToastVisible(true);
      setIsTypeToast('error');
      setIsLoading(false);
      return;
    }
    console.log('aqui', props)

    const updatePassword = await apiServices.updatePassword(data.password, recoveryToken);

    if ('status' in updatePassword) {
      if (updatePassword.status === 403) {
        setToastMessage(updatePassword.details.toString());
        setToastVisible(true);
        setIsTypeToast('error');
        setIsLoading(false);
        return;
      }


    }

    setToastMessage('Senha alterada com sucesso');
    setToastVisible(true);
    setIsTypeToast('success');
    setTimeout(() => {
      NavigationRoot(navigation, ERoutes.SignIn);
    }, 2000);



    setIsLoading(false);

  };
  const PasswordRef = useRef<TextInput>(null);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={require('../../assets/img/Image.png')} style={styles.container} resizeMode='cover'>
        <View>
          <Header title='Mudar Senha' />
        </View>
        <KeyboardAvoidingView behavior='padding' style={styles.form}>

          <View style={styles.formContent}>
            <View style={{
              marginTop: 10,
            }}>
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

            <View>
              <Controller
                control={control}
                name='confirmPassword'
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    ref={PasswordRef}
                    placeholder='confirmar senha'
                    icon onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={true}
                    onSubmitEditing={handleSubmit(onSubmit)}
                    returnKeyType='done'
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text style={styles.error}>campos obrigatorio</Text>
              )}
            </View>


          </View>

          <View style={styles.footer}>
            <Button title='Entrar' onPress={handleSubmit(onSubmit)} isLoading={isLoading} />
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