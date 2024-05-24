"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _analyzeEvaluate = require("./process/analyze-evaluate.js");
let ae = {
  json: _analyzeEvaluate.json,
  lang: _analyzeEvaluate.lang
};
var _default = exports.default = {
  eval: ae
};