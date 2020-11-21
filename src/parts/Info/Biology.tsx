//Import from external 'react' module
import React from 'react';

//Import from local 'utils' directory
import type { SpeciesInterface } from 'utils/Species';
import type { PokemonInterface } from 'utils/Pokemon';
import getLocalisedGenus from 'utils/Species';

//Import from local 'components' directory
import InfoTable from 'components/InfoTable';

//Import from local 'reducers' directory
import type { TotalStateInterface } from 'reducers';

interface MetaProps {
    species: SpeciesInterface[],
    varieties: PokemonInterface[],
    names: string[],
    languageCode: string
}

function MetaTable(props: MetaProps) {
    let data: {[key: string]:{[statName: string]:string|number}} = {};
    props.species.forEach((species,index)=>{
        const pokeName = props.names[index];
        const poke = props.varieties[index];
        data[pokeName] = {
            Genus: getLocalisedGenus(species,props.languageCode),
            "Gender Ratio": (species.gender_rate && species.gender_rate !== -1)
                ? "Female: "+(12.5*species.gender_rate).toString()+"% Male: "+(100-(12.5*species.gender_rate)).toString()+"%"
                : "Genderless: 100%",
            "Hatch Time": (257*species.hatch_counter).toString()+" - "+(257*species.hatch_counter + 256).toString()+" Steps"
        };
        if (poke) {
            data[pokeName]["Height"] = poke.height;
            data[pokeName]["Weight"] = poke.weight;
        }
    });
    return <InfoTable
        compareNumbers={props.species.length>1}
        title="Biology"
        data={data}
    />
}

export default MetaTable;
