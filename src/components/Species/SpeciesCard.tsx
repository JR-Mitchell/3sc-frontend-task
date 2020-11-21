//Import from external 'react' module
import React from 'react';

//Import from external 'react-redux' module
import { useSelector, useDispatch } from 'react-redux';

//Import from external 'react-router-dom' module
import { useLocation, Link } from 'react-router-dom';

//Imports from local 'utils'
import type { SpeciesInterface } from 'utils/Species';
import getLocalisedName from 'utils/Names';

//Imports from local 'actions'
import { addSpeciesInfo } from 'actions/species';

//Imports from local 'reducers'
import type { SidebarStateInterface, TotalStateInterface } from 'reducers';

/**
 * Props for the SpeciesCard component
 * More information about the individual props are shown in
 * comments below
 */
interface SpeciesCardProps {
    /** The species being represented */
    species: SpeciesInterface,
    /** Whether to show the 'info' button */
    showInfoButton?: boolean,
    /** Whether to grow to the full extent of the container */
    flexGrow?: boolean,
    /** Callback to call with OnDragEnd event */
    dragEndCallback?: (event: React.DragEvent<HTMLDivElement>)=>void
}

/**
 * SpeciesCard component - single card representing a species of pokemon.
 * May be dragged to the dragbar, and contains a button to show more info.
 */
function SpeciesCard(props: SpeciesCardProps) {
    const classNameMod: SidebarStateInterface = useSelector((state: TotalStateInterface) => state.sidebar);
    const languageCode: string = useSelector((state: TotalStateInterface) => state.language).currentLanguage;
    const dispatch = useDispatch();
    const location = useLocation().pathname.split("/").splice(0,3).join("/");
    return <div
        className={"species-card"+classNameMod+(props.flexGrow ? " grow" : "")}
        draggable
        onDragStart={(event)=>{
            event.dataTransfer.setData(
                "application/json",
                JSON.stringify(props.species)
            );
        }}
        onDragEnd={(event)=>{
            props.dragEndCallback && props.dragEndCallback(event);
        }}
    >
        <h4 className={"species-card__title"+classNameMod}>
            {"#"+props.species.id.toString()+" "+getLocalisedName(props.species,languageCode)}
        </h4>
        <div>
            <img
                src={"https://raw.githubusercontent.com/PokeAPI/sprites/"
                + "master/sprites/pokemon/versions/generation-viii/"
                + "icons/" + props.species.id.toString()+".png"}
                alt={"Icon of "+props.species.name}
                className={"species-card__sprite"+classNameMod}
                draggable={false}
            />
            {props.showInfoButton && <Link
                className={"species-card__info-button"+classNameMod}
                to={location+"/info/"+props.species.id.toString()}
                onClick={()=>{dispatch(addSpeciesInfo(props.species));}}
            >
                Info
            </Link>}
        </div>
    </div>
}

export default SpeciesCard;
