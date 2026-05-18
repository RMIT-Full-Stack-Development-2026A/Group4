import { useOutletContext, useNavigate } from 'react-router-dom';
import { BlackButton } from '../../../reusable/CustomButtons';

export default function IndexView() {
    const { user } = useOutletContext();
    
    const navigate = useNavigate();

    return (
        <div className='flex justify-center gap-6'>
            <BlackButton 
                label="Subscribe"
                onClick={() => navigate('/subscription/method')}
                disabled={user?.isPremium}
                className="w-48"
            />
        </div>
    );
};