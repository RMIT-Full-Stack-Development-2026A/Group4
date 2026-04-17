export default function StatusBadge({ type }) {
  // Define colors based on the status type
    const styles = {
        premium: "bg-yellow-400 text-yellow-600",
        standard: "bg-gray-200 text-gray-700",
        active: "bg-green-500 text-white",
        deactivated: "bg-red-500 text-white",
    };

    return (
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${styles[type]}
                        bg-yellow-400 text-yellow-600`}>
        {type}
        </span>
    );
}