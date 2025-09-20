import Keychain from 'react-native-keychain';

export type Session = string | undefined | null;

const setSessionId = async (sessionId: string): Promise<boolean> => {
  try {
    await Keychain.setGenericPassword('user', sessionId, { service: 'sid' });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getSessionId = async (): Promise<Session> => {
  try {
    const credentials = await Keychain.getGenericPassword({ service: 'sid' });

    if (credentials) {
      return credentials.password;
    }

    return undefined;
  } catch (error) {
    console.error(error);

    return undefined;
  }
};

const resetSessionId = async (): Promise<boolean> => {
  try {
    await Keychain.resetGenericPassword({
      service: 'sid',
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const PersistUtils = { setSessionId, getSessionId, resetSessionId };

export default PersistUtils;
