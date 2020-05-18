import { SPPermission } from "@microsoft/sp-page-context";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from "@microsoft/sp-http";

export const checkRemoteWebPermissions = async (
  url: string,
  ctx: WebPartContext
) => {
  const permissionObject = JSON.stringify(SPPermission.manageWeb.value);
  try {
    const response = await ctx.spHttpClient.get(
      `${url}/_api/web/DoesUserHavePermissions(@v)?@v=${permissionObject}`,
      SPHttpClient.configurations.v1
    );
    return !response.ok ? Promise.reject("Get Request Faild") : response.json();
  } catch (error) {
    return Promise.reject(error);
  }
};
