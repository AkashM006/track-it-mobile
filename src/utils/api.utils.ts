import { API_LINK } from '../config/api.config';
import ApiResponse from '../types/ApiResponse';

const timeout = 15 * 1000;

const get = async <T>(
  link: string,
  sessionId: string | undefined | null,
): Promise<ApiResponse<T>> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  let response;
  try {
    response = await fetch(`${API_LINK}${link}`, {
      headers: {
        Authorization: `Session ${sessionId}`,
      },
      signal: controller.signal,
    });
  } catch (error) {
    console.error({ error });
    return {
      results: undefined,
      msg: ['Unable to reach server'],
      success: false,
    };
  } finally {
    clearTimeout(id);
  }

  try {
    const parsedResponse: ApiResponse<T> = await response.json();

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
  method: string = 'POST',
): Promise<ApiResponse<T>> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  let result;
  try {
    result = await fetch(`${API_LINK}${link}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Session ${sessionId ?? ''}`,
      },
      method,
      signal: controller.signal,
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error({ error });
    return {
      results: undefined,
      msg: ['Unable to reach server'],
      success: false,
    };
  } finally {
    clearTimeout(id);
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
