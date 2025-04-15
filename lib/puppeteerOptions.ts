"use server";
import chromium from "@sparticuz/chromium";

const getLocalChromePath = () => {
  if (process.platform === "win32") {
    return "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  } else if (process.platform === "linux") {
    return "/usr/bin/google-chrome";
  } else {
    return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  }
};

export async function getOptions() {
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    return {
      args: [],
      executablePath: getLocalChromePath(),
      headless: true,
    };
  } else {
    return {
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    };
  }
}
