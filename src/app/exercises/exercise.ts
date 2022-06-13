import { IStep } from "../shared/step";

export interface IExercise {
  id: number;
  title: string;
  introduction?: string;
  steps: IStep[];
}
