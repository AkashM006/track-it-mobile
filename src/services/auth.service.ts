import ApiResponse from '../types/ApiResponse';
import { ILoginUser } from '../types/User';
import API from '../utils/api.utils';
import { Session } from '../utils/persist.utils';

export type LoginApiResponse = {
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

const logout = async (sessionId: Session): Promise<ApiResponse<unknown>> => {
  return API.post(`${authRoute}/logout`, {}, sessionId);
};

const AuthService = { login, logout };

export default AuthService;
