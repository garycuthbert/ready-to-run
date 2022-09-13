import {ReadyToRunDTOs} from "@shared/model/ReadyToRunDTOs";

// App imports
import standardsJSON from '../assets/mock/standards.json';

export class StandardsModel {
    private standards = <ReadyToRunDTOs.IAllStandards>standardsJSON;

    constructor() {}

    public getAllStandards(): ReadyToRunDTOs.IAllStandards {
        return this.standards;
    }

    public getStandard(id: number): ReadyToRunDTOs.IStandard | null {
        const standard = this.standards.standards?.find(s => s.id === id);        

        //return standard == null ? null : standard;
        return standard ?? null;
    }
}