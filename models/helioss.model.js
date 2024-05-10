"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    topic: { type: String, required: true },
    message: { type: String, default: "null" },
    createdDate: { type: String, required: true, default: new Date(), }
}, { timestamps: true });
const Helioss = mongoose_1.default.model("helios", userSchema);
exports.default = Helioss;
//# sourceMappingURL=helioss.model.js.map