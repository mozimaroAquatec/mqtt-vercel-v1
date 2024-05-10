"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helioss_controllers_1 = require("../controllers/helioss.controllers");
// Initialize a new router instance
const heliossRoutes = express_1.default.Router();
// Route for subscribing to MQTT messages using GET method
heliossRoutes.get("/", helioss_controllers_1.getHelioss);
// Export the router instance
exports.default = heliossRoutes;
//# sourceMappingURL=helioss.routes.js.map