import React, { createContext, useReducer, ReactNode, useContext } from 'react';
import { IUser } from '../types/user';

type UserState = {
  user: IUser | null | undefined;
};

// Action types
type Action =
  | { type: 'SET_USER'; payload: IUser }
  | { type: 'CLEAR_USER' }
  | { type: 'UPDATE_USER'; payload: IUser };

// Reducer
function userReducer(state: UserState, action: Action): UserState {
  switch (action.type) {
    case 'SET_USER':
      return { user: action.payload };
    case 'CLEAR_USER':
      return { user: null };
    case 'UPDATE_USER':
      return { user: state.user ? { ...state.user, ...action.payload } : null };
    default:
      return state;
  }
}

// Initial state
const initialState: UserState = { user: null };

type UserContextType = {
  state: UserState;
  dispatch: React.Dispatch<Action>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
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
