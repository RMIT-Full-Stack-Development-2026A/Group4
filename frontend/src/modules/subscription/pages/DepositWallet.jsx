import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../hook/useSubscription';
import { BlackButton, WhiteButton } from '../../../reusable/CustomButtons';
import { Wallet } from 'lucide-react';

export default function DepositWallet() {
    const navigate = useNavigate();
    const { user, loading, errorMessage, handleDeposit } = useSubscription();
    console.log(user)
    // Local state for the input box
    const [amount, setAmount] = useState('');

    const onConfirm = async () => {
        const success = await handleDeposit(Number(amount));
        if (success) {
            navigate('/profile');
        }
    };

    return (
        <div className='
            min-h-screen flex items-center justify-center 
            bg-linear-to-br'
        >
            <div className='
                bg-linear-to-br from-red-600 to-pink-500 
                shadow-2xl rounded-3xl p-10 w-full max-w-md 
                flex flex-col gap-6 text-white'
            >
                {/* Header Section */}
                <div className="flex flex-col items-center gap-2 mb-2">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white mb-2 shadow-inner">
                        <Wallet size={32} />
                    </div>
                    <h1 className='text-3xl text-center font-bold uppercase tracking-tight'>
                        Top Up Wallet
                    </h1>
                    <p className="text-sm text-white/70 font-medium">
                        Current Balance: <span className="font-bold text-white">${user?.wallet_balance || 0}</span>
                    </p>
                </div>

                {/* Input Field */}
                <div className='flex flex-col gap-2'>
                    <label className='text-xs font-bold uppercase tracking-widest text-white/60'>
                        Enter Amount ($)
                    </label>
                    <input
                        className='
                            bg-white/20 border border-white/30 rounded-xl p-4 
                            text-2xl font-black text-white placeholder-white/40 
                            focus:outline-none focus:ring-2 focus:ring-white/50 
                            transition-all text-center'
                        value={amount}
                        type='number'
                        placeholder="0.00"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                {/* Deposit Button */}
                <BlackButton 
                    label={loading ? "PROCESSING..." : "DEPOSIT"}
                    disabled={loading}
                    onClick={onConfirm}
                />

                {/* Error Display */}
                {errorMessage && (
                    <div className='
                        text-center text-red-200 font-bold text-sm 
                        bg-red-900/20 border border-red-500/30 p-3 rounded-lg'
                    >
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};