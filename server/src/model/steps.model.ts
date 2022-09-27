import { ReadyToRunDTOs } from "@shared/model/ReadyToRunDTOs";

import stepsJSON from '../assets/mock/steps.json';

export class StepsModel {
    private allSteps = <ReadyToRunDTOs.IStep[]>stepsJSON;

    public getSteps(stepIds: number[]): Promise<ReadyToRunDTOs.IStep[]> {

        const ret = new Promise<ReadyToRunDTOs.IStep[]>((resolve, reject) => {
            const retval: ReadyToRunDTOs.IStep[] = [];

            stepIds?.forEach(step => {
                const stepObj = this.allSteps?.find(s => s.id == step);
                if (stepObj != null) {
                    retval.push(stepObj);
                }
            });

            resolve(retval);
        });

        return ret;
    }
}