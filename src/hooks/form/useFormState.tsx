import { useState } from 'react';

type FieldState = {
  value: string;
  error?: string;
};

type FormState<T extends Record<string, any>> = {
  [K in keyof T]: FieldState;
};

const useFormState = <T extends Record<string, any>>(initialValues: T) => {
  const [formState, setFormState] = useState<FormState<T>>(() => {
    const init: any = {};
    for (const key in initialValues) {
      init[key] = { value: initialValues[key] ?? '', error: undefined };
    }
    return init;
  });

  const onChange = <K extends keyof T>(field: K, value: string) => {
    setFormState(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        // error: undefined, // clear error when typing
      },
    }));
  };

  const setError = <K extends keyof T>(field: K, error: string) => {
    setFormState(prev => ({
      ...prev,
      [field]: { ...prev[field], error },
    }));
  };

  const resetErrors = () => {
    setFormState(prev => {
      const result: any = {};
      Object.entries(prev).forEach(([key, value]) => {
        result[key] = { ...value, error: null };
      });
      return result;
    });
  };

  const getValues = (): T => {
    return Object.fromEntries(
      Object.entries(formState).map(([k, v]) => [k, v.value]),
    ) as T;
  };

  return {
    formState,
    onChange,
    setError,
    getValues,
    setFormState,
    resetErrors,
  };
};

export default useFormState;
