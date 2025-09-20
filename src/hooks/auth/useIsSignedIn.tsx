import { useUserDetails } from '../../context/user.context';

const useIsSignedIn = () => {
  const {
    state: { user },
  } = useUserDetails();

  if (!user) return false;

  return true;
};

export default useIsSignedIn;
