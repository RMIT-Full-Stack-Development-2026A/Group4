// global error handler 
export const ErrorHandler = (err, req, res, next) => {
    // get the status code (default to 500 if the error isn't from AppError)
    const statusCode = err.status || 500;
    
    // log the error with a message
    const message = err.message || "An unexpected error occurred on the server";
    console.error(`[SERVER ERROR] ${err.name}: ${message}`);

    // send the error JSON to the frontend
    return res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        // include the stack trace (in development mode)
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
};