//Import from external 'react' module
import React, { Fragment } from 'react';

//Import from external 'react-router-dom' module
import { useHistory, useLocation, Link } from 'react-router-dom';

//Import from external 'react-redux' module
import { useSelector, useDispatch } from 'react-redux';

//Import from local 'actions' directory
import { addSpeciesInfoById, addSpeciesComparisonInfoById, removeSpeciesInfoById } from 'actions/species';

//Import from local 'utils' directory
import getLocalisedName from 'utils/Names';
import getVarietyName from 'utils/Forms';
import getVarietySprite from 'utils/Sprites';

//Import from local 'reducers' directory
import type { SpeciesStateInterface, VarietyStateInterface, FormStateInterface, TotalStateInterface } from 'reducers';

//Relative local imports
import TypeTable from './TypeTable';
import BaseStats from './BaseStats';
import Meta from './Meta';
import Biology from './Biology';
import EvolutionChain from './Evolution';

/**
 * DragBar component - aside element at right hand side of page.
 * Displays a favourites box where species cards
 * may be dragged and dropped for safe keeping
 */
function Info(props: {}) {
    const languageCode: string = useSelector((state: TotalStateInterface) => state.language).currentLanguage;
    const species = useSelector((state: TotalStateInterface) => state.speciesInfo);
    const varieties = useSelector((state: TotalStateInterface) => state.varietiesInfo);
    const forms = useSelector((state: TotalStateInterface) => state.formsInfo);
    const evolutionChains = useSelector((state: TotalStateInterface) => state.evolutionChainInfo);
    const dispatch = useDispatch();
    const pathname = useLocation().pathname;
    const history = useHistory();
    const location = pathname.split("/").splice(0,3).join("/");
    const pathParts = pathname.split("/").splice(4);
    const ids = pathParts.map(item=>item.split("-")[0]);
    let varietyUrls = pathParts.map(item=>item.split("-")[1] && "https://pokeapi.co/api/v2/pokemon/"+item.split("-")[1]+"/");
    //Check that all IDs are present
    let allIdsPresent: boolean = true;
    if (ids.length === 1) {
        if (!species.hasOwnProperty(ids[0])) {
            allIdsPresent = false;
            dispatch<any>(addSpeciesInfoById(ids[0]));
        }
    } else {
        ids.forEach((id,index)=>{
            if (!species.hasOwnProperty(id)) {
                allIdsPresent = false;
                dispatch<any>(addSpeciesComparisonInfoById(id,index+1));
            }
        })
    }
    const relevantSpecies = ids.map(index=>species[index]?.species || "LOADING");
    let allSpeciesLoaded: boolean = !relevantSpecies.some(item=>item==="LOADING");
    //For all the varieties explicitly listed
    const relevantVarieties = varietyUrls.map((url,index)=>{
        if (url && varieties.hasOwnProperty(url)) {
            return varieties[url];
        }
        const thisSpecies = relevantSpecies[index];
        if (thisSpecies !== "LOADING") {
            const filtered = thisSpecies.varieties?.filter(item=>item.is_default).map(item=>item.pokemon?.url) || [];
            if (filtered.length > 0 && varieties.hasOwnProperty(filtered[0])) {
                varietyUrls[index] = filtered[0];
                return varieties[filtered[0]];
            }
            if (varieties.hasOwnProperty(thisSpecies.varieties?.[0]?.pokemon?.url)) {
                return varieties[thisSpecies.varieties?.[0]?.pokemon?.url];
            }
        }
        return "LOADING";
    });
    let allVarietiesLoaded: boolean = !relevantVarieties.some(item=>item==="LOADING");
    const relevantForms = relevantVarieties.map(item=>{
        return item === "LOADING" ? "LOADING" : item.forms?.[0]?.url && forms[item.forms[0].url] || "LOADING";
    });
    const relevantNames = relevantVarieties.map((item,index)=>{
        const form = relevantForms[index];
        if (form === "LOADING") {
            return getVarietyName(item,languageCode);
        }
        return getVarietyName(item,languageCode,form);
    });
    const relevantSprites = relevantVarieties.map((item,index)=>{
        const form = relevantForms[index];
        if (form === "LOADING") {
            return getVarietySprite(item);
        }
        return getVarietySprite(item,form);
    });
    //For all the possible varieties of listed species
    const varietyChoices = relevantSpecies.map(item=>{
        return item !== "LOADING" && item.varieties?.map(item=>item.pokemon) || [];
    });
    const formChoices = varietyChoices.map(item=>{
        return item.map(poke=>varieties[poke?.url]?.forms?.[0]?.url && forms[varieties[poke.url].forms[0].url] || "LOADING");
    });
    const nameChoices = varietyChoices.map((item,index)=>{
        const formList = formChoices[index];
        return item.map((poke,innerIndex)=>{
            if (formList[innerIndex] === "LOADING") {
                return getVarietyName(poke,languageCode);
            }
            return getVarietyName(poke,languageCode,formList[innerIndex]);
        });
    });
    return <div className="info-overlay" role="dialog" aria-modal="true">
        <div className="info-overlay__outer">
            {allIdsPresent
                ? <>
                    <h2 className="info-overlay__title">
                        {relevantSpecies.map((item,index)=>
                            getLocalisedName(item,languageCode)
                            ? <Fragment key={getLocalisedName(item,languageCode)}>
                                {"#"+(item.id?.toString()||"???")+" "+getLocalisedName(item,languageCode)}
                                {varietyChoices[index].length > 1 && <>
                                    {" (Form: "}
                                    <select
                                        onChange={(event)=>{
                                            const valSplit = event.target.value.split("/");
                                            const addPart = valSplit[valSplit.length - 2];
                                            let newPathParts = [location,"info"];
                                            pathParts.forEach((pathPart,pathPartIndex)=>{
                                                if(pathPartIndex===index) {
                                                    const firstPart = pathPart.split("-")[0];
                                                    newPathParts.push(firstPart+"-"+addPart);
                                                } else {
                                                    newPathParts.push(pathPart);
                                                }
                                            });
                                            const newUrl = newPathParts.join("/");
                                            history.push(newUrl);
                                        }}
                                        value={varietyUrls[index]}
                                    >
                                        {varietyChoices[index].map((item,innerIndex)=>
                                            <option key={item.name} value={item.url}>
                                                {nameChoices[index][innerIndex]}
                                            </option>
                                        )}
                                    </select>
                                    )
                                </>}
                                {index < relevantSpecies.length - 1 && " vs "}
                            </Fragment>
                            : "Loading species...")
                        }
                    </h2>
                    {allSpeciesLoaded
                        ? allVarietiesLoaded
                            ? <div className="info-overlay__inner">
                                {ids.length === 1 && <EvolutionChain
                                    id={ids[0]}
                                    species={species}
                                    varieties={varieties}
                                    chains={evolutionChains}
                                    forms={forms}
                                    languageCode={languageCode}
                                />}
                                <TypeTable
                                    varieties={relevantVarieties}
                                    names={relevantNames}
                                    spriteUrls={relevantSprites}
                                />
                                <Biology
                                    species={relevantSpecies}
                                    varieties={relevantVarieties}
                                    names={relevantNames}
                                    languageCode={languageCode}
                                />
                                <Meta
                                    species={relevantSpecies}
                                    varieties={relevantVarieties}
                                    names={relevantNames}
                                />
                                <BaseStats
                                    species={relevantSpecies}
                                    varieties={relevantVarieties}
                                    names={relevantNames}
                                />
                            </div>
                            : <h2 className="info-overlay__title">
                                Loading variants...
                            </h2>
                        : <h2 className="info-overlay__title">
                            Loading species...
                        </h2>
                    }
                </>
                : <h2 className="info-overlay__title">
                    Loading species...
                </h2>
            }
        </div>
        <Link
            className="info-overlay__close-button"
            to={location}
            onClick={()=>{ids.forEach((id,index)=>{
                if (species[id].comparisonIndex === undefined) {
                    dispatch(removeSpeciesInfoById(id));
                }
            });}}
        >
            <div className="info-overlay__close-button__cross first-cross" />
            <div className="info-overlay__close-button__cross second-cross" />
        </Link>
    </div>
}

export default Info;
