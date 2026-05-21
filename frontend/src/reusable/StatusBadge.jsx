export default function StatusBadge({ type }) {
  // Define colors based on the status type
    const styles = {
        // for admin
        premium: "bg-yellow-400 text-yellow-600",
        standard: "bg-gray-200 text-gray-700",
        active: "bg-green-500 text-white",
        deactivated: "bg-red-500 text-white",

        // for game history
        win: "bg-green-100 text-green-600",
        lose: "bg-red-100 text-red-600",
        draw: "bg-gray-200 text-gray-600",
        aborted: "bg-orange-100 text-orange-600",
    };

    return (
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize 
                         ${styles[type] || "bg-gray-100 text-gray-600"}`}>
        {type}
        </span>
    );
}