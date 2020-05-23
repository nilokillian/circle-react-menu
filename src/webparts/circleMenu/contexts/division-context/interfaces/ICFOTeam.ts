export interface ICFOTeam {
  ID: number;
  Title: string;
  ExtraInfoId: string;
  AreasOfFocus: string[];
  Functions: string[];
  ManagerTitle: string;
  ManagerId: number[];
  Manager: any[];
  KeyMetrics: string[];
  GeneralComments: string;
  SiteUrl: { Url: string; Description: string };
  ImageBackgroundUrl: { Url: string; Description: string };
  BackgroundColor: string;
}
