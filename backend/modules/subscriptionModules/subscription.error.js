// Can't purchase:
class UnableToPurchaseError extends AppError {
    constructor (message = 'Unable to process purchase') {
        super(500, message);
    }
};
// Invalid payment method error:
class InvalidPaymentMethodError extends AppError {
    constructor( message = 'Invalid payment method' ) {
        super(501, message);
    }
};
// 
