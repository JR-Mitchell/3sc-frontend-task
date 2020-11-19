//Import from external 'react' module
import React from 'react';

//Import from external 'react-scroll' module
import { Element } from 'react-scroll';

//Import from external 'react-redux' module
import { useSelector } from 'react-redux';

//Import from local 'components' directory
import SpeciesCard from 'components/Species';

//Import from local 'reducers' directory
import type { SidebarStateInterface, PokelistStateInterface, TotalStateInterface } from 'reducers';

/**
 * PokeList component - displays selected list of pokemon
 */
function PokeList(props: {}) {
    const classNameMod: SidebarStateInterface = useSelector((state: TotalStateInterface) => state.sidebar);
    const pokeList: PokelistStateInterface = useSelector((state: TotalStateInterface) => state.pokeList);
    return <div className={"poke-list"+classNameMod}>
        {pokeList.binnedOrder.map((key)=>{
            return <Element key={key} name={"category-title-"+key}>
                <div>
                    <h3
                        className={"poke-list__bin-title"+classNameMod}
                        aria-label={"Pokemon whose names begin with "+key}
                    >
                        {key.toUpperCase()}
                    </h3>
                    <div className={"poke-list__bin-container"+classNameMod}>
                        {pokeList.binnedList[key]?.map((item)=>{
                            return <SpeciesCard species={item} key={item.name} showInfoButton />
                        })}
                    </div>
                </div>
            </Element>
        })}
    </div>
}

export default PokeList;
