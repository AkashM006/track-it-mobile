import useIsSignedIn from './useIsSignedIn';

const useIsSignedOut = () => !useIsSignedIn();

export default useIsSignedOut;
