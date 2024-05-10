"use strict";
// environmentLoader.js
Object.defineProperty(exports, "__esModule", { value: true });
const loadEnvironmentVariables = () => {
    // Load environment variables for development
    if (process.env.NODE_ENV === "development") {
        return require("dotenv").config({ path: ".env.development" });
    }
    // Load environment variables for production
    else {
        return require("dotenv").config({ path: ".env.production" });
    }
};
exports.default = loadEnvironmentVariables;
//# sourceMappingURL=environment.loader.js.map