import { NavigatorScreenParams } from '@react-navigation/native';

// Rotas do Drawer
export type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
};

// Rotas principais do app
export type RootStackParamList = {
  // Auth Routes
  SignIn: undefined;
  CreateAccounts: undefined;
  ForgotPassword: undefined;
  CodeOtp: undefined;

  // App Routes
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
  Prepare: {
    item: {
      id: number;
      name: string;
      image: string;
      description: string;
      favorite: boolean;
    };
  };
  AllRecipes: undefined;
  NewAddRecipiesScreen: undefined;
}; 