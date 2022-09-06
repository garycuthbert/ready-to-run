import {ReadyToRunDTOs} from "@shared/model/ReadyToRunDTOs";

// App imports
import standardsJSON from '../assets/mock/standards/standards.json';

export class Standards {
    private standards = standardsJSON as ReadyToRunDTOs.IAllStandards;

    constructor() {}

    public getAllStandards(): any {
        return this.standards;
    }
}