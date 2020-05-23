export interface IUser {
  displayName: string;
  email: string;
  jobTitle: string;
  imageUrl?: string;
}

export interface IDivisionContext {
  title: string;
  cardManagerTitle: string;
  manager: { title: string; users: IUser[] };
  functions: string[];
  keyMetrics: string[];
  areasOfFocus: string[];
  generalComments?: string;
  siteUrl: string;
  extraInfoId: string;
  imageBackgroundUrl: string;
  backgroundColour: string;
}
