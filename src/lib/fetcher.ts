// lib/services/fetcher.ts

/**
 * Universal fetcher for SWR or standalone calls.
 * Always includes NextAuth’s session cookie.
 *
 * @param url     The API endpoint to call
 * @param options Optional fetch options (method, body, headers, etc.)
 * @returns       Parsed JSON response, or throws an Error on non-2xx
 */
export async function fetcher<T = any>(url: string, options: RequestInit = {}): Promise<T> {
  // Merge in credentials and JSON headers
  const res = await fetch(url, {
    credentials: 'include', // ← include next-auth.session-token
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  // Throw on error to let SWR (or your try/catch) handle it
  if (!res.ok) {
    const error = new Error(`Request failed with status ${res.status}: ${res.statusText}`);
    // @ts-ignore
    error.status = res.status;
    throw error;
  }

  // Parse JSON (you can switch to text() or blob() if needed)
  return res.json();
}

