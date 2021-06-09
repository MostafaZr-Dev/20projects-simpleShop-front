import { v4 as uuid } from "uuid";

export const generateID = () => {
  return uuid();
};
