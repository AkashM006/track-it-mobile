import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FormProps } from './types';
import commonStyles from '../../styles/common.styles';
import authStyles from './auth.styles';
import useFormState from '../../hooks/useFormState';
import useFormValidation from '../../hooks/useFormValidation';
import UserSchema from '../../schema/auth.schema';

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

  const onLogin = () => {
    const values = getValues();
    const isValid = validate(values);

    if (!isValid) return;
    // Todo: Make API calls
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
        style={commonStyles.buttonStyles.primary}
        onPress={onLogin}
      >
        <Text style={commonStyles.buttonStyles.primaryText}>Login</Text>
      </TouchableOpacity>
      <View style={authStyles.actionContainer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => setIsLogin(false)}>
          <Text style={authStyles.action}>Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
