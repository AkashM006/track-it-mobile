import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useUserDetails } from '../context/user.context';
import PersistUtils from '../utils/persist.utils';
import useMutation from '../hooks/api/useMutation';
import AuthService from '../services/auth.service';

const HomePage = () => {
  const {
    state: { sessionId },
    logout,
  } = useUserDetails();

  const onLogoutSuccess = async () => {
    logout();
    await PersistUtils.resetSessionId();
  };

  const onLogoutError = (error: string) => {
    Alert.alert('Whoops!', error);
  };

  const logoutMutation = useMutation(AuthService.logout, {
    onSuccess: onLogoutSuccess,
    onError: onLogoutError,
  });

  const onLogout = async () => {
    logoutMutation.mutate(sessionId);
  };

  return (
    <View>
      <TouchableOpacity onPress={onLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;
