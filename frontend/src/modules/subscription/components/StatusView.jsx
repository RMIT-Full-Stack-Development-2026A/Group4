import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useOutletContext } from 'react-router-dom';
import { BlackButton, WhiteButton } from '../../../reusable/CustomButtons';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function StatusView () {

    const { verifyStripePayment } = useOutletContext();
    
    // set up local hooks
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('success');

    useEffect(() => {
        // Check if we just returned from Stripe
        const sessionId = searchParams.get('session_id');
        const isFailure = searchParams.get('failure') === 'true'

        // If it's a Stripe failure
        if (isFailure) {
            setStatus('failure');
            return;
        }

        // If it's a Stripe success, we must verify it first
        if (sessionId) {
            setStatus('verifying');
            
            verifyStripePayment(sessionId)
            .then((isSuccess) => {
                setStatus(isSuccess ? 'success' : 'failure');
            }).catch(() => { setStatus('failure') });
        }
        
        // If neither exists, it was a Wallet purchase, so it stays on 'success'
        
    }, [searchParams, verifyStripePayment]);


    if (status === 'verifying') {
        return (
            <div className='flex flex-col items-center justify-center gap-4 text-gray-500'>
                <Loader2 className='animate-spin' size={40} />
                <p className='font-bold uppercase tracking-widest text-sm'>Verifying Payment...</p>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className='flex flex-col items-center text-center gap-5'>
                <CheckCircle2 size={60} className='text-green-500' />
                <h2 className='font-black text-3xl text-gray-800 uppercase tracking-tighter'>Payment Successful.</h2>
                <h3 className='font-medium text-gray-500 mb-4'>Premium Arena is now accessible.</h3>
                
                <div className='flex flex-col gap-3 w-full max-w-xs'>
                    <BlackButton label="Go back to Lobby" onClick={() => navigate('/lobby')} />
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center text-center gap-5'>
            <XCircle size={60} className='text-red-500' />
            <h2 className='font-black text-3xl text-red-600 uppercase tracking-tighter'>Payment Failed.</h2>
            <h3 className='font-medium text-gray-500 mb-4'>Something went wrong. Please try again later!</h3>
            
            <div className='flex flex-col gap-3 w-full max-w-xs'>
                <BlackButton label="Try Again" onClick={() => navigate('/subscription/method')} />
                <WhiteButton label="Go back to Lobby" onClick={() => navigate('/lobby')} />
            </div>
        </div>
    );
};