//Import from external 'react' module
import React from 'react';

//Import from local 'utils' directory
import type { SpeciesInterface } from 'utils/Species';
import type { PokemonInterface } from 'utils/Pokemon';

//Import from local 'components' directory
import InfoTable from 'components/InfoTable';

interface BaseStatsProps {
    species: SpeciesInterface[],
    varieties: PokemonInterface[],
    names: string[]
}

function BaseStatTable(props: BaseStatsProps) {
    let data: {[key: string]:{[statName: string]:string|number}} = {};
    props.varieties.forEach((poke,index)=>{
        const pokeName = props.names[index];
        data[pokeName] = {};
        poke.stats.forEach((stat)=>{
            data[pokeName][stat.stat.name.toUpperCase()] = stat.base_stat;
        });
    });
    return <InfoTable
        compareNumbers={props.varieties.length>1}
        title="Base Stats"
        data={data}
    />
}

export default BaseStatTable;
