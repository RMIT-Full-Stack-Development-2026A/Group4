// Error class for custom error handling
class AppError extends Error {
    // Constructor definition: 
    constructor ( status, message, isOperational = true ) {
        // Constructor
        super(status);
        // Attributes: 
        this.status = status,
        this.message = message
        this.name = this.constructor.name;
        // Capture the stack tracer, excluding the current constructor
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
};

export default AppError;