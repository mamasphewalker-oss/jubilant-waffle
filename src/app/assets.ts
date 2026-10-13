/** Resolve local, registered web assets relative to the deployed app, never disk paths. */
export function resolveAssetUrl(
  path: string,
  base = import.meta.env.BASE_URL,
): string {
  if (
    !path ||
    /[\\?#:%]/.test(path) ||
    path.startsWith("/") ||
    path.split("/").some((part) => !part || part === "." || part === "..")
  ) {
    throw new Error("Expected a relative local asset path");
  }
  return `${base.replace(/\/?$/, "/")}${path}`;
}
