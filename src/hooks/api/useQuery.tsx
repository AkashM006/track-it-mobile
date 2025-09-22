import { useCallback, useMemo, useState } from 'react';
import ApiResponse from '../../types/ApiResponse';
import { QueryState } from '../../types/MutationState';
import { useCommonUI } from '../../context/commonUI.context';

export type UseQueryOptions<T, TArgs extends any[]> = {
  initialData?: T;
  placeholder?: T;
  idleOnInit?: boolean;
  showLoader?: boolean;
  onSuccess?: (data: T, ...args: TArgs) => void;
  onError?: (error: string) => void;
};

const useQuery = <TArgs extends any[], TResult>(
  queryFn: (...args: TArgs) => Promise<ApiResponse<TResult>>,
  options: UseQueryOptions<TResult, TArgs>,
) => {
  const initialValue = useMemo(() => {
    return {
      status: options.idleOnInit ? ('idle' as const) : ('loading' as const),
      error: null,
      data: options.initialData,
    };
  }, [options]);

  const [queryState, setQueryState] =
    useState<QueryState<TResult>>(initialValue);

  const { load } = useCommonUI();

  const showLoader = options?.showLoader ?? true;

  const execute = useCallback(
    async (...args: TArgs) => {
      setQueryState({
        ...initialValue,
        status: 'loading',
      });

      if (showLoader) load(true);
      const result = await queryFn(...args);

      if (result.success) {
        const data = result.results;
        setQueryState({
          status: 'success',
          error: null,
          data,
        });
        if (showLoader) load(false);
        options?.onSuccess?.(data!, ...args);
      } else {
        const error = result.msg?.[0] ?? 'Something went wrong';
        setQueryState({
          status: 'error',
          error,
          data: null,
        });
        if (showLoader) load(false);
        options?.onError?.(error);
      }
    },
    [initialValue, options, queryFn, setQueryState, load, showLoader],
  );

  return { execute, queryState };
};

export default useQuery;
