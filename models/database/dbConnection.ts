import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const DBHOST = process.env.DBHOST ?? '';
const DBPORT = parseInt(process.env.DBPORT ?? '3306');
const DBUSERNAME = process.env.DBUSERNAME ?? '';
const DBPASSWORD = process.env.DBPASSWORD ?? '';
const DBNAME = process.env.DBNAME ?? '';
const DBLOGS = (process.env.DBLOGS?.toLowerCase() === 'true');

const logsDir = path.resolve(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const logStream = fs.createWriteStream(path.join(logsDir, 'sql.log'), { flags: 'a' });

const loggingFunction = DBLOGS
  ? (msg: string) => {
      console.log(msg);
      logStream.write(msg + '\n');
    }
  : false;

export const db = new Sequelize(DBNAME, DBUSERNAME, DBPASSWORD, {
  host: DBHOST,
  dialect: 'mysql',
  port: DBPORT,
  logging: loggingFunction
});
