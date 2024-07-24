import { StatusCodes } from "http-status-codes";

export class NotFound extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "NotFound";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export class BadRequest extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "BadRequest";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export class UnAuthorized extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "UnAuthorized";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export class UnAuthenticated extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "UnAuthenticated";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export class Forbidden extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "Forbidden";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export class NoContent extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "NoContent";
    this.statusCode = StatusCodes.NO_CONTENT;
  }
}
