//Import from external 'react' module
import React from 'react';

/**
 * TypeIcon component signifies a pokemon type,
 *      specified by "type" prop
 */
function TypeIcon(props:{type:string}) {
    return <div className={"type-icon type-colour "+props.type}>
        {props.type.toUpperCase()}
    </div>
}

//Default export is TypeIcon React component
export default TypeIcon
