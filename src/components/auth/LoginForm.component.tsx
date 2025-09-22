import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FormProps } from './types';
import commonStyles from '../../styles/common.styles';
import authStyles from './auth.styles';
import useFormState from '../../hooks/form/useFormState';
import useFormValidation from '../../hooks/form/useFormValidation';
import UserSchema from '../../schema/auth.schema';
import { useUserDetails } from '../../context/user.context';
import AuthService, { LoginApiResponse } from '../../services/auth.service';
import useMutation from '../../hooks/api/useMutation';
import PersistUtils from '../../utils/persist.utils';
import useQuery from '../../hooks/api/useQuery';
import UserService, {
  UserDetailsApiResponse,
} from '../../services/user.service';
import { useCommonUI } from '../../context/commonUI.context';

type LoginForm = {
  email: string;
  password: string;
};

const initForm: LoginForm = {
  email: '',
  password: '',
};

const LoginForm = ({ setIsLogin }: FormProps) => {
  const { formState, onChange, setError, getValues, resetErrors } =
    useFormState<LoginForm>(initForm);
  const { validate } = useFormValidation<LoginForm>(
    UserSchema.userLoginSchema,
    setError,
    resetErrors,
  );

  const {
    state: { sessionId },
    setUser,
    setSid,
  } = useUserDetails();
  const {
    state: { isLoading },
  } = useCommonUI();

  const onApiError = (error: string) => {
    console.error({ error });
    Alert.alert('Whoops!', error);
  };

  const onUserDetailsSuccess = async (data: UserDetailsApiResponse) => {
    const { email, name } = data;
    setUser({
      email,
      name,
    });
  };

  const userDetailsQuery = useQuery(UserService.getUserDetails, {
    idleOnInit: true,
    onSuccess: onUserDetailsSuccess,
    onError: onApiError,
  });

  const onLoginSuccess = async (data: LoginApiResponse) => {
    await PersistUtils.setSessionId(data.sid);
    setSid(data.sid);

    if (!data.sid) {
      console.error('Whoops: Auth Failed, did not get sid from server');
      Alert.alert('Whoops!', 'Authentication failed');
      return;
    }
    userDetailsQuery.execute(data.sid);
  };

  const loginMutation = useMutation(AuthService.login, {
    onSuccess: onLoginSuccess,
    onError: onApiError,
  });

  const onLogin = async () => {
    const values = getValues();
    const isValid = validate(values);

    if (!isValid) return;

    loginMutation.mutate(values, sessionId);
  };

  return (
    <View style={authStyles.form}>
      <View style={commonStyles.formStyles.formGroup}>
        <Text style={commonStyles.formStyles.label}>Email:</Text>
        <TextInput
          value={formState.email.value}
          onChangeText={value => onChange('email', value)}
          keyboardType="email-address"
          placeholder="Enter your email"
          style={{ ...authStyles.input, ...commonStyles.formStyles.input }}
        />
        {formState.email.error ? (
          <Text style={commonStyles.formStyles.errorText}>
            {formState.email.error}
          </Text>
        ) : null}
      </View>
      <View style={commonStyles.formStyles.formGroup}>
        <Text style={commonStyles.formStyles.label}>Password:</Text>
        <TextInput
          value={formState.password.value}
          onChangeText={value => onChange('password', value)}
          placeholder="Enter your password"
          style={{ ...authStyles.input, ...commonStyles.formStyles.input }}
          secureTextEntry
        />
        {formState.password.error ? (
          <Text style={commonStyles.formStyles.errorText}>
            {formState.password.error}
          </Text>
        ) : null}
      </View>
      <TouchableOpacity
        style={{
          ...commonStyles.buttonStyles.primary,
          ...(isLoading ? commonStyles.buttonStyles.disabled : {}),
        }}
        onPress={onLogin}
        disabled={isLoading}
      >
        <Text style={commonStyles.buttonStyles.primaryText}>Login</Text>
      </TouchableOpacity>
      <View style={authStyles.actionContainer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => setIsLogin(false)}
          style={isLoading ? commonStyles.buttonStyles.disabled : {}}
        >
          <Text style={authStyles.action}>Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
