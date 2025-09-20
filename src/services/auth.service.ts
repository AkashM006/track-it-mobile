import ApiResponse from '../types/ApiResponse';
import { ILoginUser } from '../types/User';
import API from '../utils/api.utils';

export type LoginApiResponse = {
  sid: string;
};

const authRoute = '/user';

const login = async (
  user: ILoginUser,
  sessionId: string | undefined | null,
): Promise<ApiResponse<LoginApiResponse>> => {
  const body = { ...user };

  const result = await API.post<LoginApiResponse>(
    `${authRoute}/login`,
    body,
    sessionId,
  );

  return result;
};

const AuthService = { login };

export default AuthService;
