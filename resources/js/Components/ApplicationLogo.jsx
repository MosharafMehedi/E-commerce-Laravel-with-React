export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 180 180"
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 mb-4"
        >
            <defs>
                <linearGradient id="flatGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2196F3" />
                    <stop offset="100%" stopColor="#4CAF50" />
                </linearGradient>
            </defs>
            
            {/* Flat M design */}
            <path 
                d="M45 45V135L90 90L135 135V45L90 90Z" 
                fill="url(#flatGradient)" 
                opacity="0.9"
            />
            
            {/* Shopping bag overlay */}
            <path 
                d="M90 70C110 70 125 85 125 105C125 125 110 140 90 140C70 140 55 125 55 105C55 85 70 70 90 70Z" 
                fill="none" 
                stroke="white" 
                strokeWidth="5" 
                strokeLinecap="round"
            />
            
            {/* Bag handle */}
            <path 
                d="M75 70C75 60 80 55 90 55C100 55 105 60 105 70" 
                fill="none" 
                stroke="white" 
                strokeWidth="5" 
                strokeLinecap="round"
            />
            
            {/* Text */}
            <text 
                x="90" 
                y="155" 
                textAnchor="middle" 
                fill="#333" 
                fontSize="14" 
                fontWeight="bold"
            >
                M SHOPPING
            </text>
        </svg>
    );
}