import { Router } from 'express';
import * as subsController from './subscription.subsController.js';
import { authMiddleware } from '../shared/shared.middleware.js';

const subsRouter = Router();

subsRouter.use(authMiddleware);
subsRouter.get('/history', subsController.getTransactionHistory);
subsRouter.post('/deposit', subsController.depositMoney);
subsRouter.post('/subscribe', subsController.purchaseSubscription);
subsRouter.post('/stripe', subsController.createStripeSession);

export default subsRouter;