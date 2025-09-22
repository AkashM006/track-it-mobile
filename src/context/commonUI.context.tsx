import React, {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useCallback,
} from 'react';

type CommonUIState = {
  isLoading: boolean;
};

type Action = { type: 'SET_LOADING'; payload: boolean };

function commonUIReducer(state: CommonUIState, action: Action): CommonUIState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

const initialState: CommonUIState = { isLoading: false };

type CommonUIContextType = {
  state: CommonUIState;
  load: (isLoading: boolean) => void;
};

const CommonUIContext = createContext<CommonUIContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export const CommonUIProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(commonUIReducer, initialState);

  const load = useCallback((isLoading: boolean) => {
    dispatch({
      type: 'SET_LOADING',
      payload: isLoading,
    });
  }, []);

  return (
    <CommonUIContext.Provider value={{ state, load }}>
      {children}
    </CommonUIContext.Provider>
  );
};

export const useCommonUI = () => {
  const context = useContext(CommonUIContext);
  if (!context) {
    throw new Error('useCommonUI must be used within a CommonUIProvider');
  }
  return context;
};
