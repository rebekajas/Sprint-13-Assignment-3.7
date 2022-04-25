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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
;
;
;
;
const isCustomerItem = (variableToCheck) => {
    return variableToCheck.company !== undefined;
};
const albumURL = 'https://jsonplaceholder.typicode.com/albums/1/photos';
const userURL = 'https://jsonplaceholder.typicode.com/users';
const fetchData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, node_fetch_1.default)(url).then(response => response.json());
    return response.map((info) => {
        if (isCustomerItem(info)) {
            return {
                id: info.id,
                name: info.name,
                street_address: `${info.address.suite} ${info.address.street}`,
                company_name: info.company.name
            };
        }
        else {
            return {
                id: info.id,
                title: info.title
            };
        }
    });
});
fetchData(albumURL).then(albums => console.log(albums));
fetchData(userURL).then(users => console.log(users));
