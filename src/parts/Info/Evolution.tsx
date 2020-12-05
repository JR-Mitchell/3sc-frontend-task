//Import from external 'react' module
import React from 'react';

//Import from local 'reducers' directory
import type { SpeciesStateInterface, VarietyStateInterface, FormStateInterface, EvolutionStateInterface } from 'reducers';

//Import from local 'utils' directory
import type { ChainLink, EvolutionDetail } from 'utils/Evolution';
import type { SpeciesInterface } from 'utils/Species';
import type { PokemonInterface } from 'utils/Pokemon';
import type { FormInterface } from 'utils/Forms';
import getLocalisedName from 'utils/Names';
import getVarietyName from 'utils/Forms';
import getVarietySprite from 'utils/Sprites';
import getEvolutionText from 'utils/Evolution';

interface EvolutionProps {
    varieties: VarietyStateInterface,
    species: SpeciesStateInterface,
    forms: FormStateInterface,
    chains: EvolutionStateInterface,
    id: number,
    languageCode: string
}

interface RowWidthItem {
    id: number,
    colSpan: number,
    species?: SpeciesInterface,
    pokemon?: PokemonInterface,
    form?: FormInterface,
    detail: EvolutionDetail[]
}

function EvolutionChain(props: EvolutionProps) {
    const thisChain = props.chains[props.id];
    if (thisChain && thisChain !== "LOADING") {
        const rowWidths: RowWidthItem[][] = [];
        const processLink = (link: ChainLink, depth: number) => {
            const thisURLSplit = link?.species?.url?.split("/");
            const thisID = thisURLSplit[thisURLSplit.length - 2];
            const lowerChainLengths = link?.evolves_to?.map?.(item=>processLink(item,depth+1)) || [1];
            let totalLength = lowerChainLengths.length > 0 ? 0 : 1;
            lowerChainLengths.forEach(item=>{totalLength += item});
            let thisInfo: RowWidthItem = {
                id: parseInt(thisID),
                colSpan: totalLength,
                detail: link.evolution_details
            }
            const thisSpecies = props.species[thisInfo.id];
            if (thisSpecies && thisSpecies !== "LOADING") {
                thisInfo.species = thisSpecies.species;
                const filtered = thisInfo.species?.varieties?.filter(item=>item.is_default).map(item=>item.pokemon.url);
                const thisVariant = props.varieties[filtered[0]];
                if (thisVariant && thisVariant !== "LOADING") {
                    thisInfo.pokemon = thisVariant;
                    const thisForm = props.forms[thisVariant.forms?.[0]?.url];
                    if (thisForm && thisForm !== "LOADING") {
                        thisInfo.form = thisForm;
                    }
                }
            }
            if (rowWidths[depth]) {
                rowWidths[depth].push(thisInfo);
            } else {
                rowWidths[depth] = [thisInfo];
            }
            return totalLength;
        };
        processLink(thisChain.chain,0);
        return <div className="info-overlay__details-group">
            <h3 className="info-overlay__details-group__title">
                Evolution Chain:
            </h3>
            <table className="info-overlay__details-group__table">
                <tbody>
                    {rowWidths.map((item,index)=>{
                        return <tr key={"evolution-row-"+index}>
                            {item.map((cell)=>{
                                return <td className="cell-species-card" colSpan={cell.colSpan} key={"evolution-row-"+index+"-id-"+cell.id}>
                                    <h4 className="species-card__title grey">
                                        {
                                            (cell.species && getLocalisedName(cell.species,props.languageCode))
                                            || cell.id
                                        }
                                    </h4>
                                    {cell.pokemon && <img
                                        src={cell.form ? getVarietySprite(cell.pokemon,cell.form) : getVarietySprite(cell.pokemon)}
                                        alt={"Front facing sprite of "+(getLocalisedName(cell.species,props.languageCode))}
                                    />}
                                    {cell.detail.map((item,index)=>
                                        <div key={"evolution-detail-"+index.toString()}>
                                            {getEvolutionText(item)}
                                        </div>
                                    )}
                                </td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    }
    return null;
}

export default EvolutionChain;
