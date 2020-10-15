//Import from external 'react' module
import React from 'react';

/**
 * Interface for the props of the Overlay component
 */
interface OverlayProps {
    /**
     * Whether the overlay is open
     */
    open: boolean
    /**
     * Callback to close the overlay
     */
    closeCallback: ()=>void
    /**
     * Children to render inside of the overlay
     */
    children?: React.ReactNode
}

/**
 * Overlay component displays information in a closable overlay
 */
function Overlay(props:OverlayProps) {
    if (props.open) {
        return <div className="overlayOuter" onClick={(event)=>{
            let target = event.target as HTMLInputElement
            if (target.classList?.[0] === "overlayOuter") {
                props.closeCallback();
            }
        }}>
            <div className="overlayInner">
                {props.children}
            </div>
            <button
                className="overlayCloseButton"
                onClick={()=>{props.closeCallback()}}
            >
                <div className="overlayCloseButtonCross first" />
                <div className="overlayCloseButtonCross second" />
            </button>
        </div>
    }
    return null;
}

//Default export is the Overlay component
export default Overlay;
