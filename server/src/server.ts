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
import { ReadyToRunDTOs } from "@shared/model/ReadyToRunDTOs";
import { nextTick } from 'process';

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

        this.app.get('/webui/standards', (req: any, res: any, next: any) => {
            // Our api service code will return a promise so we can catch any error it may raise and 
            // pass it on to the express error handling
            standards.getAllStandards()
            .then(data => {
                // success, return the data
                return res.json(data);
            })
            .catch(err => {
                // promise was rejected, pass error onto error handler
                next(err);
            });
        });

        this.app.get('/webui/standards/:id', (req: any, res: any, next: any) => {            
            standards.getStandard(Number(req.params.id))
            .then(data => {
                return res.json(data);
            })
            .catch(err => {
                next(err);
            });
        });

        this.app.get('/webui/exercises', (req: any, res: any, next: any) => {
            // Our api service code will return a promise so we can catch any error it may raise and 
            // pass it on to the express error handling
            exercises.getAllExercises()
                .then(data => {
                    // Success, return the data
                    return res.json(data);
                })
                .catch(err => {
                    // promise was rejected, pass error onto error handler
                    next(err); 
                });            
        });

        this.app.get('/webui/exercise/summary/:id', (req: any, res: any, next: any) => {
            exercises.getExerciseSummary(Number(req.params.id))
            .then(data => {                
                return res.json(data);
            })
            .catch(err => {
                next(err);
            });            
        });

        this.app.get('/webui/exercise/detail/:id', (req: any, res: any, next: any) => {
            exercises.getExerciseDetail(Number(req.params.id))
            .then(data => {
                return res.json(data);
            })
            .catch(err => {
                next(err);
            });            
        });

        this.app.get('/webui/steps/:stepids', (req: any, res: any, next: any) => {
            const ids: number[] = [];            
            for (let step of req.params.stepids) {
                let id = Number(step);
                if (!Number.isNaN(id)) {
                    ids.push(id);
                }
            }

            // Retrieve the step data
            steps.getSteps(ids)
            .then((stepsData) => {
                res.json(stepsData);
            })
            .catch((err) => {
                next(err);
            });            
        });        

        this.app.get('/webui/exercisesteps/:exerciseid', (req: any, res: any, next: any) => {
            exerciseSteps.getExerciseSteps(Number(req.params.exerciseid))
            .then((steps) => {
                return res.json(steps);
            })
            .catch((err) => {
                next(err);
            });            
        });

        /**
         * 
         */
        this.app.post('/webui/users/authenticate', (req: any, res: any, next: any) => {
            
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

    private errorResponder(error: ReadyToRunDTOs.IInternalStatus, req: any, res: any, next: any) { 

        // If using IInternalStatus (we should be from the internal API service responder code)
        // we may have an error type to influence how the error should be handled
        if (error?.type) {
            switch (error.type) {
                case "Redirect":
                    // We may need another strategy here to pass context to the redired, we could pass details is as url parameters 
                    // or perhaps define a handler here for /error and parse the request for error information, it should be IInternalStatus
                    res.redirect('/error');
                    break;

                case "Timeout":
                    res.status(408).send(error);
                    break;

                // case "blah": // typechecking against exported string type ofr 'type'
                //     break;

                case "UseCode":
                    // The intention of this is to set the http status code to the value 
                    // we have placed in our error object.
                    res.status(error.code).send(error);
                    break;
                    
                default:
                    // Just use the default handling, this will set http response code of 500
                    next(error);
            }
        }
        else {
            // forwarding exceptional case to fail-safe middleware
            next(error);
        }        
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