"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = __importDefault(require("winston"));
const inversify_1 = require("inversify");
const LogLevel_1 = require("../enum/LogLevel");
// تعریف Logger به‌عنوان کلاس معمولی
let Logger = class Logger {
    constructor() {
        this.logger = winston_1.default.createLogger({
            level: LogLevel_1.LogLevel.INFO,
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf(({ timestamp, level, message }) => {
                return `${timestamp} [${level}]: ${message}`;
            })),
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({ filename: 'application.log' }),
            ],
        });
    }
    log(level, message) {
        this.logger.log(level, message);
    }
    info(message) {
        this.log(LogLevel_1.LogLevel.INFO, message);
    }
    warn(message) {
        this.log(LogLevel_1.LogLevel.WARN, message);
    }
    error(message) {
        this.log(LogLevel_1.LogLevel.ERROR, message);
    }
    trackError(error) {
        this.error(`Tracked Error: ${error.message}\nStack: ${error.stack}`);
    }
    trackAction(action, details) {
        this.info(`Action: ${action}, Details: ${details}`);
    }
};
exports.Logger = Logger;
exports.Logger = Logger = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], Logger);
