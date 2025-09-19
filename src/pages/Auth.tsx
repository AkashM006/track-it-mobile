import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Wallet } from 'lucide-react-native';
import COLORS from '../styles/colors';
import REM from '../styles/size';
import commonStyles from '../styles/common';
import LoginForm from '../components/auth/LoginForm';

type FormProps = {
  setIsLogin: (isLogin: boolean) => void;
};

const RegisterForm = ({ setIsLogin }: FormProps) => {
  const onRegister = () => {};

  return (
    <View style={styles.form}>
      <View style={commonStyles.formStyles.formGroup}>
        <Text style={commonStyles.formStyles.label}>Email:</Text>
        <TextInput
          keyboardType="email-address"
          placeholder="Enter your email"
          style={{ ...styles.input, ...commonStyles.formStyles.input }}
        />
      </View>
      <View style={commonStyles.formStyles.formGroup}>
        <Text style={commonStyles.formStyles.label}>Name:</Text>
        <TextInput
          placeholder="Enter your name"
          style={{ ...styles.input, ...commonStyles.formStyles.input }}
        />
      </View>
      <View style={commonStyles.formStyles.formGroup}>
        <Text style={commonStyles.formStyles.label}>Password:</Text>
        <TextInput
          placeholder="Enter your password"
          style={{ ...styles.input, ...commonStyles.formStyles.input }}
          secureTextEntry
        />
      </View>
      <View style={commonStyles.formStyles.formGroup}>
        <Text style={commonStyles.formStyles.label}>Confirm Password:</Text>
        <TextInput
          placeholder="Confirm your password"
          style={{ ...styles.input, ...commonStyles.formStyles.input }}
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
      <View style={styles.actionContainer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => setIsLogin(true)}>
          <Text style={styles.action}>Login here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const title = isLogin ? 'Welcome Back' : 'Create Account';
  const subtitle = isLogin
    ? 'Login to continue to Track-It'
    : 'Join Track-It to track your expenses';

  const formProps: FormProps = {
    setIsLogin,
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Wallet size={REM * 3} color={COLORS.onPrimary} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        {isLogin ? (
          <LoginForm {...formProps} />
        ) : (
          <RegisterForm {...formProps} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    width: '80%',
    maxWidth: 400,
    marginInline: 'auto',
    marginBlock: REM * 2,
    paddingBlock: REM * 2,
    paddingInline: REM,
    borderRadius: REM * 0.5,
    backgroundColor: COLORS.surfaceLight,
    boxShadow: `0 1px 2px 0 rgba(${COLORS.accentLight}, 1)`,
  },
  logoContainer: {
    backgroundColor: COLORS.primaryColor,
    alignSelf: 'center',
    padding: REM * 0.5,
    borderRadius: REM * 0.5,
  },
  titleContainer: {
    marginBlock: REM * 1.5,
  },
  title: {
    fontSize: REM * 2,
    textAlign: 'center',
    color: COLORS.accent,
  },
  subtitle: { textAlign: 'center' },
  input: {},
  form: {
    gap: REM,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: REM * 0.5,
  },
  action: {
    color: COLORS.primaryColor,
  },
});

export default Auth;
