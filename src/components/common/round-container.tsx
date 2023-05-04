import React from "react";

interface RoundContainerProps {
    backgroundColor?: string;
    style?: React.CSSProperties;
}

export const RoundContainer = <T extends RoundContainerProps>(props: React.PropsWithChildren<T>) => {
    const containerStyle = {
        padding: '20px 14px 20px 14px',
        margin: '0px 10px',
        borderRadius: '18px',
        backgroundColor: props.backgroundColor || 'transparent',
        ...props.style
    };

    return (
        <div className="round-container" style={containerStyle}>
            {props.children}
        </div>
    )
}