//Import from external 'react' module
import React from 'react';

//Import from local 'utils' directory
import type { SpeciesInterface } from 'utils/Species';
import type { PokemonInterface } from 'utils/Pokemon';

//Import from local 'components' directory
import InfoTable from 'components/InfoTable';

interface MetaProps {
    species: SpeciesInterface[],
    varieties: PokemonInterface[],
    names: string[]
}

function MetaTable(props: MetaProps) {
    let data: {[key: string]:{[statName: string]:string|number}} = {};
    props.species.forEach((species,index)=>{
        const pokeName = props.names[index];
        const poke = props.varieties[index];
        data[pokeName] = {
            "Capture Rate": species.capture_rate,
            "Base Happiness": species.base_happiness,
            "Growth Rate": species.growth_rate?.name
        };
        if (poke) {
            data[pokeName]["Base Experience"] = poke.base_experience;
            let evYields: string[] = [];
            poke.stats.forEach((item)=>{
                if (item.effort) {
                    evYields.push(
                        item.effort.toString() + " "
                        + item.stat.name.toUpperCase()
                        + " Point"
                        + (item.effort == 1 ? "" : "s")
                    );
                }
            });
            data[pokeName]["EV Yields"] = evYields.join(", ");
        }
    });
    return <InfoTable
        compareNumbers={props.species.length>1}
        title="Metainfo"
        data={data}
    />
}

export default MetaTable;
