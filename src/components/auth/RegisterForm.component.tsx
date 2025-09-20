import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FormProps } from './types';
import commonStyles from '../../styles/common.styles';
import authStyles from './auth.styles';
import useFormState from '../../hooks/common/useFormState';
import useFormValidation from '../../hooks/common/useFormValidation';
import UserSchema from '../../schema/auth.schema';

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
  const { formState, setError, resetErrors, getValues, onChange } =
    useFormState<RegisterForm>(initForm);
  const { validate } = useFormValidation<RegisterForm>(
    UserSchema.userRegistrationSchema,
    setError,
    resetErrors,
  );

  const onRegister = () => {
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
