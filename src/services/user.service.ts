import ApiResponse from '../types/ApiResponse';
import { IUser } from '../types/User';
import API from '../utils/api.utils';

export type UserDetailsApiResponse = IUser;

const userRoute = '/user';

const getUserDetails = async (
  sessionId: string,
): Promise<ApiResponse<UserDetailsApiResponse>> =>
  API.get<UserDetailsApiResponse>(userRoute, sessionId);

const UserService = { getUserDetails };

export default UserService;
