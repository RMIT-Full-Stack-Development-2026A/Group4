// Importing dependencies: 
import { Link } from 'react-router-dom';
// Importing components
import LoginButton from '../../reusable/LoginButton';
import SignupButton from '../../reusable/SignupButton';
import Logout from './Logout';
import Logo from '../../reusable/Logo';

// Component:
const PublicNavBar = () => {
    return (
      <nav className='flex justify-between align-center'>
        <div>
          <Logo />
        </div>
        <div>
          <LoginButton />
          <SignupButton />
        </div>
      </nav>
  )
}

export default PublicNavBar