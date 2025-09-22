import { useState } from 'react';
import { MutationState } from '../../types/MutationState';
import ApiResponse from '../../types/ApiResponse';
import { useCommonUI } from '../../context/commonUI.context';

export type UseMutationOptions<T, TArgs extends any[]> = {
  onSuccess?: (data: T, ...args: TArgs) => void;
  onError?: (error: string) => void;
  showLoader?: boolean;
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

  const { load } = useCommonUI();

  const showLoader = options?.showLoader ?? true;

  const mutate = async (...args: TArgs) => {
    setMutationState({
      ...initialValue,
      status: 'loading',
    });

    if (showLoader) load(true);

    const result = await mutationFn(...args);

    if (result.success) {
      const data = result.results;
      setMutationState({
        status: 'success',
        error: null,
        data,
      });
      if (showLoader) load(false);
      options?.onSuccess?.(data!, ...args);
    } else {
      const error = result.msg?.[0] ?? 'Something went wrong';
      setMutationState({
        status: 'error',
        error,
        data: null,
      });
      if (showLoader) load(false);
      options?.onError?.(error);
    }
  };

  const isLoading = mutationState.status === 'loading';

  return { mutationState, mutate, isLoading };
};

export default useMutation;
