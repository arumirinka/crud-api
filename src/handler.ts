import { IncomingMessage, ServerResponse } from "node:http";
import { routes } from "./routes";

export const handler = (request: IncomingMessage, response: ServerResponse) => {
  const currentRoute = routes.find((route) => route.method === request.method && route.path === request.url);
  if (currentRoute) {
    currentRoute.action(request, response);
  } else  {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(`Requested url ${request.url} was not found.`));
    response.end();
  }
};
