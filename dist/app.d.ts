import { Router } from 'express';
export declare class App {
    private app;
    private routers;
    constructor(routers: Router[]);
    initializeRoutes(): void;
    listen(): void;
}
