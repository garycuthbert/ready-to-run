export namespace ReadyToRunDTOs {

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
}
