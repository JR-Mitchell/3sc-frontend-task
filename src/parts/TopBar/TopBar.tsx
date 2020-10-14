//Import from external 'react' module
import React from 'react';

//Import from external 'axios' module
import axios from 'axios';

//Imports from local 'utils'
import type { GenerationInterface } from 'utils/Generation';
import type { ReferenceInterface } from 'utils/Reference';

/**
 * Interface for props of the TopBar component
 */
interface TopBarProps {
    /**
     * Callback for menu button
     */
    menuCallback: () => void
}

/**
 * TopBar component at top of page
 * Contains page title and menu bar button
 */
function TopBar(props:TopBarProps) {
    return <div className="topBarDiv">
        <h1>
            <button
                className="topBarMenuIcon"
                onClick={()=>{props.menuCallback();}}
            >
                <div className="topBarMenuIconInner" />
                <div className="topBarMenuIconInner" />
                <div className="topBarMenuIconInner" />
            </button>
            PokeAPI Web UI
        </h1>
    </div>
}

//Default export is TopBar component
export default TopBar;
