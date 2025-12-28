import routes from './routes/routes.ts';
import { fileURLToPath } from 'url';
import cors from 'cors';
import path from 'node:path';
import express from 'express';

const app = express();
const port = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// allow react to access this backend...
const corsOptions = {
  origin: ['patrick.cpmgw20i6ovx.us-west-1.rds.amazonaws.com', 'http://patrick.cpmgw20i6ovx.us-west-1.rds.amazonaws.com', "localhost:5173",]
}
app.use(cors(corsOptions))

const reactPath = path.join(__dirname, 'client/dist');
//console.log(reactPath);
app.use(express.static(reactPath));

app.use('/', routes);

app.get('/', (req:any, res:any) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.get('*all', (req:any, res:any) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});