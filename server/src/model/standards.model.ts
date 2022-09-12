import {ReadyToRunDTOs} from "@shared/model/ReadyToRunDTOs";

// App imports
import standardsJSON from '../assets/mock/standards/standards.json';

export class Standards {
    private standards = <ReadyToRunDTOs.IAllStandards>standardsJSON;

    constructor() {}

    public getAllStandards(): ReadyToRunDTOs.IAllStandards {
        return this.standards;
    }
}