import { NavigatorScreenParams } from '@react-navigation/native';

export type DrawerParamList = {
  Home: undefined;
  PerfilScreen: undefined;
  Product: undefined;
  ReceitasScreen: undefined;
  PrepareScreen: undefined;
  AllRecipes: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  CreateAccounts: undefined;
  ForgotPassword: undefined;
  CodeOtp: undefined;
  DrawerRoutes: NavigatorScreenParams<DrawerParamList>;
  Product: {
    item: {
      id: number;
      name: string;
      image: string;
      description: string;
      favorite: boolean;
    };
  };
}; 