"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMON_TYPES = exports.commonContainer = void 0;
const inversify_1 = require("inversify");
const Logger_1 = require("./utils/Logger");
const MongoDBConnector_1 = require("./database/MongoDBConnector");
const COMMON_TYPES = {
    MyLogger: Symbol.for('MyLogger'),
    MongoDBConnector: Symbol.for('MongoDBConnector'),
};
exports.COMMON_TYPES = COMMON_TYPES;
const commonContainer = new inversify_1.ContainerModule((bind) => {
    bind(COMMON_TYPES.MyLogger).to(Logger_1.Logger).inSingletonScope();
    bind(COMMON_TYPES.MongoDBConnector).to(MongoDBConnector_1.MongoDBConnector).inSingletonScope();
});
exports.commonContainer = commonContainer;
