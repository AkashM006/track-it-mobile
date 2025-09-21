import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FormProps } from './types';
import commonStyles from '../../styles/common.styles';
import authStyles from './auth.styles';
import useFormState from '../../hooks/form/useFormState';
import useFormValidation from '../../hooks/form/useFormValidation';
import UserSchema from '../../schema/auth.schema';
import useMutation from '../../hooks/api/useMutation';
import AuthService, { RegisterApiResponse } from '../../services/auth.service';
import { useUserDetails } from '../../context/user.context';
import PersistUtils from '../../utils/persist.utils';
import UserService, {
  UserDetailsApiResponse,
} from '../../services/user.service';
import useQuery from '../../hooks/api/useQuery';
import { IRegisterUser } from '../../types/User';

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initForm: RegisterForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterForm = ({ setIsLogin }: FormProps) => {
  const {
    state: { sessionId },
    setUser,
    setSid,
  } = useUserDetails();
  const { formState, setError, resetErrors, getValues, onChange } =
    useFormState<RegisterForm>(initForm);
  const { validate } = useFormValidation<RegisterForm>(
    UserSchema.userRegistrationSchema,
    setError,
    resetErrors,
  );

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

  const onRegisterSuccess = async (data: RegisterApiResponse) => {
    await PersistUtils.setSessionId(data.sid);
    setSid(data.sid);

    if (!data.sid) {
      console.error('Whoops: Auth Failed, did not get sid from server');
      Alert.alert('Whoops!', 'Authentication failed');
      return;
    }
    userDetailsQuery.execute(data.sid);
  };

  const registerMutation = useMutation(AuthService.register, {
    onSuccess: onRegisterSuccess,
    onError: onApiError,
  });

  const onRegister = () => {
    const values = getValues();
    const isValid = validate(values);

    if (!isValid) return;

    const user: IRegisterUser = {
      email: values.email,
      name: values.name,
      password: values.password,
    };

    registerMutation.mutate(user, sessionId);
  };

  return (
    <View style={authStyles.form}>
      <View style={commonStyles.formStyles.formGroup}>
        <Text style={commonStyles.formStyles.label}>Email:</Text>
        <TextInput
          value={formState.email.value}
          onChangeText={e => onChange('email', e)}
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
        <Text style={commonStyles.formStyles.label}>Name:</Text>
        <TextInput
          value={formState.name.value}
          onChangeText={e => onChange('name', e)}
          placeholder="Enter your name"
          style={{ ...authStyles.input, ...commonStyles.formStyles.input }}
        />
        {formState.name.error ? (
          <Text style={commonStyles.formStyles.errorText}>
            {formState.name.error}
          </Text>
        ) : null}
      </View>
      <View style={commonStyles.formStyles.formGroup}>
        <Text style={commonStyles.formStyles.label}>Password:</Text>
        <TextInput
          value={formState.password.value}
          onChangeText={e => onChange('password', e)}
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
      <View style={commonStyles.formStyles.formGroup}>
        <Text style={commonStyles.formStyles.label}>Confirm Password:</Text>
        <TextInput
          value={formState.confirmPassword.value}
          onChangeText={e => onChange('confirmPassword', e)}
          placeholder="Confirm your password"
          style={{ ...authStyles.input, ...commonStyles.formStyles.input }}
          secureTextEntry
        />
        {formState.confirmPassword.error ? (
          <Text style={commonStyles.formStyles.errorText}>
            {formState.confirmPassword.error}
          </Text>
        ) : null}
      </View>
      <TouchableOpacity
        style={commonStyles.buttonStyles.primary}
        onPress={onRegister}
      >
        <Text style={commonStyles.buttonStyles.primaryText}>
          Create Account
        </Text>
      </TouchableOpacity>
      <View style={authStyles.actionContainer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => setIsLogin(true)}>
          <Text style={authStyles.action}>Login here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterForm;
