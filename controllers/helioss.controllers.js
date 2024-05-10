"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHelioss = void 0;
// Importing necessary modules
const error_handler_1 = __importDefault(require("../utils/error.handler")); // Importing custom error handler
const helioss_model_1 = __importDefault(require("../models/helioss.model")); // Importing Helioss model
const environment_loader_1 = __importDefault(require("../utils/environment.loader"));
// Load environment variables from the .env file into process.env
(0, environment_loader_1.default)();
/**
 * @desc Get Helioss from the database
 * @params GET /
 * @access PUBLIC
 **/
const getHelioss = async function (req, res) {
    try {
        // Query the database for all Helioss records
        const helioss = await helioss_model_1.default.find();
        // Return success response with Helioss data
        return res.status(200).json({
            status: "success",
            message: "Helios has been getting success",
            data: { helioss },
        });
    }
    catch (error) {
        // Handle errors
        res.status(500).json(new error_handler_1.default(500, "Internal server error"));
        // throw new ErrorResponse(500, `getHelioss error : ${error}`);
    }
};
exports.getHelioss = getHelioss;
//# sourceMappingURL=helioss.controllers.js.map