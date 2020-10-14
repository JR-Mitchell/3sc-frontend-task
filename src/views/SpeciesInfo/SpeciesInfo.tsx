//Import from external 'react' module
import React from 'react';

//Import from external 'axios' module
import axios from 'axios';

//Import from local 'parts'
import Overlay from 'parts/Overlay';

//Import from local 'components'
import TypeIcon from 'components/TypeIcon';

//Imports from local 'utils'
import type { SpeciesInterface } from 'utils/Species';
import type { PokemonInterface } from 'utils/Pokemon';

/**
 * Interface for the props of the SpeciesInfo component
 */
interface SpeciesProps {
    /**
     * Callback to close the info overlay
     */
    closeCallback: ()=>void
    /**
     * Species to show info for
     */
    species: SpeciesInterface
}

/**
 * Interface for the state of the SpeciesInfo component
 */
interface SpeciesState {
    /**
     * Info about given pokemon varieties
     */
    pokemon: PokemonInterface[];
    /**
     * Sprites for pokemon varieties
     */
    sprites: string[];
}

/**
 * SpeciesInfo component displays information about a pokemon species
 */
class SpeciesInfo extends React.Component<SpeciesProps,SpeciesState> {
    /**
     * React constructor method
     */
    constructor(props) {
        super(props);
        this.state = {pokemon:[],sprites:[]}
        //Get variety info
        for (let i=0; i<props.species.varieties.length; i++) {
            const url = props.species.varieties[i].pokemon.url;
            axios.get<PokemonInterface>(url).then((response)=>{
                let spriteUrl = "https://raw.githubusercontent.com/PokeAPI/"
                    + "sprites/master/sprites/pokemon/"
                    + "versions/generation-viii/icons/"
                    + response.data.id.toString() + ".png";
                this.setState((state,props)=>({
                    pokemon: state.pokemon.concat([response.data]),
                    sprites: state.sprites.concat([spriteUrl])
                }));
            })
        }
    }

    /**
     * React render method
     */
    render() {
        //Copy of state variable
        let pokemon = this.state.pokemon.slice();
        let sprites = this.state.sprites.slice();

        //Get genus
        let genus: string | undefined = this.props.species.genera
            ?.filter((item)=>
                item.language.name === "en"
            )?.[0]?.genus;

        //Get localised name
        let name: string | undefined = this.props.species.names
            ?.filter((item)=>
                item.language.name === "en"
            )?.[0]?.name;

        name = name || this.props.species.name;

        //Get some flavour text
        let flavour: string | undefined = this.props.
            species.flavor_text_entries
            ?.filter((item)=>
                item.language.name === "en"
            )?.[0]?.flavor_text;

        flavour = flavour.replace("\f"," ")

        //Get types
        let types: string[] = pokemon.map((item)=>{
            return item.types.map((type)=>{
                return type.type.name;
            }).join(" ");
        })

        //Get unique type combinations
        let uniqueTypes = types.filter((value,index)=>{
            return types.indexOf(value) === index;
        })

        //Get icons to go alongside types
        let iconSrces = uniqueTypes.map((item)=>{
            let retArr = [];
            types.forEach((val,index)=>{
                if (val === item) {
                    /**
                     * Sprites corresponding to the
                     * pokemon varieties of this species
                     * with the given type combinations
                     */
                    retArr.push(sprites[index]);
                }
            });
            return retArr;
        });

        return <Overlay open closeCallback={()=>{this.props.closeCallback();}}>
            <h2 className="speciesTitle">{name}</h2>
            <table>
                <tbody>
                    {uniqueTypes.map((item,index)=>{
                        let splitUp = item.split(" ");
                        return <tr key={item}>
                            <td>
                                {splitUp[0] && <TypeIcon type={splitUp[0]}/>}
                            </td>
                            <td>
                                {splitUp[1] && <TypeIcon type={splitUp[1]}/>}
                            </td>
                            {iconSrces[index]?.map((address)=>{
                                return <td key={address}>
                                    <img
                                        src={address}
                                        className="spritePlaceholder"
                                    />
                                </td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
            <em className="speciesInfo">{genus}</em>
            {flavour}
        </Overlay>
    }
}

//Default export is React SpeciesInfo component
export default SpeciesInfo;
