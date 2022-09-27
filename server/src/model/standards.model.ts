import {ReadyToRunDTOs} from "@shared/model/ReadyToRunDTOs";

// App imports
import standardsJSON from '../assets/mock/standards.json';

export class StandardsModel {
    private standards = <ReadyToRunDTOs.IStandard[]>standardsJSON;

    private error : ReadyToRunDTOs.IInternalStatus = {
        code: 501,
        type: "None",
        message: ''
    };

    constructor() {}

    public getAllStandards(): Promise<ReadyToRunDTOs.IStandard[]> {
        const ret = new Promise<ReadyToRunDTOs.IStandard[]>((resolve, reject) => {
            if (this.standards.length > 0) {
                // We have data to return
                resolve(this.standards);
            } else {
                let err = { ...this.error };
                err.message =
                    "System Error: Standards data is not available on the server.";
                reject(err);
            }
        });

        return ret;
    }

    public getStandard(id: number): Promise<ReadyToRunDTOs.IStandard> {
        const ret = new Promise<ReadyToRunDTOs.IStandard>((resolve, reject) => {
            const standard  = this.standards?.find(s => s.id === id);
            if (standard != null) {
                resolve(standard);
            }
            else {
                let err = { ...this.error };
                err.message = 
                    "System Error: The requested standard (id = " + id + ") is not available on the server.";
                reject(err);
            }
        });

        return ret;
    }
}