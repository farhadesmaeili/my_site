"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_config_1 = require("./common/configs/inversify.config");
const common_injection_container_1 = require("./common/common_injection_container");
const logger = inversify_config_1.appContainer.get(common_injection_container_1.COMMON_TYPES.MyLogger);
logger.info('Testing Logger injection...');
