import { Brain, Gamepad2, Users } from "lucide-react"

const Features = () => {
    return (
        <div className="grid md:grid-cols-3 gap-8">

            <div className="card flex flex-col items-center text-center gap-4">
                <Gamepad2 size={40} className="text-red-500"/>
                <p className="font-semibold text-gray-700">
                    Custom Board Layouts
                </p>
            </div>

            <div className="card flex flex-col items-center text-center gap-4">
                <Users size={40} className="text-red-500"/>
                <p className="font-semibold text-gray-700">
                    Play With Friends
                </p>
            </div>

            <div className="card flex flex-col items-center text-center gap-4">
                <Brain size={40} className="text-red-500"/>
                <p className="font-semibold text-gray-700">
                    Same AI Opponents
                </p>
            </div>
        </div>
    );
};

export default Features;