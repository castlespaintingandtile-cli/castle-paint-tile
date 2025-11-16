
import { api } from "encore.dev/api";
import { Service } from "encore.dev/service";

export default new Service("frontend");

// Static file serving for the frontend
export const staticFiles = api.static({
  path: "/*path",
  expose: true,
  dir: "./dist",
});
