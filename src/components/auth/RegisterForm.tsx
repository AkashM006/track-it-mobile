import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FormProps } from './types';
import commonStyles from '../../styles/common';
import authStyles from './authStyles';

const RegisterForm = ({ setIsLogin }: FormProps) => {
  const onRegister = () => {};

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
        <Text style={commonStyles.formStyles.label}>Name:</Text>
        <TextInput
          placeholder="Enter your name"
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
      <View style={commonStyles.formStyles.formGroup}>
        <Text style={commonStyles.formStyles.label}>Confirm Password:</Text>
        <TextInput
          placeholder="Confirm your password"
          style={{ ...authStyles.input, ...commonStyles.formStyles.input }}
          secureTextEntry
        />
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
