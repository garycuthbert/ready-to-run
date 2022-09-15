import { ReadyToRunDTOs } from "@shared/model/ReadyToRunDTOs";

import stepsJSON from '../assets/mock/steps.json';

export class StepsModel {
    private allSteps = <ReadyToRunDTOs.IStep[]>stepsJSON;

    public getSteps(stepIds: number[]): ReadyToRunDTOs.IStep[] {
        const retval : ReadyToRunDTOs.IStep[] = [];

        stepIds?.forEach(step => {
            const stepObj = this.allSteps?.find(s => s.id == step);
            if (stepObj != null) {
                retval.push(stepObj);
            }
        });
        
        return retval;
    }
}