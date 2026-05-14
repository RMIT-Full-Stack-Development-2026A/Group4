import React from 'react';
import useSubscription from '../hook/useSubscription';

const SubscriptionPage = () => {
    // Logic from consolidated hook
    const { plan, loading, user, handleStripePurchase, handleWalletPurchase } = useSubscription();

    return (
        <div className="flex flex-col gap-10 md:flex-row sm:flex-col justify-center align-middle">

            <div className='
                transition-transform duration-300 
                shadow-[0px_4px_9px_0px_rgba(0,0,0,0.1)] 
                hover:scale-102 m-5 p-8 rounded-xl bg-white
                flex flex-col gap-6 align-baseline min-w-[380px]'
            >
                {/* Plan Header */}
                <h2 className='font-bold text-2xl text-gray-800'>
                    {plan.name} | <span className='font-normal text-gray-500'>${plan.price}/Month</span>
                </h2>
                
                {/* Plan Features */}
                <p className='font-light text-sm text-gray-600 border-b pb-4'>
                    <b>Included:</b> {plan.features}
                </p>

                {/* Logic for Action Buttons */}
                <div className="flex flex-col gap-3 w-full">
                    {user?.isPremium ? (
                        /* IF ALREADY PREMIUM: Show status and cancel option */
                        <>
                            <div className="text-center p-4 bg-green-50 text-green-700 font-bold rounded-xl text-sm border border-green-100">
                                YOUR PLAN IS ACTIVE
                            </div>
                            <button className='text-gray-400 hover:text-red-500 font-bold text-xs uppercase cursor-pointer transition-colors mt-2'>
                                Cancel Subscription
                            </button>
                        </>
                    ) : (
                        /* IF STANDARD: Show teammate's original purchase buttons */
                        <>
                            <button 
                                onClick={handleStripePurchase} 
                                disabled={loading}
                                className='
                                    bg-gray-900 hover:bg-gray-700 
                                    cursor-pointer rounded-xl text-white 
                                    p-5 font-bold transition-all shadow-md'
                            >
                                {loading ? 'PROCESSING...' : 'BUY WITH STRIPE'}
                            </button>

                            <button 
                                onClick={handleWalletPurchase} 
                                disabled={loading}
                                className='
                                    border-2 border-gray-900 hover:bg-gray-50 
                                    cursor-pointer rounded-xl text-gray-900 
                                    p-5 font-bold transition-all'
                            >
                                {loading ? 'PROCESSING...' : 'BUY WITH WALLET'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SubscriptionPage;