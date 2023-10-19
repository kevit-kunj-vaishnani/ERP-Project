"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.ping = router.get('/', (req, res) => {
    res.send('Pong');
});
//# sourceMappingURL=ping.js.map