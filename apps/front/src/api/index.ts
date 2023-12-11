import ky from "ky";
import { getToken } from "../helpers/localStorage";
import { responseToCamelCase } from "@alice-health/ky-hooks-change-case";

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = getToken();

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [responseToCamelCase],
  },
});

export { api };
