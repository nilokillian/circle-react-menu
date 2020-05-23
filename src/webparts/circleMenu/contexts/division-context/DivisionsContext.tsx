import * as React from "react";
import { useState, createContext, useEffect } from "react";
import { IDivisionContext, IUser } from "./interfaces/IDivisionContext";
import SharePointService from "../../services/SharePointService";
import { ICFOTeam } from "./interfaces/ICFOTeam";

export const DivisionContext = createContext<IDivisionContext[]>(null);

export const DivisionContextProvider = (props: any): JSX.Element => {
  const [divisions, setDivisions] = useState<IDivisionContext[]>([]);

  const _getCFOTeamData = async () => {
    //get items from CFOTeam List
    const resultCFOTeam: ICFOTeam[] = await SharePointService.pnp_getListItemsAdvanced(
      "CFOTeam",
      ["*", "Manager/Title", "Manager/EMail", "Manager/JobTitle"],
      ["Manager"]
    );

    // const _getPicture = async (userEmail: string) => {
    //   const resultUserPicture = await SharePointService.pnp_getListItemsAdvanced(
    //     "User Information List",
    //     ["Picture", "EMail"],
    //     [],
    //     `EMail eq '${userEmail}'`
    //   );
    //   // console.log("resultUserPicture", resultUserPicture);
    //   return resultUserPicture.Picture.Url;
    // };

    // const _getUserProperties = async (userEmail: string) => {
    //   const userProperties = await SharePointService.pnp_getProperties(
    //     `i:0#.f|membership|${userEmail}`
    //   );
    //   console.log("_getUserProperties", userProperties);
    //   return userProperties;
    // };

    // "i:0#.f|membership|marion.franks@downer.co.nz"

    //get profile picture for Manager field

    const mappedDivisions = resultCFOTeam.map((r) => {
      let obj = {
        title: r.Title,
        functions: r.Functions ? r.Functions : [],
        areasOfFocus: r.AreasOfFocus,
        cardManagerTitle: r.ManagerTitle,
        manager: {
          title: r.ManagerTitle,
          users: r.Manager.map(
            (user) =>
              ({
                displayName: user.Title,
                email: user.EMail,
                jobTitle: user.JobTitle,
                imageUrl: "",
              } as IUser)
          ),
        },
        extraInfoId: r.ExtraInfoId,
        keyMetrics: r.KeyMetrics ? r.KeyMetrics : [],
        generalComments: r.GeneralComments,
        siteUrl: r.SiteUrl && r.SiteUrl.Url,
        imageBackgroundUrl: r.ImageBackgroundUrl && r.ImageBackgroundUrl.Url,
        backgroundColour: r.BackgroundColor,
      } as IDivisionContext;

      return obj;
    });

    setDivisions(mappedDivisions);
  };

  useEffect(() => {
    _getCFOTeamData();
  }, []);

  return (
    <DivisionContext.Provider value={...divisions}>
      {props.children}
    </DivisionContext.Provider>
  );
};
