import * as JWT from 'jsonwebtoken';

import { ReadyToRunDTOs } from "@shared/model/ReadyToRunDTOs";

import userAccountsJSON from '../assets/mock/users.json';

export class UserDetailsModel {
    private userAccounts: ReadyToRunDTOs.IUserInfo[] = <ReadyToRunDTOs.IUserInfo[]>userAccountsJSON;

    private readonly issuer = "Square Dawn r2r";
    private readonly audience = "http://squaredawn.net";

    private logonSuccessStatus : ReadyToRunDTOs.IInternalStatus = {
        code: 1201,
        message: 'Login successful'
    };

    private logonFailStatus : ReadyToRunDTOs.IInternalStatus = {
        code: 1401,
        message: 'User login failed'
    };

    public getUserToken(user: string, password: string): Promise<ReadyToRunDTOs.IAuthenticationReply> {
        return new Promise<ReadyToRunDTOs.IAuthenticationReply>((resolve) => {
            const authenticatedUser = this.userAccounts.find(u => u.username === user);
            if (authenticatedUser == null) {
                // logon failed - we do not want to raise a server side error here 
                // rather just let the client know that logon failed
                let logonFail = { ... this.logonFailStatus };
                logonFail.message = 'Unknown user';
                resolve({ token: null, status: logonFail });
            } else if (password !== 'password') {
                let logonFail = { ... this.logonFailStatus };
                logonFail.message = 'User login failed';
                resolve({ token: null, status: logonFail });
            } else {
                let logonToken = 'userlogintoken';
                resolve({ token: logonToken, status: this.logonSuccessStatus });
            }
        });
    }

    public verifyUserToken(authHeader: string): boolean {
        const token = authHeader.split(' ')[1]; // 2nd element == Bearer <token>

        try {
            // Verfiy the token
            const result: any = null;
            const now = new Date();
            const secondsSinceEpoch = Math.round(now.getTime() / 1000);
            if (result.iss != null && result.iss === this.issuer && result.exp > secondsSinceEpoch) {
                return true;
            }
        } catch (err) {
            return false;
        }

        return false;
    }
}