export interface Request {
  queryParameters: any;
  pathParameters: any;
  body: any;
}

export class Response {
  statusCode: number;
  body: any;

  constructor(statusCode: number, body: any) {
    this.statusCode = statusCode;
    this.body = body;
  }
}

export interface handler {
  (request: Request): Promise<Response>;
}
