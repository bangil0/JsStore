import * as JsStore from "jsstore";
const fileUrl = require("file-loader?name=scripts/jsstore.worker.ie.js!../../node_modules/jsstore/dist/jsstore.worker.ie");

// This will ensure that we are using only one instance. 
// Otherwise due to multiple instance multiple worker will be created.

export const idbCon = new JsStore.Instance(new Worker(fileUrl));