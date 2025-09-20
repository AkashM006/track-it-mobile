interface ApiResponse<T> {
  success: boolean;
  msg: string[];
  results: T | null | undefined;
}

export default ApiResponse;
