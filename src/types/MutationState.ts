interface MutationState<T> {
  status: 'success' | 'loading' | 'error' | 'idle';
  error: string | null;
  data: T | null | undefined;
}

interface QueryState<T> {
  status: 'success' | 'loading' | 'error' | 'idle';
  error: string | null;
  data: T | null | undefined;
}

export type { QueryState, MutationState };
