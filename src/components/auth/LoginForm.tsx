import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FormProps } from './types';
import commonStyles from '../../styles/common';
import authStyles from './authStyles';

const LoginForm = ({ setIsLogin }: FormProps) => {
  const onLogin = () => {};

  return (
    <View style={authStyles.form}>
      <View style={commonStyles.formStyles.formGroup}>
        <Text style={commonStyles.formStyles.label}>Email:</Text>
        <TextInput
          keyboardType="email-address"
          placeholder="Enter your email"
          style={{ ...authStyles.input, ...commonStyles.formStyles.input }}
        />
      </View>
      <View style={commonStyles.formStyles.formGroup}>
        <Text style={commonStyles.formStyles.label}>Password:</Text>
        <TextInput
          placeholder="Enter your password"
          style={{ ...authStyles.input, ...commonStyles.formStyles.input }}
          secureTextEntry
        />
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
