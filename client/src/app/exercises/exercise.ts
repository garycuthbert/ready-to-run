import { IStep } from "../step/step";

export interface IExercise {
  id: number;
  title: string;
  introduction?: string;
  steps: IStep[];
}
