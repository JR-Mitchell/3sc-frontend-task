//Import from external 'react' module
import React, { Fragment } from 'react';

//Import from external 'react-redux' module
import { useSelector, useDispatch } from 'react-redux';

//Import from external 'react-router' module
import { useHistory, useLocation, Link as RouteLink } from 'react-router-dom';

//Import from external 'react-scroll' module
import { Link as ScrollLink } from 'react-scroll';

//Import from local 'utils' folder
import getLocalisedName from 'utils/Names';

//Import from local 'actions' folder
import { setGeneration } from 'actions/pokelist';

//Import from local 'reducers' folder
import { SidebarStateInterface, GenerationsStateInterface, PokelistStateInterface, TotalStateInterface } from 'reducers';

function Button(props:React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return <button {...props} />
}

/**
 * MenuBar component - side nav element
 * Contains buttons for each generation of pokemon
 * Each button redirects router to that generation,
 * and provides scroll link elements for generation headers
 */
function MenuBar(props: {}) {
    const dispatch = useDispatch();
    const classNameMod: SidebarStateInterface = useSelector((state: TotalStateInterface) => state.sidebar);
    const generationList: GenerationsStateInterface = useSelector((state: TotalStateInterface) => state.generationList);
    const pokeList: PokelistStateInterface = useSelector((state: TotalStateInterface) => state.pokeList);
    const pathname = useLocation().pathname;
    const location = pathname.split("/").splice(0,3).join("/");
    let history = useHistory();
    if (location !== pokeList.locationHandle) {
        let validGeneration = generationList.filter(item=>"/generation/"+item.name === location);
        if (validGeneration.length > 0) {
            dispatch<any>(setGeneration(validGeneration[0]));
        }
    }
    return <nav className={"menu-bar"+classNameMod}>
        <h3 className={"menu-bar__title"+classNameMod}>
            Pokemon by Generation:
        </h3>
        {generationList.map((item,index)=>{
            return <Fragment key={item.name}>
                <RouteLink
                    to={"/generation/"+item.name}
                    onClick={()=>{dispatch<any>(setGeneration(item));}}
                    className={"menu-bar__category-button"+classNameMod}
                    aria-label={"Show all pokemon in "+item.name}
                >
                    {getLocalisedName(item,"en")}
                </RouteLink>
                {location === "/generation/"+item.name &&
                    <ul role="group" className={"menu-bar__category-contents"+classNameMod}>
                        {pokeList.binnedOrder.map((key)=>{
                            return <li role="menuitem" key={key}>
                                <ScrollLink role="menuitem" key={key}
                                    to={"category-title-"+key}
                                    smooth
                                    spy
                                    onSetActive={()=>{history.replace(pathname+"#category-title-"+key)}}
                                    activeClass={"menu-bar__category-contents__scroll-button active"+classNameMod}
                                    className={"menu-bar__category-contents__scroll-button"+classNameMod}
                                    aria-label={"Scroll to pokemon whose names begin with the letter "+key}
                                >
                                    {key.toUpperCase()}
                                </ScrollLink>
                            </li>
                        })}
                    </ul>
                }
            </Fragment>
        })}
    </nav>
}

export default MenuBar;
