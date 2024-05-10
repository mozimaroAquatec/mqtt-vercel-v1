"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mqttClient = void 0;
const express_1 = __importDefault(require("express"));
const helioss_routes_1 = __importDefault(require("./routes/helioss.routes")); // Importing routes for Helioss
const error_handler_1 = __importDefault(require("./utils/error.handler")); // Importing custom error handler
const connect_db_1 = __importDefault(require("./config/connect.db")); // Importing MongoDB connection function
const mqtt = __importStar(require("mqtt")); // Importing MQTT library
const helioss_model_1 = __importDefault(require("./models/helioss.model")); // Importing Helioss model
// Constructing the MQTT connection URL using environment variables
const connectUrl = `${process.env.MQTT_PROTOCOL || "mqtt"}://${process.env.MQTT_HOST || "mqtt.livepool.eu"}:${process.env.MQTT_PORT || "8883"}`;
// Creating an Express app
const app = (0, express_1.default)();
// Connecting to MongoDB
(0, connect_db_1.default)();
// Connecting to MQTT broker
exports.mqttClient = mqtt.connect(connectUrl, {
    clientId: `mqtt_${Math.random().toString(16).slice(3)}`, // Generating a random client ID
    clean: true,
    connectTimeout: 4000,
    username: process.env.MQTT_USERNAME || "aquatec", // MQTT username
    password: process.env.MQTT_PASSWORD || "iot2021", // MQTT password
    reconnectPeriod: 1000,
});
// Event handler for MQTT client when it's connected to the broker
exports.mqttClient.on("connect", function () {
    console.log("Connected to MQTT broker");
});
// Subscribing to "Helioss/Energie" topic
exports.mqttClient.subscribe("Helioss/Energie", () => {
    console.log("Subscribe to Helioss/Energie");
});
// Event handler for MQTT client when it receives a message
exports.mqttClient.on("message", async function (topic, message) {
    console.log(`Received message from topic: ${topic} and the message is: ${message}`, message.toString());
    // Save the Helioss data to MongoDB
    try {
        await helioss_model_1.default.create({
            username: "Helioss",
            topic,
            message: message.toString(),
        });
        console.log("Helioss data saved to MongoDB");
    }
    catch (error) {
        console.error("Error saving message to MongoDB:", error);
    }
});
// Using the Helioss routes
app.use("/", helioss_routes_1.default);
// Middleware for handling 404 errors
app.use("*", (req, res) => {
    return res.status(404).json(new error_handler_1.default(404, "Page not found"));
});
// Starting the server and listening on the specified port
app.listen(process.env.PORT || 6000, function () {
    console.log(`Server is running on port ${process.env.PORT || 6000}`);
});
//# sourceMappingURL=index.js.map