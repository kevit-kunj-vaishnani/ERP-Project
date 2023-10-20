import {App} from './app';
import {router as pingRouter} from './ping';
import {router} from './modules/User/user.routes';

const app = new App([pingRouter, router]);

app.listen();
