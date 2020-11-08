//Import from external 'react' module
import React from 'react';

//Import from local 'utils'
import type { GenerationInterface } from 'utils/Generation';

/**
 * Interface for props of the MenuBarButton component
 */
interface MenuBarButtonProps {
    /**
     * The generation that this button is for
     */
    gen: GenerationInterface
    /**
     * Callback to be called on button click
     */
    callback: ()=>void
    /**
     * Position string for working out css classname
     */
    pos: string
    /**
     * The label for the button
     */
    label: string
}

/**
 * Button for a single generation on the top bar
 * OnClick event shows all species in this generation
 */
function MenuBarButton(props:MenuBarButtonProps) {
    return <button
        className={"menuBarGenButton"+props.pos}
        aria-label={"Show all pokemon in "+props.label}
        onClick={()=>{props.callback();}}
    >
        {props.label}
    </button>
}

//Default export is MenuBarButton React component
export default MenuBarButton;
