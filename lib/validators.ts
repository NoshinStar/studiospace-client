export function validatePassword(password: string): string | null {
  if (password.length < 6)
    return "Password must be at least 6 characters long.";

  if (!/[A-Z]/.test(password))
    return "Password must include an uppercase letter.";

  if (!/[a-z]/.test(password))
    return "Password must include a lowercase letter.";

  return null;
}

// Only accept callback URLs that are paths on our own site.
export function safeCallback(url?: string): string {
  return url && url.startsWith("/") && !url.startsWith("//")
    ? url
    : "/";
}