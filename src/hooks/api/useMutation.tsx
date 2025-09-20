import { useState } from 'react';
import { MutationState } from '../../types/MutationState';
import ApiResponse from '../../types/ApiResponse';

export type UseMutationOptions<T, TArgs extends any[]> = {
  onSuccess?: (data: T, ...args: TArgs) => void;
  onError?: (error: string) => void;
};

const useMutation = <TArgs extends any[], TResult>(
  mutationFn: (...args: TArgs) => Promise<ApiResponse<TResult>>,
  options: UseMutationOptions<TResult, TArgs> = {},
) => {
  const initialValue = {
    status: 'idle' as const,
    error: null,
    data: null,
  };

  const [mutationState, setMutationState] =
    useState<MutationState<TResult>>(initialValue);

  const mutate = async (...args: TArgs) => {
    setMutationState({
      ...initialValue,
      status: 'loading',
    });

    const result = await mutationFn(...args);

    if (result.success) {
      const data = result.results;
      setMutationState({
        status: 'success',
        error: null,
        data,
      });
      options?.onSuccess?.(data!, ...args);
    } else {
      const error = result.msg?.[0] ?? 'Something went wrong';
      setMutationState({
        status: 'error',
        error,
        data: null,
      });
    }
  };

  const isLoading = mutationState.status === 'loading';

  return { mutationState, mutate, isLoading };
};

export default useMutation;
