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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBConnector = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("reflect-metadata");
const inversify_1 = require("inversify");
const common_injection_container_1 = require("../../common/common_injection_container");
let MongoDBConnector = class MongoDBConnector {
    constructor(logger) {
        if (!logger) {
            throw new Error('Logger not found during MongoDBConnector injection');
        }
        this.logger = logger;
    }
    connectToMongoDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(process.env.MONGODB_URI, {
                    serverSelectionTimeoutMS: 30000, // افزایش تایم‌آوت به 30 ثانیه
                });
                this.logger.info('Connected to MongoDB'); // استفاده از logger برای ثبت موفقیت
            }
            catch (error) {
                if (error instanceof Error) {
                    this.logger.error('Could not connect to MongoDB'); // استفاده از logger برای ثبت خطا
                    this.logger.error(`Error details: ${error.message}`); // ثبت جزئیات خطا
                }
                else {
                    this.logger.error('Could not connect to MongoDB with an unknown error');
                }
                throw error; // ارسال خطا به لایه بالاتر برای مدیریت
            }
        });
    }
};
exports.MongoDBConnector = MongoDBConnector;
exports.MongoDBConnector = MongoDBConnector = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(common_injection_container_1.COMMON_TYPES.MyLogger)),
    __metadata("design:paramtypes", [Object])
], MongoDBConnector);
