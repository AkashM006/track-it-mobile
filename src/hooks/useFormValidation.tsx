import { ZodError, ZodObject, ZodRawShape } from 'zod';

const useFormValidation = <T extends Record<string, any>>(
  schema: ZodObject<ZodRawShape>,
  setError: (field: keyof T, error: string) => void,
  resetErrors: () => void,
) => {
  const validate = (values: T): boolean => {
    resetErrors();
    try {
      schema.parse(values);
      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        err.issues.forEach(issue => {
          const field = issue.path[0] as keyof T;
          setError(field, issue.message);
        });
      }
      return false;
    }
  };

  return { validate };
};

export default useFormValidation;
