import { API_LINK } from '../config/api.config';
import ApiResponse from '../types/ApiResponse';

const get = async <T>(
  link: string,
  sessionId: string | undefined | null,
): Promise<ApiResponse<T>> => {
  let result;
  try {
    result = await fetch(`${API_LINK}${link}`, {
      headers: {
        Authorization: `Session ${sessionId}`,
      },
    });
  } catch (error) {
    console.error({ error });
    return {
      results: undefined,
      msg: ['Unable to reach server'],
      success: false,
    };
  }

  try {
    const parsedResponse: ApiResponse<T> = await result.json();

    return parsedResponse;
  } catch (error) {
    console.error({ error });
    return {
      results: undefined,
      msg: ['Something went wrong'],
      success: false,
    };
  }
};

const post = async <T>(
  link: string,
  body: Record<string, any>,
  sessionId: string | undefined | null,
): Promise<ApiResponse<T>> => {
  let result;
  try {
    result = await fetch(`${API_LINK}${link}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Session ${sessionId ?? ''}`,
      },
      method: 'POST',
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error({ error });
    return {
      results: undefined,
      msg: ['Unable to reach server'],
      success: false,
    };
  }

  try {
    const parsedResponse: ApiResponse<T> = await result.json();

    return parsedResponse;
  } catch (error) {
    console.error({ error });
    return {
      results: undefined,
      msg: ['Something went wrong'],
      success: false,
    };
  }
};

const API = { get, post };

export default API;
