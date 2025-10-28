import { Mongoose } from "mongoose";

declare global {
  var mongooseConn: Mongoose | null | undefined;
}
