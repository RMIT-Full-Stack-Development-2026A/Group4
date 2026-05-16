export default function PlanDetails({ plan, user }) {
    return (
        <div className='mt-6 text-center flex flex-col gap-1 px-10'>
            <h1 className='text-3xl font-black uppercase tracking-tighter text-gray-800'>
                {plan.name}
            </h1>
            
            <p className='text-gray-500 text-sm italic mb-4'>
                "{plan.features}"
            </p>

            <div className='flex justify-center gap-10 border-t border-gray-100 pt-4'>
                <div className='flex flex-col'>
                    <span className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Monthly Fee</span>
                    <span className='text-xl font-black text-pink-600'>${plan.price}.00</span>
                </div>
                
                <div className='flex flex-col'>
                    <span className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Current Status</span>
                    <span className={`font-bold text-lg uppercase ${user?.isPremium ? 'text-green-500' : 'text-gray-300'}`}>
                        {user?.isPremium ? 'Active' : 'Not Active'}
                    </span>
                </div>
            </div>
        </div>
    )
}
