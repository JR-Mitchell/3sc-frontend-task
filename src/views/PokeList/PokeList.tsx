//Import from external 'react' module
import React from 'react';

//Import from external 'axios' module
import axios from 'axios';

//Import from external 'react-scroll' module
import { Element } from 'react-scroll';

//Imports from local 'utils'
import type { ReferenceInterface } from 'utils/Reference';

//Imports from local 'components'
import SpeciesCard from 'components/Species';

//Import stylesheet
import 'style.css';

/**
 * Interface for the props of the PokeList component
 */
interface ListProps {
    /**
     * An object of reference lists to pokemon species
     * to show, broken into scrollable sections
     * identified by their key
     */
    species: {[key:string]:ReferenceInterface[]}
    /**
     * Optional title to show above all entries
     */
    title?: string
    /**
     * Callback to call when a species card is dragged
     */
    dragCallback: ()=>void
    /**
     * Callback to call when a species card stops being dragged
     */
    dragEndCallback: ()=>void
}

function PokeList(props:ListProps){
    return <>
        {props.title && <h1 className="speciesListTitle">{props.title}</h1>}
        {Object.entries(props.species).map((item)=>{
            /** Set of pokemon species for this letter **/
            let char = item[0];
            let speciesList = item[1];
            return <Element key={"AlphaOuter"+char} name={"AlphaElem-"+char}>
                <h3
                    className="speciesListAlphaTitle"
                >
                    {char.toUpperCase()}
                </h3>
                <div
                    key={"AlphaDiv"+char}
                    className="speciesListAlphaDiv"
                >
                    {speciesList.map((item)=>{
                        return <SpeciesCard
                            showGrab
                            key={item.name}
                            reference={{...item}}
                            dragCallback={()=>{props.dragCallback();}}
                            dragEndCallback={()=>{props.dragEndCallback();}}
                        />
                    })}
                </div>
            </Element>
        })}
    </>
}

//Default export is PokeList React component
export default PokeList;
