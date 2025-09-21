import ApiResponse from '../types/ApiResponse';
import { ILoginUser, IRegisterUser } from '../types/User';
import API from '../utils/api.utils';
import { Session } from '../utils/persist.utils';

export type LoginApiResponse = {
  sid: string;
};

export type RegisterApiResponse = {
  sid: string;
};

const authRoute = '/user';

const login = async (
  user: ILoginUser,
  sessionId: Session,
): Promise<ApiResponse<LoginApiResponse>> => {
  const body = { ...user };

  const result = await API.post<LoginApiResponse>(
    `${authRoute}/login`,
    body,
    sessionId,
  );

  return result;
};

const register = async (
  user: IRegisterUser,
  sessionId: Session,
): Promise<ApiResponse<RegisterApiResponse>> => {
  const body = { ...user };

  const result = await API.post<RegisterApiResponse>(
    `${authRoute}/register`,
    body,
    sessionId,
  );

  return result;
};

const logout = async (sessionId: Session): Promise<ApiResponse<unknown>> => {
  return API.post(`${authRoute}/logout`, {}, sessionId);
};

const AuthService = { login, register, logout };

export default AuthService;
