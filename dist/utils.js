"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendToSheet = appendToSheet;
const local_auth_1 = require("@google-cloud/local-auth");
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const sheets = googleapis_1.google.sheets({ version: "v4" });
async function appendToSheet(spreadsheetId, range, data) {
    const auth = await (0, local_auth_1.authenticate)({
        keyfilePath: path_1.default.join(__dirname, "../credentials.json"),
        scopes: [
            "https://www.googleapis.com/auth/drive",
            "https://www.googleapis.com/auth/drive.file",
            "https://www.googleapis.com/auth/spreadsheets",
        ],
    });
    googleapis_1.google.options({ auth });
    const res = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [data],
        },
    });
    console.log("[Sheets] - Successfully appended the data to the sheet", res.data);
    return res.data;
}
