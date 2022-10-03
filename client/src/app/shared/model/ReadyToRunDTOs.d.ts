export namespace ReadyToRunDTOs {

  export type InternalErrorDirectionType = "None" | 'UseCode' | 'Redirect' | 'Timeout';

  interface IInternalStatus {
    code: number;
    type?: InternalErrorDirectionType;
    message: string;
  }

  interface IUserInfo {
    firstName: string;
    lastName: string;
    username: string;
    administrator: boolean;
  }

  interface IAuthenticationReply {
    token: string | null;
    status: IInternalStatus;
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
}
