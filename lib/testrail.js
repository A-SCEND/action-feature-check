"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.getOrCreateRunID = void 0;
const axios_1 = __importDefault(require("axios"));
const core = __importStar(require("@actions/core"));
function getRunName() {
    const date = new Date();
    return `Auto testing ${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
}
function getTestRailConfg(path) {
    const host = core.getInput('testrail_host');
    const username = core.getInput('testrail_username');
    const password = core.getInput('testrail_password');
    const config = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        url: `${host}/${path}`,
        auth: {
            username,
            password
        }
    };
    return config;
}
function getOrCreateRunID() {
    return __awaiter(this, void 0, void 0, function* () {
        const projectId = core.getInput('testrail_projectid');
        const response = yield getRuns(projectId);
        const runName = getRunName();
        let match = (response.runs || []).find(runInfo => runInfo.name.toLowerCase() === runName);
        if (!match) {
            const runResponse = yield addRun(projectId, {
                name: runName,
                description: '',
                suite_id: ''
            });
            match = {
                name: runResponse.name,
                id: runResponse.id
            };
        }
        return match;
    });
}
exports.getOrCreateRunID = getOrCreateRunID;
function getRuns(projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = getTestRailConfg(`get_runs/${projectId}`);
        const response = yield axios_1.default.request(config);
        return response.data;
    });
}
function addRun(projectId, runInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = getTestRailConfg(`add_run/${projectId}`);
        config.data = runInfo;
        const runResponse = yield axios_1.default.request(config);
        return runResponse.data;
    });
}
