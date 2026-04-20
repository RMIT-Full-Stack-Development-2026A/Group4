// need some more refinement
export default function Logo({size}) {
    const imgSize = size === "large" ? "max-w-[80px]" : 
                    size === "medium" ? "max-w-[60px]" : "max-w-[40px]";

    const textSize = size === "large" ? "text-3xl" : 
                     size === "medium" ? "text-xl" : "text-lg";

    return (
        <div className="flex w-full items-center justify-between gap-2">
            
            <div className="flex-1 min-w-0 font-baloo font-bold text-black">
                TicTacToang
            </div>

            <div className={`w-[30%] ${imgSize} aspect-square shrink-0`}>
                <img 
                    src="/"
                    alt="Logo"
                    className="h-full w-full object-contain" 
                />
            </div>
            
        </div>
    )
}