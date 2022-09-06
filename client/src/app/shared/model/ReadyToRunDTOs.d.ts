export namespace ReadyToRunDTOs {

  interface IStandard {
    id: number;
    number: number;
    title: string;
    question?: string;
  }

  interface IAllStandards {
    standards: (ReadyToRunDTOs.IStandard[] | null);
  }
}
