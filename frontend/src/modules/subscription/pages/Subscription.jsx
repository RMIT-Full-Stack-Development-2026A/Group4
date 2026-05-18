import { Outlet } from 'react-router-dom'
import { useSubscription } from '../hook/useSubscription'
import { Hash } from 'lucide-react'
import PlanDetails from '../components/PlanDetails'

export default function Subscription() {
    
    const subscriptionHooks = useSubscription()

    return (
        <div className='flex justify-center mt-10'>
            <div className='w-[720px] bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col min-h-[600px]'>
                
                {/*Static Upper Half*/}
                <div className='relative flex flex-col items-center pb-6'>
                    {/* The Colored Stripe */}
                    <div className='w-full h-32 bg-linear-to-r from-red-600 to-pink-500'></div>

                    {/* The Overlapping Circle Icon */}
                    <div className='
                        -mt-12 w-24 h-24 rounded-full bg-white 
                        border-4 border-white shadow-lg flex 
                        items-center justify-center'
                    >
                        <Hash size={48} className='text-pink-500' />
                    </div>

                    {/* Centered Text Info*/}
                    <PlanDetails 
                        plan={subscriptionHooks.plan} 
                        user={subscriptionHooks.user} 
                    />
                </div>

                {/* Dynamic Lower Half (Pass the hooks in)*/}
                <div className='flex-1 p-10 border-t'>
                    <Outlet context={subscriptionHooks} />
                </div>

            </div>
        </div>
    )
}