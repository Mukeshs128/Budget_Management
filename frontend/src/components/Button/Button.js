import React from 'react';

function Button({
    name,
    icon,
    onClick,
    bg,        
    color,     
    bPad = '0.8rem 1.6rem', // Default padding if not provided
    bRad = '30px',       // Default border radius
    disabled = false,    // Optional disabled prop

}) {
    return (
        <div
            className="buttonStyled"
            style={{
                background: bg,
                padding: bPad,
                borderRadius: bRad,
                color: color,
                cursor: disabled ? 'not-allowed' : 'pointer', // Change cursor on hover when disabled
            }}
            onClick={disabled ? null : onClick} // Disable click when button is disabled
        >
            {icon && <span className="icon">{icon}</span>} {/* Render icon if it exists */}
            {name && <span className="button-text">{name}</span>} {/* Render name if it exists */}
        </div>
    );
}

export default Button;

