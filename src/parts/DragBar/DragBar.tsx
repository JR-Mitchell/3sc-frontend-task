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
    dropCallback: (event: React.DragEvent<HTMLDivElement>,index?:number)=>void
    /**
     * Callback to call upon ending a species' drag event
     */
    dragEndCallback: (isFav: boolean, index: number)=>void
    /**
     * Callback to call upon clicking the compare button
     */
    compareCallback: ()=>void
    /**
     * Array of References for species to display in card area
     */
    contents: ReferenceInterface[]
    /**
     * Array of two species References to display in
     * comparison area
     */
    compare: (ReferenceInterface | undefined)[]
}

/**
 * DragBar component at right hand side of page
 * Displays a favourites box where species cards
 * may be dragged and dropped for safe keeping
 */
function DragBar(props: DragBarProps) {
    return <aside className={"dragBarAside"+props.pos} role="complementary">
        <div className="dragBarFavDiv">
            <h3 className={"dragBarTitle"+props.pos}>
                Favourites
            </h3>
            <h4 className={"dragBarTitle"+props.pos}>
                Drag a Pokemon card to the area below
                to add it to your favourites
            </h4>
            <div
                className={"dragBarDropBox"+props.pos}
                onDragOver={(event)=>{event.preventDefault();}}
                onDrop={(event)=>{props.dropCallback(event);}}
            >
                {props.contents.map((item,index)=>{
                    return <SpeciesCard
                        showGrab
                        showInfoButton
                        key={item.name}
                        reference={item}
                        dragEndCallback={(event)=>{
                            event.dataTransfer.dropEffect==="none"
                                && props.dragEndCallback(true,index);
                        }}
                    />
                })}
            </div>
        </div>
        <div className="dragBarCompeteDiv">
            <h3 className={"dragBarTitle"+props.pos}>
                Compare Pokemon
            </h3>
            <div className="dragBarCompeteInner">
                <div
                    className="dragBarCompeteSlot"
                    onDragOver={(event)=>{event.preventDefault();}}
                    onDrop={(event)=>{props.dropCallback(event,0);}}
                >
                    {props.compare[0] && <SpeciesCard
                        flexGrow
                        key={props.compare[0].name}
                        reference={props.compare[0]}
                        dragEndCallback={(event)=>{
                            event.dataTransfer.dropEffect==="none"
                                && props.dragEndCallback(false,0);
                        }}
                    />
                    }
                </div>
                VS
                <div
                    className="dragBarCompeteSlot"
                    onDragOver={(event)=>{event.preventDefault();}}
                    onDrop={(event)=>{props.dropCallback(event,1);}}
                >
                    {props.compare[1] && <SpeciesCard
                        flexGrow
                        key={props.compare[1].name}
                        reference={props.compare[1]}
                        dragEndCallback={(event)=>{
                            event.dataTransfer.dropEffect==="none"
                                && props.dragEndCallback(false,1);
                        }}
                    />
                    }
                </div>
            </div>
            <button
                className="dragBarCompeteButton"
                onClick={()=>{props.compareCallback();}}
            >
                Compare!
            </button>
        </div>
    </aside>
}

//Default export is DragBar component
export default DragBar;
