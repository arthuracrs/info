export interface Request {
  queryParameters: any;
  pathParameters: any;
  body: any;
}

export interface Response {
  statusCode: number;
  body: any;
}

export interface handler {
  (request: Request): Promise<Response>;
}
