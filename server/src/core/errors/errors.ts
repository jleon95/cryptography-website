export class AppError extends Error {
  readonly name: string;

  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly isOperational: boolean = true,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends AppError {
  // 400 = bad request format, 422 = unprocessable due to invalid content
  constructor(message: string, cause: "format" | "content") {
    
    const statusMap = {
      format: 400,
      content: 422,
    }
    
    super(message, statusMap[cause]);
  }
}

export class ConflictError extends AppError {
  // 409 = conflict with current resource state
  constructor(message: string) {
    super(message, 409);
  }
}

export class NotFoundError extends AppError {
  // 404 = resource not found
  constructor(message: string) {
    super(message, 404);
  }
}

export class MonoalphabeticNoHintsLeftError extends AppError {
  constructor(message: string) {
    super(message, 403);
  }
}