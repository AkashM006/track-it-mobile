import { useState } from 'react';
import ApiResponse from '../../types/ApiResponse';
import { QueryState } from '../../types/MutationState';

export type UseQueryOptions<T, TArgs extends any[]> = {
  initialData?: T;
  placeholder?: T;
  idleOnInit?: boolean;
  onSuccess?: (data: T, ...args: TArgs) => void;
  onError?: (error: string) => void;
};

const useQuery = <TArgs extends any[], TResult>(
  queryFn: (...args: TArgs) => Promise<ApiResponse<TResult>>,
  options: UseQueryOptions<TResult, TArgs>,
) => {
  const initialValue = {
    status: options.idleOnInit ? ('idle' as const) : ('loading' as const),
    error: null,
    data: options.initialData,
  };

  const [queryState, setQueryState] =
    useState<QueryState<TResult>>(initialValue);

  const execute = async (...args: TArgs) => {
    setQueryState({
      ...initialValue,
      status: 'loading',
    });

    const result = await queryFn(...args);

    if (result.success) {
      const data = result.results;
      setQueryState({
        status: 'success',
        error: null,
        data,
      });
      options?.onSuccess?.(data!, ...args);
    } else {
      const error = result.msg?.[0] ?? 'Something went wrong';
      setQueryState({
        status: 'error',
        error,
        data: null,
      });
    }
  };

  return { execute, queryState };
};

export default useQuery;
