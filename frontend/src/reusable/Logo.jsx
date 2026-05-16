import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link
      to="/lobby"
      className="
        text-3xl md:text-4xl font-extrabold
        tracking-tight
        
        inline-block pb-1
        text-transparent bg-clip-text 
        bg-linear-to-r from-red-600 to-pink-500

        hover:scale-105
        transition duration-300
      "
    >
      TicTacToang
    </Link>
  );
};

export default Logo;