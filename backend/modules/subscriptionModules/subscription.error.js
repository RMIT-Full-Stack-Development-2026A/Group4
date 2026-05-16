import AppError from "../shared/AppError.js";

// Wallet balance is too low
export class insufficientFundsError extends AppError {
    constructor(message = "Insufficient funds in your wallet!") {
        super(400, message);
    }
}

// Stripe communication issues
export class stripeSessionError extends AppError {
    constructor(message = "Unable to connect to payment provider. Please try again.") {
        super(503, message);
    }
}

// Stripe communication issues
export class stripePaymentError extends AppError {
    constructor(message = "Stripe payment not verified.") {
        super(503, message);
    }
}


// Transaction failure
export class transactionFailedError extends AppError {
    constructor(message = "The transaction could not be completed.") {
        super(500, message);
    }
}

// Invalid amount of deposit (x<=0)
export class invalidAmountError extends AppError {
    constructor(message = "Please enter a valid deposit amount.") { super(400, message); }
}
