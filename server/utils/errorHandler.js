class ValidationError extends Error {
  constructor(statusCode, message, status, data) {
    super(message);

    this.statusCode = statusCode;
    this.name = "ValidationError";
    this.status = status;
    this.data = data;
  }
}

class PermissionError extends Error {
  constructor(statusCode, message, status) {
    super(message);

    this.name = "PermissionError";
    this.statusCode = statusCode;
    this.status = status;
  }
}

class DatabaseError extends Error {
  constructor(statusCode, message, status) {
    super(message);

    this.name = "DatabaseError";
    this.statusCode = statusCode;
    this.status = status;
  }
}

class CustomTypeError extends Error {
  constructor(statusCode, message, status, errors) {
    super(message);

    this.name = 'TypeError';
    this.statusCode = statusCode;
    this.status = status;
    this.data = errors;
  }
}

module.exports = {
  ValidationError,
  PermissionError,
  DatabaseError,
  CustomTypeError
};