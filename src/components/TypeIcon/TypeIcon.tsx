//Import from external 'react' module
import React from 'react';

/**
 * TypeIcon component signifies a pokemon type,
 *      specified by "type" prop
 */
function TypeIcon(props:{type:string}) {
    let typeId: string = props.type.charAt(0).toUpperCase()
        + props.type.substr(1);
    return <div className={"typeIcon typeColour"+typeId}>
        {props.type.toUpperCase()}
    </div>
}

//Default export is TypeIcon React component
export default TypeIcon
