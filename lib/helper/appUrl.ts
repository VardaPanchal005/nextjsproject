export function getAppUrl(path: string = ""): string {
    const baseUrl = process.env.APP_URL || "http://localhost:3000";
    return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  }
  