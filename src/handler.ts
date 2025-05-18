import { IncomingMessage, ServerResponse } from "node:http";
import { routes } from "./routes";

export const handler = async (request: IncomingMessage, response: ServerResponse) => {
  const currentRoute = routes.find((route) => route.method === request.method && request.url?.startsWith(route.path));
  if (currentRoute) {
    try {
      await currentRoute.action(request, response);
    } catch (error) {      
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify(`Internal server error: ${error}`));
      response.end();
    }
  } else  {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(`Requested url ${request.url} was not found.`));
    response.end();
  }
};
