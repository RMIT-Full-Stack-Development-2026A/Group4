import SignUpButton from "../../../components/reusable/SignUpButton"

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between
          bg-gradient-to-br from-red-600 to-pink-500 
          rounded-3xl px-10 py-12 shadow-2xl text-white">
            {/*LEFT*/}
            <div className="max-w-xl">
              <h1 className="text-5xl font-extrabold leading-tight">
                Join the Ultimate <br/>
                <span className="text-white/90">TicTacToang Arena</span>
              </h1>

              <p className="mt-5 text-white/80 text-lg">
                Challenge your friends, battle AI, and prove your strategy skills.
              </p>

              <div className="mt-8">
                <SignUpButton/>
              </div>
            </div>

            {/*RIGHT*/}
            <div className="mt-10 md:mt-0">
              <div className="w-[300px] h-[300px] bg-white/20 backdrop-blur-md
                    rounded-2xl flex items-center justify-center shadow-xl">
                      <span className="text-white/70">GAME IMAGE</span>
                    </div>
            </div>
          </div>
  )
}

export default Hero;