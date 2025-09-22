import express, { Application } from 'express'
import { registerRoutes } from './routes/routes';
import cors from 'cors'
import { db } from './database/dbConnection';
class Server {

    private app: Application;
    private port: String;

    constructor () {
        this.app = express()
        this.port = process.env.PORT ?? '8000';
        
        this.connectToDatabase();
        this.middlewares();
        this.routes();
        
    }

    routes () {
        registerRoutes(this.app)
    }

    middlewares () {

        this.app.use( cors() )

        this.app.use( express.json() )
    }

    async connectToDatabase () {
        try {
            await db.authenticate();
            await db.sync();
            console.log('DB Connected');
        } catch (error) {
            console.error('DB Connection failed:', error);
            process.exit(1);
        }
    }

    listen () { 
        this.app.listen( this.port, () => {
            console.log('Run Server in '+ this.port)
        })
    }
}

export default Server;