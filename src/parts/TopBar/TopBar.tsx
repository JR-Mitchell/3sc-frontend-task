//Import from external 'react' module
import React from 'react';

//Import from external 'react-redux' module
import { useSelector, useDispatch } from 'react-redux';

//Import from local 'actions' directory
import { toggleSidebar } from 'actions/sidebar';

//Import from local 'reducers' directory
import type { SidebarStateInterface, TotalStateInterface } from 'reducers';

/**
 * TopBar component - header element at top of pages.
 * Provides a main title for the page,
 * as well as buttons for accessing the two side bars
 */
function TopBar(props: {}) {
    const classNameMod: SidebarStateInterface = useSelector((state: TotalStateInterface) => state.sidebar);
    const dispatch = useDispatch();
    return <header className={"top-bar"+classNameMod}>
        <button
            className={"top-bar__menu-button"+classNameMod}
            title="Open main menu"
            aria-label="Main menu"
            onClick={()=>{dispatch(toggleSidebar("menu-bar"));}}
        >
            <div className={"top-bar__menu-button__inner"+classNameMod} />
            <div className={"top-bar__menu-button__inner"+classNameMod} />
            <div className={"top-bar__menu-button__inner"+classNameMod} />
        </button>
        <h1 className={"top-bar__title"+classNameMod}>
            PokeAPI Web UI
        </h1>
        <button
            className={"top-bar__menu-button"+classNameMod}
            title="Open side bar"
            aria-label="Favourites and comparison side bar"
            onClick={()=>{dispatch(toggleSidebar("drag-bar"));}}
        >
            <div className={"top-bar__dragbar-button__top"+classNameMod} />
            <div className={"top-bar__dragbar-button__bottom"+classNameMod} />
            <div className={"top-bar__dragbar-button__middle"+classNameMod} />
        </button>
    </header>
}

export default TopBar;
