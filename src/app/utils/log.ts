import appConfig from "config/config";

export const log = (...data:any) => {
  /* istanbul ignore else */
  if (appConfig.environment === "local") {
    console.log(...data);
  }
  if (appConfig.environment === "development") {
    console.log(...data);
  }
  if (appConfig.environment === "production") {
    // will log to a third party service in production
  } else {
    // will log to a third party service in production
  }
};
