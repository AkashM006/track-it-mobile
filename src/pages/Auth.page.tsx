import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Wallet } from 'lucide-react-native';
import COLORS from '../styles/colors';
import REM from '../styles/size';
import LoginForm from '../components/auth/LoginForm.component';
import RegisterForm from '../components/auth/RegisterForm.component';

type FormProps = {
  setIsLogin: (isLogin: boolean) => void;
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
});

export default Auth;
