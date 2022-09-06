// This issue: https://github.com/Microsoft/TypeScript/issues/10866
// Requires this solution: https://www.npmjs.com/package/module-alias
// You'll find the module aliases in package.json
import 'module-alias/register';

// System imports
import express from 'express';
import http from "http";

import path from "path";
import { Standards } from './model/standards.model';
//import compression from 'compression';

class Server {
    public app: any;

    // Path to static client pages
    private clientDist = path.resolve(path.join(__dirname, '/../../../../client/dist'));

    // Environment specific vars
    private port: number;

    // Http server general status - for test purposes
    private serverReady: boolean = true;

    // The server itself
    private httpServer: http.Server;

    constructor() {
        if (process.env.NODE_ENV == "production") {
            this.port = 8080;
        }
        else {
            this.port = 8999;
        }

        // The app object conventionally denotes the Express application.
        // Create it by calling the top-level express() function exported by the Express module
        this.app = express();

        // Static files. Make use of compression to serve static files.
        // Must do this as the first express middleware function
        //this.app.use(compression());

        // Parse incoming requests with JSON payloads
        this.app.use(express.json());

        // Initialise a simple http server
        this.httpServer = http.createServer(this.app);

        // Static files. Make use of cache-control.
        // This is the default used by the SNE instrument.
        // The development server will have cache disabled.
        // See https://web.dev/codelab-http-cache/
        // this.app.use(express.static(this.clientDist, {
        //     etag: true,                           // Explicit default
        //     lastModified: true,                   // Explicit default
        // }));

        const standards = new Standards();

        /*********************************************
        * Any specific get handlers go here before the
        * angular get * which swallows all gets
        *********************************************/

        this.app.get('/webui/standards', (req: any, res: any) => {
            const response = standards.getAllStandards();
            return res.json(response);
        });

        const port = process.env.port || this.port;
        this.httpServer.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });        
    }

    // Create an instance of this server class
    public static bootstrap(): Server {
        return new Server();
    }

    private shutdown() {
        this.serverReady = false;
        this.httpServer.close();
    }
}

// Code entry point
const server = Server.bootstrap();
export default server.app;