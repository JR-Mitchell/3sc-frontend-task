//Imports from external library 'react'
import React from 'react';

//Imports from external library 'axios'
import axios from 'axios';

//Imports from local 'utils'
import type { SpeciesInterface } from 'utils/Species';
import type { ReferenceInterface } from 'utils/Reference';

//Imports from local 'views'
import Info from 'views/SpeciesInfo';

/**
 * Interface for the props of the Species component
 */
interface SpeciesProps {
    /**
     * Reference to the species
     */
    reference: ReferenceInterface
    /**
     * Callback to call with OnDragStart event
     */
    dragCallback?: ()=>void
    /**
     * Callback to call with OnDragEnd event
     */
    dragEndCallback?: (event: React.DragEvent<HTMLDivElement>)=>void
    /**
     * Whether to show optional grab helper icon
     */
    showGrab?: boolean
    /**
     * Whether to show info button
     */
    showInfoButton?: boolean
    /**
     * Whether to grow to the full extent of the container
     */
    flexGrow?: boolean
}

/**
 * Interface for the state of the Species component
 */
interface SpeciesState {
    /**
     * Species info
     */
    species?: SpeciesInterface
    /**
     * URL to sprite
     */
    spriteUrl?: string
    /**
     * The info element to display about this species
     */
    info?: React.ReactNode
    /**
     * Whether to show a grab icon on the card
     */
    grab: boolean
}

/**
 * An element representing the information for one particular Species
 * Displays name, base experience, height, weight and a sprite
 *
 * @param {SpeciesInterface} props: the pokemon data to display
 */
class Species extends React.Component<SpeciesProps,SpeciesState> {
    /**
     * React constructor method
     */
    constructor(props) {
        super(props);
        this.state = {grab:false};
        //Get species info
        axios.get<SpeciesInterface>(
            props.reference.url
        ).then((response)=>{
            this.setState((state,props)=>({
                species: response.data,
                spriteUrl: "https://raw.githubusercontent.com/PokeAPI/"
                    + "sprites/master/sprites/pokemon/"
                    + "versions/generation-viii/icons/"
                    + response.data.id.toString() + ".png"
            }));
        });
    }

    /**
     * React render method
     */
    render() {
        let species = {...this.state.species};
        let sprAddress = this.state.spriteUrl;
        let info = this.state.info;
        const grab = this.props.showGrab && this.state.grab;

        //Make name proper case
        let name: string = species?.name || this.props.reference.name;
        name = name.charAt(0).toUpperCase() + name.substr(1);

        //Find localised name if possible
        let locname: string | undefined = species?.names
            ?.filter((item)=>
                item.language.name === "en"
            )?.[0]?.name;

        name = locname || name;

        //Add pokedex number
        let num: number | undefined = species?.pokedex_numbers
            ?.filter((item)=>
                item.pokedex.name === "national"
            )?.[0]?.entry_number;

        name = num ? "#" + num.toString() + " " + name: name;

        //Work out classname
        let classNameList: string[] = ["speciesCard"];
        grab && classNameList.push("grab");
        this.props.flexGrow && classNameList.push("grow");
        const className = classNameList.join(" ");

        return <div
            className={className}
            draggable
            onDragStart={(event)=>{
                event.dataTransfer.setData(
                    "application/json",
                    JSON.stringify(this.props.reference)
                );
                this.props.dragCallback
                    && this.props.dragCallback();
            }}
            onDragEnd={(event)=>{
                this.props.dragEndCallback
                    && this.props.dragEndCallback(event);
            }}
            onMouseEnter={()=>{
                this.setState({grab:true});
            }}
            onMouseLeave={()=>{
                this.setState({grab:false});
            }}
        >
            <div className={
                grab
                    ? "speciesGrabIconContainer grab"
                    : "speciesGrabIconContainer"
            }>
                <h4 className="speciesTitle">
                    {name}
                </h4>
                <div className="speciesGrabIcon">
                {grab && <img
                    src={"https://github.com/google/material-design-icons/"
                        + "blob/master/png/action/open_with/materialicons/"
                        + "24dp/1x/baseline_open_with_black_24dp.png?raw=true"}
                    className="speciesGrabIcon"
                    draggable={false}
                    />
                }
                </div>
            </div>
            <div>
            {sprAddress
                ? <img
                    src={sprAddress}
                    alt={"Icon of "+name}
                    className="spritePlaceholder"
                    draggable={false}
                />
                : <div className="spritePlaceholder" />}
            {this.props.showInfoButton && <button
                className="speciesMoreButton"
                onClick={()=>{
                    this.infoOpen();
                }}
                aria-label={"Show more info on "+name}
            >
                Info
            </button>
            }
            </div>
            {info}
        </div>
    }

    /**
     * Callback when info is opened
     */
    infoOpen() {
        let species = {...this.state.species};
        if (species) {
            this.setState({
                info:<Info
                    species={species}
                    closeCallback={()=>{this.infoClose();}}
                />
            });
        } else {
            axios.get<SpeciesInterface>(
                this.props.reference.url
            ).then((response)=>{
                this.setState((state,props)=>({
                    info:<Info
                        species={response.data}
                        closeCallback={()=>{this.infoClose();}}
                    />,
                    species: response.data,
                    spriteUrl: "https://raw.githubusercontent.com/PokeAPI/"
                        + "sprites/master/sprites/pokemon/"
                        + "versions/generation-viii/icons/"
                        + response.data.id.toString() + ".png"
                }));
            });
        }
    }

    /**
     * Callback when info is closed
     */
    infoClose() {
        this.setState({
            info:undefined
        });
    }
}

//Default export is Species React component
export default Species;
