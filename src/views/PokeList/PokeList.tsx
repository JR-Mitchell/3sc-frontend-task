//Import from external 'react' module
import React from 'react';

//Import from external 'axios' module
import axios from 'axios';

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
     * References for each of the species to list
     */
    species: ReferenceInterface[]
    /**
     * Optional title to show above all entries
     */
    title?: string
}

function PokeList(props:ListProps){
    // Alphabetically deal with species
    let alphabetisedSpecies: {[key: string]:ReferenceInterface[]} = {};
    for (let i=0; i<props.species.length; i++) {
        let item = props.species[i];
        let firstChar = item.name.charAt(0);
        if (alphabetisedSpecies.hasOwnProperty(firstChar)) {
            alphabetisedSpecies[firstChar].push(item);
        } else {
            alphabetisedSpecies[firstChar] = [item];
        }
    }

    return <>
        {props.title && <h1>{props.title}</h1>}
        {Object.entries(alphabetisedSpecies).map((item)=>{
            /** Set of pokemon species for this letter **/
            let char = item[0];
            let speciesList = item[1];
            return <div key={"AlphaOuter"+char}>
                <h3
                    key={"AlphaTitle"+char}
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
                            key={item.name}
                            reference={{...item}}
                        />
                    })}
                </div>
            </div>
        })}
    </>
}

//Default export is PokeList React component
export default PokeList;
