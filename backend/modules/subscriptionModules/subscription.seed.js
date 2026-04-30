// Seed is for populating the database with information;
import dotenv from 'dotenv';
import Stripe from 'stripe';
import mongoose from 'mongoose';
const stripe = Stripe();
import { createNewSubscriptionPlan } from './subscription.repository.js';
import { SubscriptionPlan } from './subscription.model.js';

export const syncPlanWithStripe = async () => {
    try {
        // getting all price id:
        const prices = await stripe.prices.list({
            active: true,
            expand: ['data.product'],
        })
        console.log(prices);
        const syncPromises = prices.data.map(async (price)=>{
            return await SubscriptionPlan.findOneAndUpdate(
                {stripePriceId: price.id},
                {
                    name: price.product.name,
                    features: price.product.description,
                    price: price.unit_amount/100,
                },
                {upsert: true, new: true},
            )
        });
        await Promise.all(syncPromises);
        console.log('Successfully synced stripe with mongodb atlas')
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
syncPlanWithStripe();