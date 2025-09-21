import { useCallback, useEffect, useMemo } from 'react';
import { useUserDetails } from '../../context/user.context';
import { IUser } from '../../types/User';
import { Alert } from 'react-native';
import useQuery from '../../hooks/api/useQuery';
import UserService from '../../services/user.service';
import PersistUtils from '../../utils/persist.utils';

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserDetailsComponent = ({ setLoading }: Props) => {
  const { setSid, setUser } = useUserDetails();

  const onUserDetailsSuccess = useCallback(
    (user: IUser) => {
      setUser(user);
      setLoading(false);
    },
    [setUser, setLoading],
  );

  const onUserDetailsError = useCallback(
    (error: string) => {
      console.error({ error });
      Alert.alert('Whoops!', error);
      setLoading(false);
    },
    [setLoading],
  );

  const queryDetailsOptions = useMemo(
    () => ({
      idleOnInit: true,
      onSuccess: onUserDetailsSuccess,
      onError: onUserDetailsError,
    }),
    [onUserDetailsSuccess, onUserDetailsError],
  );

  const { execute } = useQuery(UserService.getUserDetails, queryDetailsOptions);

  const loadSidAndGetUserDetails = useCallback(async () => {
    const persistedSid = await PersistUtils.getSessionId();
    const sid = persistedSid ?? '';
    setSid(sid);
    if (sid !== '') execute(sid);
    else {
      setLoading(false);
    }
  }, [setSid, execute, setLoading]);

  useEffect(() => {
    loadSidAndGetUserDetails();
  }, [loadSidAndGetUserDetails]);

  return null;
};

export default UserDetailsComponent;
