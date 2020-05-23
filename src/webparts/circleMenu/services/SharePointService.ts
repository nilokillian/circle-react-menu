import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
  sp,
  ItemAddResult,
  SearchSuggestQuery,
  SearchSuggestResult,
} from "@pnp/sp";

export class SharePointServiceManager {
  public context: WebPartContext;

  public setup(context: WebPartContext): void {
    this.context = context;
  }

  public pnp_setup(content: WebPartContext): void {
    sp.setup({ spfxContext: content });
  }

  public pnp_search = async (qText?: string): Promise<any> => {
    sp.searchSuggest({
      querytext: "BusinessUnits",
      count: 5,
    } as SearchSuggestQuery).then((r: SearchSuggestResult) => {
      console.log(r);
    });
  };

  public pnp_getUsersProfiles_AD = async (
    queryString: string,
    maximumEntity?: number
  ) => {
    const q = {
      MaximumEntitySuggestions: maximumEntity ? maximumEntity : 5,
      PrincipalSource: 15,
      PrincipalType: 15,
      QueryString: queryString,
    };

    return await sp.profiles.clientPeoplePickerSearchUser(q);
  };

  public pnp_getUsersProfiles_SP = async (queryString?: string) => {
    return await sp.web.siteUsers.filter(queryString ? queryString : "").get();
  };

  public pnp_getProperties = async (loginName: string) => {
    return await sp.profiles.getPropertiesFor(loginName);
  };

  public pnp_getUserProfileProperty = async (
    loginName: string,
    propName: string
  ) => {
    return await sp.profiles.getUserProfilePropertyFor(loginName, propName);
  };

  public pnp_getUserById = async (userId: number) => {
    return await sp.web.getUserById(userId).get();
  };

  public pnp_SearchItems = async (queryString?: string) => {
    // return await sp.web.getList("ddd").items.
  };

  public pnp_getSPUserID = async (userEmail: string) => {
    return await sp.web.siteUsers.getByEmail(userEmail).get();
  };

  public pnp_addItem = async (listTitle: string, itemObject: {}) => {
    const result: ItemAddResult = await sp.web.lists
      .getByTitle(listTitle)
      .items.add(itemObject);
    return result;
  };

  public pnp_updateItem = async (
    listTitle: string,
    itemId: number,
    itemObject: {}
  ) => {
    const result = await sp.web.lists
      .getByTitle(listTitle)
      .items.getById(itemId)
      .update(itemObject);
    return result;
  };

  public pnp_getLists = async (): Promise<any> => {
    try {
      return await sp.web.lists.get();
    } catch (error) {
      throw error;
    }
  };

  public pnp_getListItems = async (listTitle: string): Promise<any> => {
    try {
      return await sp.web.lists.getByTitle(listTitle).items.get();
    } catch (error) {
      throw error;
    }
  };

  public pnp_getListItemsAdvanced = async (
    listTitle: string,
    selectedFiled: string[],
    expend: string[],
    filterString?: string
  ): Promise<any> => {
    //console.log("filterString", filterString);
    try {
      return await sp.web.lists
        .getByTitle(listTitle)
        .items.select(...selectedFiled)
        .expand(...expend)
        .filter(filterString ? filterString : "")
        .top(300)
        .get();
    } catch (error) {
      throw `pnp_getListItemsAdvanced: ${error}`;
    }
  };

  public pnp_getChoiseOptions = async (
    listTitle: string,
    fieldName: string
  ) => {
    try {
      const result = await sp.web.lists
        .getByTitle(listTitle)
        .fields.getByTitle(fieldName)
        .get();
      return result;
    } catch (error) {
      throw error;
    }
  };
}

const SharePointService = new SharePointServiceManager();

export default SharePointService;
