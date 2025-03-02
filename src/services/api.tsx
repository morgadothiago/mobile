import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';
import type { IErrorResponse, ILoginResponse } from '../types/apiServicesType';
import type { IRecoveryCode } from '../types/recovery.type';
import type { IVerifyRecoveryCodeResponse } from '../types/verifyRecoveryCode.type';




class apiServices {
  private api: AxiosInstance;
  static instance: apiServices;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://192.168.100.73:4000',
    })
    console.log('apiServices constructor')
  }

  async login(email: string, password: string): Promise<ILoginResponse | IErrorResponse> {

    return this.api.post('/auth/login', { email, password })
      .then(this.getResponse<ILoginResponse>)
      .catch(this.getError);
  }

  async SignUp(email: string, password: string): Promise<void | IErrorResponse> {

    return this.api.post('/auth/signup', { email, password })
      .then(this.getResponse<void>)
      .catch(this.getError);
  }
  async sendEmailRecovery(email: string): Promise<IRecoveryCode | IErrorResponse> {
    return this.api.post('/auth/recovery-code', { email })
      .then(this.getResponse<IRecoveryCode>)
      .catch(this.getError);
  }
  async verifyRecoveryCode(codigo: string, email: string): Promise<IVerifyRecoveryCodeResponse | IErrorResponse> {
    return this.api.post('/auth/verify-recovery-code', { codigo, email })
      .then(this.getResponse<IVerifyRecoveryCodeResponse>)
      .catch(this.getError);
  }



  private async getResponse<T>(response: AxiosResponse<T>) {
    return response.data;
  }

  private async getError(error: AxiosError<any>): Promise<IErrorResponse> {
    console.log(error)
    if (error.status === 422) {

      return {
        message: error.response?.data,
        status: error.status,
      };

    }
    if ([404, 409, 401].includes(error.status)) {

      return {
        message: error.response?.data?.message,
        status: error.status,
      };
    }
    return {
      message: 'Error interno do servidor',
      status: error.status || 500,
    };
  }
  static getInstance() {
    if (!apiServices.instance) {
      apiServices.instance = new apiServices();
    }
    return apiServices.instance;
  }
}

export default apiServices.getInstance();
