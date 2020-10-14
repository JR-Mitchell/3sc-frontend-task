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
}

/**
 * Button for a single generation on the top bar
 * OnClick event shows all species in this generation
 */
function MenuBarButton(props:MenuBarButtonProps) {
    //Format name nicely
    let nameParts: string[] = props.gen.name.split("-");
    let front = nameParts[0]
        && nameParts[0].charAt(0).toUpperCase() + nameParts[0].substr(1);
    let back = nameParts[1]?.toUpperCase();

    return <button
        className={"menuBarGenButton"+props.pos}
        onClick={()=>{props.callback();}}
    >
        {front}
        {" "}
        {back}
    </button>
}

//Default export is MenuBarButton React component
export default MenuBarButton;
