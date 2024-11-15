// Button.js
export default function Button({ children, onClick, color = "blue", className = "" }) {
    const colorClasses = {
        blue: "bg-blue-600 hover:bg-blue-700",
        green: "bg-green-600 hover:bg-green-700",
        red: "bg-red-600 hover:bg-red-700",
    };

    return (
        <button
            onClick={onClick}
            className={`text-white py-2 px-4 rounded ${colorClasses[color]} ${className}`}
        >
            {children}
        </button>
    );
}
