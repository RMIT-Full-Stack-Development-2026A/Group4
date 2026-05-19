import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { CreditCard, Wallet } from 'lucide-react';
import { SelectionButton, BlackButton, WhiteButton } from '../../../reusable/CustomButtons';

export default function MethodView() {
    const { user, loading, startStripePurchase, handleWalletPurchase, errorMessage } = useOutletContext();
    const navigate = useNavigate();

    const [selectedMethod, setSelectedMethod] = useState('stripe'); // 'stripe' or 'wallet'

    const onConfirm = () => {
        if (selectedMethod === 'stripe') {
            startStripePurchase();
        } else {
            handleWalletPurchase();
        }
    };

    return (
        <div className='flex flex-col items-center gap-6 w-full max-w-sm mx-auto'>
            
            <div className='w-full text-center'>
                <p className='font-bold text-gray-700 mb-4'>Choose a payment method:</p>
                
                {/* Payment Options */}
                <div className='flex flex-col gap-3 w-full'>
                    <SelectionButton 
                        label="Stripe (Credit Card)"
                        Icon={CreditCard}
                        isActive={selectedMethod === 'stripe'}
                        onClick={() => setSelectedMethod('stripe')}
                    />
                    
                    <SelectionButton 
                        label={`Wallet (Balance: $${user?.wallet_balance || 0})`}
                        Icon={Wallet}
                        isActive={selectedMethod === 'wallet'}
                        onClick={() => setSelectedMethod('wallet')}
                    />
                </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className='text-red-500 font-bold text-sm text-center'>
                    {errorMessage}
                </div>
            )}

            {/* Action Buttons */}
            <div className='flex flex-col w-full gap-3 mt-2'>
                <BlackButton 
                    label={loading ? "PROCESSING..." : "CONFIRM"}
                    onClick={onConfirm}
                    disabled={loading}
                />
                
                <WhiteButton 
                    label="Cancel"
                    onClick={() => navigate('/subscription')} // Goes back to IndexView
                    disabled={loading}
                />
            </div>

        </div>
    );
};
