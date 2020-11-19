//Import from external 'react' module
import React from 'react';

//Import from external 'react-redux' module
import { useSelector, useDispatch } from 'react-redux';

//Import from external 'react-router-dom' module
import { useLocation, Link } from 'react-router-dom';

//Import from local 'actions' directory
import { addFavourite, removeFavourite } from 'actions/favourites';
import { addSpeciesComparisonInfo, removeSpeciesInfoById } from 'actions/species';

//Import from local 'reducers' directory
import type { FavouritesStateInterface, SpeciesStateInterface, SidebarStateInterface, TotalStateInterface } from 'reducers';
import type { SpeciesInfo } from 'reducers/species';

//Import from local 'components' directory
import SpeciesCard from 'components/Species';

/**
 * DragBar component - aside element at right hand side of page.
 * Displays a favourites box where species cards
 * may be dragged and dropped for safe keeping
 */
function DragBar(props: {}) {
    const dispatch = useDispatch();
    const favourites: FavouritesStateInterface = useSelector((state: TotalStateInterface) => state.favourites);
    const species: SpeciesStateInterface = useSelector((state: TotalStateInterface) => state.speciesInfo);
    const comparisonSpecies: SpeciesStateInterface = {};
    for (const id in species) {
        const speciesInstance = species[id] as SpeciesInfo;
        if (speciesInstance.hasOwnProperty("comparisonIndex")) {
            comparisonSpecies[speciesInstance.comparisonIndex] = speciesInstance;
        }
    }
    const speciesOne = comparisonSpecies[1] as SpeciesInfo;
    const speciesTwo = comparisonSpecies[2] as SpeciesInfo;
    const classNameMod: SidebarStateInterface = useSelector((state: TotalStateInterface) => state.sidebar);
    const location = useLocation().pathname.split("/").splice(0,3).join("/");
    return <aside className={"drag-bar"+classNameMod} role="complementary">
        <div className={"drag-bar__favourites-div"+classNameMod}>
            <h3 className={"drag-bar__title"+classNameMod}>
                Favourites
            </h3>
            <h4 className={"drag-bar__title"+classNameMod}>
                Drag a Pokemon card to the area below
                to add it to your favourites
            </h4>
            <div
                className={"drag-bar__favourites-div__drop-box"+classNameMod}
                onDragOver={(event)=>{event.preventDefault();}}
                onDrop={(event)=>{
                    dispatch(
                        addFavourite(
                            JSON.parse(
                                event.dataTransfer.getData("application/json")
                            )
                        )
                    );
                }}
            >
                {favourites.map((item,index)=>{
                    return <SpeciesCard
                        species={item}
                        key={item.name}
                        showInfoButton
                        dragEndCallback={(event)=>{
                            event.dataTransfer.dropEffect==="none"
                                && dispatch(removeFavourite(index))
                        }}
                    />
                })}
            </div>
        </div>
        <div className={"drag-bar__compare-div"+classNameMod}>
            <h3 className={"drag-bar__title"+classNameMod}>
                Compare Pokemon
            </h3>
            <div className={"drag-bar__compare-div__inner"+classNameMod}>
                <div
                    className={"drag-bar__compare-div__drop-box"+classNameMod}
                    onDragOver={(event)=>{event.preventDefault();}}
                    onDrop={(event)=>{
                        speciesOne && dispatch(
                            removeSpeciesInfoById(speciesOne.species.id)
                        );
                        dispatch(
                            addSpeciesComparisonInfo(
                                JSON.parse(
                                    event.dataTransfer.getData("application/json")
                                ),
                                1
                            )
                        );
                    }}
                >
                    {speciesOne && <SpeciesCard
                        species={speciesOne.species}
                        flexGrow
                    />}
                </div>
                VS
                <div
                    className={"drag-bar__compare-div__drop-box"+classNameMod}
                    onDragOver={(event)=>{event.preventDefault();}}
                    onDrop={(event)=>{
                        speciesTwo && dispatch(
                            removeSpeciesInfoById(speciesTwo.species.id)
                        );
                        dispatch(
                            addSpeciesComparisonInfo(
                                JSON.parse(
                                    event.dataTransfer.getData("application/json")
                                ),
                                2
                            )
                        );
                    }}
                >
                    {speciesTwo && <SpeciesCard
                        species={speciesTwo.species}
                        flexGrow
                    />}
                </div>
            </div>
            {speciesOne && speciesTwo &&
                <Link
                    className={"drag-bar__compare-div__compare-button"+classNameMod}
                    to={location+"/info/"
                        +speciesOne.species.id.toString()+"/"
                        +speciesTwo.species.id.toString()}
                    aria-label="Compare these pokemon"
                >
                    Compare!
                </Link>
            }
        </div>
    </aside>
}

export default DragBar;
