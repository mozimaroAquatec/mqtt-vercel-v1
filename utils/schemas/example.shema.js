"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.valdiateSubscriber = exports.valdiatePublisher = void 0;
const joi_1 = __importDefault(require("joi"));
/*======= valdiatepublish ========*/
const valdiatePublisher = (publisher) => {
    const schema = joi_1.default.object({
        topic: joi_1.default.string().required(),
        message: joi_1.default.string().required(),
        opt: joi_1.default.string(),
    });
    return schema.validate(publisher);
};
exports.valdiatePublisher = valdiatePublisher;
/*=======// valdiatepublish //========*/
/*======= valdiateSubscriber ========*/
const valdiateSubscriber = (subscriber) => {
    const schema = joi_1.default.object({
        topic: joi_1.default.string().trim().min(6).required(),
        options: joi_1.default.string(),
    });
    return schema.validate(subscriber);
};
exports.valdiateSubscriber = valdiateSubscriber;
/*=======// valdiateSubscriber //========*/
//# sourceMappingURL=example.shema.js.map