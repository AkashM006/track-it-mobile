import React, {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useCallback,
} from 'react';
import { IUser } from '../types/User';
import { Session } from '../utils/persist.utils';

type UserState = {
  user: IUser | null | undefined;
  sessionId: Session;
};

type Action =
  | { type: 'SET_USER'; payload: IUser }
  | { type: 'CLEAR_USER' }
  | { type: 'UPDATE_USER'; payload: IUser }
  | { type: 'SET_SID'; payload: string };

function userReducer(state: UserState, action: Action): UserState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'CLEAR_USER':
      return { ...state, user: null, sessionId: null };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'SET_SID':
      return {
        ...state,
        sessionId: action.payload,
      };
    default:
      return state;
  }
}

const initialState: UserState = { user: null, sessionId: null };

type UserContextType = {
  state: UserState;
  setUser: (user: IUser) => void;
  setSid: (sid: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = useCallback((user: IUser) => {
    dispatch({
      type: 'SET_USER',
      payload: user,
    });
  }, []);

  const setSid = useCallback((sid: string) => {
    dispatch({
      type: 'SET_SID',
      payload: sid,
    });
  }, []);

  const logout = useCallback(() => {
    dispatch({
      type: 'CLEAR_USER',
    });
  }, []);

  return (
    <UserContext.Provider value={{ state, setUser, setSid, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserDetails = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
