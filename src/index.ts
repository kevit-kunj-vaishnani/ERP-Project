import {App} from './app';
import {router as pingRouter} from './ping';

const app = new App([pingRouter]);
console.log('jdsic');

app.listen();
