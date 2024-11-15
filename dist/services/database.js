"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const mongodb_1 = require("mongodb");
const config_1 = require("../config");
exports.DatabaseService = {
    client: new mongodb_1.MongoClient(config_1.config.mongodb.uri),
    db: null,
    init: function () {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db) {
                yield this.client.connect();
                this.db = this.client.db(config_1.config.mongodb.dbName);
            }
        });
    },
    getUsers: function () {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield this.init();
            return yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.collection("users").find({}).toArray());
        });
    },
    createUser: function (user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield this.init();
            const result = yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.collection("users").insertOne(Object.assign(Object.assign({}, user), { createdAt: new Date().toISOString() })));
            return Object.assign({ id: result === null || result === void 0 ? void 0 : result.insertedId }, user);
        });
    }
};
