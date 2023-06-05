export class ValidationServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "validationServiceError";
  }
}

export class CarNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CarNotFoundError";
  }
}


export class CarRepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RepositoryError";
  }
}

