export namespace ReadyToRunDTOs {

  export type InternalErrorDirectionType = "None" | 'UseCode' | 'Redirect' | 'Timeout';

  interface IInternalStatus {
    code: number;
    type?: InternalErrorDirectionType;
    message: string;
  }

  interface IStandard {
    id: number;
    number: number;
    title: string;
    question?: string;
  }

  interface IStep {
    id: number;
    imagePath?: string;
    paragraphs: string[];
  }

  interface IExercise {
    id: number;
    title: string;
    introduction?: string;
    steps: IStep[];
  }

  interface IExerciseSteps {
    exerciseId: number;
    stepIds: number[];
  }

  interface IAllStandards {
    standards: (ReadyToRunDTOs.IStandard[] | null);
  }

  interface IAllExercises {
    exercises: (ReadyToRunDTOs.IExercise[] | null);
  }

  // interface IAllExercisesDTO {
  //   status: IInternalStatus;
  //   exercises: (ReadyToRunDTOs.IExercise[] | null);
  // }
}
