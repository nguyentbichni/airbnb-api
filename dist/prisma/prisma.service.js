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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const logger_constant_1 = require("../libs/share/src/core/constants/logger.constant");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super({
            log: [
                {
                    emit: 'event',
                    level: 'query',
                },
            ],
        });
        this.$use(async (params, next) => {
            console.info(`Model: ${params.model}. Action: #${params.action}`);
            const result = await next(params);
            return result;
        });
        this.$on('query', async (event) => {
            console.info(`Query: ${event.query} -- Params: ${event.params}`, logger_constant_1.loggerConstant.queryContext);
        });
        this.$on('error', async (event) => {
            console.info(`Query error: ${JSON.stringify(event.message)}`, event.target, logger_constant_1.loggerConstant.queryContext);
        });
    }
    async onModuleInit() {
        await this.$connect();
    }
    async enableShutdownHooks(app) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map