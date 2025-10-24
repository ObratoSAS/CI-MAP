import 'server-only';

export async function apiFetch<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE ?? ''}${input}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers
    },
    next: {revalidate: init?.cache === 'no-store' ? 0 : undefined}
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return (await res.json()) as T;
}
