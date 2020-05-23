import { IAnimatedMwnuItem } from "../../interfaces/IAnimatedMwnuItem";
import { IUser } from "../../contexts/division-context/interfaces/IDivisionContext";

export interface ICardProps {
  item: IAnimatedMwnuItem;
  persona: IUser[];
}
