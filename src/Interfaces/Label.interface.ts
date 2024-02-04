import { INotes } from "./Notes.interface";

export interface ILabelRequest {
  labelType: string;
  labelName: string;
  pinnedNotes?: INotes[];
  notes?: INotes[];
}
