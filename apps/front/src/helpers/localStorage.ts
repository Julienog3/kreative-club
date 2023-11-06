const TOKEN_LOCAL_STORAGE_KEY = "KREATIVE_CLUB-TOKEN";
const SESSION_LOCAL_STORAGE_ID = "SESSION_ID";

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, JSON.stringify(token));
}

export function getToken(): string | undefined {
  const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  return token ? JSON.parse(token) : undefined;
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
}

export function saveSession(id: string): void {
  localStorage.setItem(SESSION_LOCAL_STORAGE_ID, JSON.stringify(id));
}

export function getSession(): string | undefined {
  const id = localStorage.getItem(SESSION_LOCAL_STORAGE_ID);
  return id ? JSON.parse(id) : undefined;
}

export function removeSession(): void {
  localStorage.removeItem(SESSION_LOCAL_STORAGE_ID);
}
