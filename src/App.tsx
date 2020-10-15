//Import from external 'react' module
import React from 'react';

//Import from external 'axios' module
import axios from 'axios';

//Imports from local 'utils'
import type { ReferenceInterface } from 'utils/Reference';
import type { SpeciesInterface } from 'utils/Species';

//Imports from local 'views'
import PokeList from 'views/PokeList';
import SpeciesComparison from 'views/SpeciesComparison';

//Imports from local 'parts'
import TopBar from 'parts/TopBar';
import MenuBar from 'parts/MenuBar';
import DragBar from 'parts/DragBar';

//Import stylesheet
import 'style.css';

/**
 * Interface for the state of the App component
 */
interface AppState {
    /**
     * The title of the body's main section
     */
    bodyTitle?: string
    /**
     * An object of alphabetised reference lists to pokemon species
     * for the selected generation
     */
    species: {[key:string]:ReferenceInterface[]}
    /**
     * A list of references to pokemon species that have been
     * favourited
     */
    favourites: ReferenceInterface[]
    /**
     * Array containing pokemon to compare
     */
    compare: (ReferenceInterface | undefined)[]
    /**
     *
     */
    compareSpecies: (SpeciesInterface | undefined)[]
    /**
     * Whether to show the current comparison screen
     */
    isCompareOpen: boolean
    /**
     * Array of CSS classnames to apply to structural parts
     * in order for sidebars to function as intended
     */
    posClasses: string[]
    /**
     * Names of sections to scroll link to
     */
    scrollSections: string[]
}

/**
 * The App component is rendered into the root div
 * It contains the header,
 * along with a simple visualisation for the selected pokemon
 */
class App extends React.Component<{},AppState> {
    /**
     * React constructor method
     */
    constructor(props) {
        super(props);
        this.state = {
            species:{},
            favourites:[],
            compare:[undefined,undefined],
            compareSpecies:[undefined,undefined],
            isCompareOpen: false,
            posClasses: ["left"],
            scrollSections: []
        };
        //Preload moving icon
        let img = new Image();
        img.src = "https://github.com/google/material-design-icons/"
            + "blob/master/png/action/open_with/materialicons/24dp/"
            + "1x/baseline_open_with_black_24dp.png?raw=true";
    }

    /**
     * React render method
     */
    render() {
        //Making copies of state variables
        let species: {[key:string]:ReferenceInterface[]} = {};
        Object.entries(this.state.species).forEach((item)=>{
            species[item[0]] = item[1].slice();
        });
        let favourites = this.state.favourites.slice();
        let compare = this.state.compare.slice();
        let compareSpecies = this.state.compareSpecies.slice();
        const isCompareOpen = this.state.isCompareOpen;
        let bodyPos = " " + this.state.posClasses.join(" ")
        let scrollSections = this.state.scrollSections.slice();
        const bodyTitle = this.state.bodyTitle;

        return <>
            <MenuBar
                pos={bodyPos}
                generationCallback={
                    (species:ReferenceInterface[],title?:string)=>{
                        this.selectGeneration(species,title);
                    }
                }
                scrollSections={scrollSections}
            />
            <div className={"mainBody"+bodyPos}>
                <TopBar
                    menuCallback={()=>{
                        this.toggleLeft();
                    }}
                    favouritesCallback={()=>{
                        this.toggleRight();
                    }}
                    pos={bodyPos}
                />
                <PokeList
                    title={bodyTitle}
                    species={species}
                    dragCallback={()=>{
                        this.tempEnableRight();
                    }}
                    dragEndCallback={()=>{
                        this.tempDisableRight();
                    }}
                />
            </div>
            <DragBar
                pos={bodyPos}
                dropCallback={(event,index?:number)=>{
                    if (index===0 || index===1) {
                        this.addCompare(event,index);
                    } else {
                        this.addFavourite(event);
                    }
                }}
                dragEndCallback={(index)=>{this.removeFavourite(index);}}
                contents={favourites}
                compare={compare}
                compareCallback={()=>{this.openCompare();}}
            />
            {isCompareOpen && <SpeciesComparison
                speciesOne={compareSpecies[0]}
                speciesTwo={compareSpecies[1]}
                closeCallback={()=>{this.closeCompare();}}
            />
            }
        </>
    }

    /**
     * Callback to select a particular generation of pokemon
     *
     * @param {ReferenceInterface[]} species: an array of species
     *      of pokemon in the given generation
     *
     * @param {string, Optional} title: the title of the generation
     */
    selectGeneration(species:ReferenceInterface[],title?: string) {
        // Alphabetically deal with species
        let alphabetisedSpecies: {[key: string]:ReferenceInterface[]} = {};
        let validCharacters: string[] = [];
        for (let i=0; i<species.length; i++) {
            let item = species[i];
            let firstChar = item.name.charAt(0);
            if (alphabetisedSpecies.hasOwnProperty(firstChar)) {
                alphabetisedSpecies[firstChar].push(item);
            } else {
                alphabetisedSpecies[firstChar] = [item];
                validCharacters.push(firstChar);
            }
        }

        //Sort valid characters
        validCharacters.sort();

        this.setState({
            species:alphabetisedSpecies,
            scrollSections:validCharacters,
            bodyTitle: title
        });
    }

    /**
     * Callback to call upon adding a pokemon to the favourites list
     */
    addFavourite(event: React.DragEvent<HTMLDivElement>) {
        const currFaves = this.state.favourites.slice();
        let rawData = JSON.parse(
            event.dataTransfer.getData("application/json")
        );
        let rawKeys = Object.keys(rawData);
        if (rawKeys.length === 2
            && rawKeys.includes("name")
            && rawKeys.includes("url")
            && !currFaves.map(item=>item.url).includes(rawData.url)
        ) {
            this.setState({
                favourites: currFaves.concat([rawData])
            });
        }
    }

    /**
     * Callback to call upon adding a pokemon to the comparison list
     */
    addCompare(event: React.DragEvent<HTMLDivElement>,index:(0|1)) {
        let rawData = JSON.parse(
            event.dataTransfer.getData("application/json")
        );
        let rawKeys = Object.keys(rawData);
        if (rawKeys.length === 2
            && rawKeys.includes("name")
            && rawKeys.includes("url")
        ) {
            this.setState((state,props)=>{
                let compare = state.compare.slice();
                compare[index] = rawData;
                let compareSpecies = state.compareSpecies.slice();
                compareSpecies[index] = undefined;
                return {compare: compare,compareSpecies:compareSpecies};
            })
            axios.get<SpeciesInterface>(rawData.url).then((response)=>{
                this.setState((state,props)=>{
                    let compareSpecies = state.compareSpecies.slice();
                    compareSpecies[index] = response.data;
                    return {compareSpecies: compareSpecies};
                });
            })
        }
    }

    /**
     * Callback to call when a compare dialogue is opened
     */
    openCompare() {
        const currCompare = this.state.compareSpecies.slice();
        if (currCompare[0] !== undefined && currCompare[1] !== undefined) {
            this.setState({
                isCompareOpen: true
            });
        }
    }

    /**
     * Callback to call when a compare dialogue is closed
     */
    closeCompare() {
        this.setState({
            isCompareOpen: false
        });
    }

    /**
     * Callback to call upon removing a pokemon from the favourites list
     */
    removeFavourite(index: number) {
        const currFaves = this.state.favourites.slice();
        currFaves.splice(index,1);
        this.setState({
            favourites: currFaves
        });
    }

    /**
     * Toggle the left-hand sidebar
     */
    toggleLeft() {
        let posClasses = this.state.posClasses.slice();
        let indexOf = posClasses.indexOf("left");
        if (indexOf === -1) {
            posClasses.push("left");
        } else {
            posClasses.splice(indexOf,1);
        }
        this.setState({posClasses:posClasses});
    }

    /**
     * Toggle the right-hand sidebar
     */
    toggleRight() {
        let posClasses = this.state.posClasses.slice();
        let indexOf = posClasses.indexOf("right");
        if (indexOf === -1) {
            posClasses.push("right");
        } else {
            posClasses.splice(indexOf,1);
        }
        this.setState({posClasses:posClasses});
    }

    /**
     * If the right-hand sidebar is not open, temporarily open it
     */
    tempEnableRight() {
        let posClasses = this.state.posClasses.slice();
        let indexOf = posClasses.indexOf("right");
        if (indexOf === -1) {
            this.setState({
                posClasses:posClasses.concat(["right","tmpRight"])
            });
        }
    }

    /**
     * If the right-hand sidebar is temporarily open, close it
     */
    tempDisableRight() {
        let posClasses = this.state.posClasses.slice();
        let indexOf = posClasses.indexOf("right");
        if (indexOf !== -1) {
            posClasses.splice(indexOf,1);
            indexOf = posClasses.indexOf("tmpRight");
            if (indexOf !== -1) {
                posClasses.splice(indexOf,1);
                this.setState({posClasses:posClasses});
            }
        }
    }
}

//Default export is App React component
export default App;
