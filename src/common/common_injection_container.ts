import { ContainerModule, interfaces } from 'inversify';
import { ILogger } from './interfaces/ILogger';
import { Logger } from './utils/Logger';
import { MongoDBConnector } from './database/MongoDBConnector';

const COMMON_TYPES = {
    MyLogger: Symbol.for('MyLogger'),
    MongoDBConnector: Symbol.for('MongoDBConnector'),
};

const commonContainer = new ContainerModule((bind: interfaces.Bind) => {
    bind<ILogger>(COMMON_TYPES.MyLogger).to(Logger).inSingletonScope();
    bind<MongoDBConnector>(COMMON_TYPES.MongoDBConnector).to(MongoDBConnector).inSingletonScope();
});

export { commonContainer, COMMON_TYPES };
