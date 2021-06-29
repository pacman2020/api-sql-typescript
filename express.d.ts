import { User } from "./src/interface/User";

declare global {
    namespace Express {
        interface Request {
            userId?: String;
        }
    }
}