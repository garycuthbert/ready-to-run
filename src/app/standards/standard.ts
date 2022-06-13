export interface IStandard {
  id: number;
  number: number;
  title: string;
  question?: string;
}

export const AllStandardsStandard: IStandard = {
  id: -1,
  number: 0,
  title: "All",
  question: undefined
}
