import { Router } from 'express';
import * as subsController from './subscription.controller.js';
import { authMiddleware } from '../shared/shared.middleware.js';
import { validateDeposit } from './subscription.middleware.js';

const subsRouter = Router();

subsRouter.use(authMiddleware);
subsRouter.get('/plan', subsController.getPlanDetails);
subsRouter.get('/history', subsController.getTransactionHistory);
subsRouter.post('/deposit', subsController.depositMoney);
subsRouter.post('/buy-wallet', subsController.buyPremiumWithWallet);
subsRouter.post('/stripe-checkout', subsController.createStripeSession);
subsRouter.post('/stripe-verify', subsController.confirmStripePayment);

export default subsRouter;