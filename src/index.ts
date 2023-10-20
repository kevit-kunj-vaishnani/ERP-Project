import {App} from './app';
import {router as pingRouter} from './ping';

const app = new App([pingRouter]);

app.listen();
