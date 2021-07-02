
interface AuthHeaders {
    headers: {
        Authorization: string
    }
}

export function authHeaders(token: string): AuthHeaders {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }