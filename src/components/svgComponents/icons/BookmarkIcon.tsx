import React from 'react'

interface BookmarkIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

const BookmarkIcon: React.FC<BookmarkIconProps> = ({ className }) => {
    return (
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="48" 
        height="48" 
        viewBox="0 0 48 48" 
        className={ className }
        fill="none">
            
        <path d="M37 5H13C10.8 5 9 6.8 9 9V41C9 43.2 10.8 45 13 45H37C39.2 45 41 43.2 41 41V9C41 6.8 39.2 5 37 5ZM19 9H23V19L21 17.5L19 19V9ZM37 41H13V9H15V27L21 22.5L27 27V9H37V41Z" fill="black"/>
        <path d="M36 3.99995H12C9.80004 3.99995 8.00004 5.79995 8.00004 7.99995V40C8.00004 42.2 9.80004 44 12 44H36C38.2 44 40 42.2 40 40V7.99995C40 5.79995 38.2 3.99995 36 3.99995ZM18 7.99995H22V18L20 16.5L18 18V7.99995ZM36 40H12V7.99995H14V26L20 21.5L26 26V7.99995H36V40Z" fill="#454545"/>
    </svg>
    )
}

export default BookmarkIcon
