//Import from external 'react' module
import React from 'react';

//Import from external 'react-scroll' module
import { Link } from 'react-scroll';

//Imports from local 'utils'
import type { ReferenceInterface } from 'utils/Reference';

//Imports from local 'components'
import SpeciesCard from 'components/Species';

/**
 * Interface for props of the DragBar component
 */
interface DragBarProps {
    /**
     * Position string for working out css classname
     */
    pos: string
    /**
     * Callback to call upon dropping a species into the drag bar
     */
    dropCallback: (event: React.DragEvent<HTMLDivElement>)=>void
    /**
     * Callback to call upon ending a species' drag event
     */
    dragEndCallback: (index: number)=>void
    /**
     * Array of References for species to display in card area
     */
    contents: ReferenceInterface[]
}

/**
 * DragBar component at right hand side of page
 * Displays a favourites box where species cards
 * may be dragged and dropped for safe keeping
 */
function DragBar(props: DragBarProps) {
    return <div className={"dragBarDiv"+props.pos}>
        <h3 className={"dragBarTitle"+props.pos}>
            Favourites
        </h3>
        <h4 className={"dragBarTitle"+props.pos}>
            Drag a pokemon card to the area below!
        </h4>
        <div
            className={"dragBarDropBox"+props.pos}
            onDragOver={(event)=>{event.preventDefault();}}
            onDrop={(event)=>{props.dropCallback(event);}}
        >
            {props.contents.map((item,index)=>{
                return <SpeciesCard
                    showGrab
                    key={item.name}
                    reference={item}
                    dragEndCallback={(event)=>{
                        event.dataTransfer.dropEffect==="none"
                            && props.dragEndCallback(index);
                    }}
                />
            })}
        </div>
    </div>
}

//Default export is DragBar component
export default DragBar;
