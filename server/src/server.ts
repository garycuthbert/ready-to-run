// This issue: https://github.com/Microsoft/TypeScript/issues/10866
// Requires this solution: https://www.npmjs.com/package/module-alias
// You'll find the module aliases in package.json
import 'module-alias/register';

// System imports
import express from 'express';
import http from "http";

import path from "path";
import { StandardsModel } from './model/standards.model';
import { ExercisesModel } from './model/exercises.model';
import { StepsModel } from './model/steps.model';
import { ExerciseStepsModel } from './model/exercise-steps.model';
import { nextTick } from 'process';
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

        this.app.use((req: any, res: any, next: any) => {
            // Website that we wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

            // Request methods we wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request header we wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Pass true if we need the website to include cookies in the requests sent to the API
            // (e.g. In case we use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to the next layer of middleware
            next();
        });

        // Parse incoming requests with JSON payloads
        this.app.use(express.json());

        // Initialise a simple http server
        this.httpServer = http.createServer(this.app);

        // Static files. Make use of cache-control.
        // This is the default used by the SNE instrument.
        // The development server will have cache disabled.
        // See https://web.dev/codelab-http-cache/
        this.app.use(express.static(this.clientDist, {
             etag: true,                           // Explicit default
             lastModified: true,                   // Explicit default
        }));
        

        const standards = new StandardsModel();        
        const steps = new StepsModel();
        const exerciseSteps = new ExerciseStepsModel();
        const exercises = new ExercisesModel(exerciseSteps, steps);

        /*********************************************
        * Any specific get handlers go here before the
        * angular get * which swallows all gets
        *********************************************/

        this.app.get('/webui/standards', (req: any, res: any) => {
            const response = standards.getAllStandards();            
            return res.json(response);
        });

        this.app.get('/webui/standards/:id', (req: any, res: any) => {
            const response = standards.getStandard(Number(req.params.id)); 
            return res.json(response);
        });

        this.app.get('/webui/exercises', (req: any, res: any, next: any) => {
            // const response = exercises.getAllExercises();
            // console.log('/webui/exercises/ : ', response);
            // if (response.status.code !== 200) {
            //     throw new Error('status: \'' + response.status.code + '\', message: \'' + response.status.message + '\'.');
            // }
            // return res.json(response.exercises);
            exercises.getAllExercisesIPromise()
                .then(data => {
                    console.log('getAllExercisesIPromise: then!', data);
                    return res.json(data);
                })
                .catch(err => {console.error('getAllExercisesIPromise: error!'); next(err); })
                .finally(() => { console.log('getAllExercisesIPromise: finally!'); });
                //.catch(err => {next(err);});
        });

        this.app.get('/webui/exercise/summary/:id', (req: any, res: any) => {
            const response = exercises.getExerciseSummary(Number(req.params.id));
            return res.json(response);
        });

        this.app.get('/webui/exercise/detail/:id', (req: any, res: any) => {
            let response = null;            
            
            response = exercises.getExerciseDetail(Number(req.params.id));
                        
            // we can examine the response for server status details and decide if we are in error
            // and raise an error here
            //if (Number(req.params.id) == 99) {
                //throw Error('No not 99!');
            //}
            return res.json(response);
        });

        this.app.get('/webui/steps/:stepids', (req: any, res: any) => {
            const ids: number[] = [];

            console.log('server.ts : getSteps: stepids query param = ', req.params.stepids);
            for (let step of req.params.stepids) {
                let id = Number(step);
                if (!Number.isNaN(id)) {
                    ids.push(id);
                }
            }
            console.log('server.ts : getSteps: parsed ids = ', ids);
            //req?.params?.stepids?.forEach(id => ids.push(Number(id)));

            const response = steps.getSteps(ids);
            return res.json(response);
        });        

        this.app.get('/webui/exercisesteps/:exerciseid', (req: any, res: any) => {
            const response = exerciseSteps.getExerciseSteps(Number(req.params.exerciseid));
            return res.json(response);
        });

        // Setup error handling
        this.app.use(this.errorLogger);
        this.app.use(this.errorResponder);
        this.app.use(this.failSafeHandler);


        const port = process.env.port || this.port;
        this.httpServer.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });        
    }

    private errorLogger(error: any, req: any, res: any, next: any) { // for logging errors
        console.error(error) // or using any fancy logging library
        next(error) // forward to next middleware
    }

    private errorResponder(error: any, req: any, res: any, next: any) { // responding to client
        if (error.type == 'redirect')
            res.redirect('/error')
        else if (error.type == 'time-out') // arbitrary condition check
            res.status(408).send(error)
        else
            next(error) // forwarding exceptional case to fail-safe middleware
    }

    private failSafeHandler(error: any, req: any, res: any, next: any) { // generic handler
        res.status(500)//.send(error);
        .json(JSON.stringify({error: error})).send(error);
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