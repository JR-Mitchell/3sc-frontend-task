//Import from external 'react' module
import React from 'react';

//Imports from local 'utils'
import type { Biology as BiologyType } from 'utils/Species';

//Imports from local 'components'
import InfoTable from 'components/InfoTable';

interface BiologyProps {
    one: BiologyType,
    two: BiologyType,
    oneVariant: number,
    twoVariant: number
    names: {[id: number]: string}
}

function Biology(props:BiologyProps) {
    let one = props.one;
    let two = props.two;

    let oneData: {[key:string]: string|number} = {
        Genus: one.genus?.genus
    }

    let twoData: {[key:string]: string|number} = {
        Genus: two.genus?.genus
    }

    oneData["Gender Ratio"] = "F: " + one.female_percent.toString()
        + " M: " + one.male_percent.toString()
        + " ?: " + one.genderless_percent.toString();

    twoData["Gender Ratio"] = "F: " + two.female_percent.toString()
        + " M: " + two.male_percent.toString()
        + " ?: " + two.genderless_percent.toString();

    if (one.height && two.height) {
        oneData["Height"] = typeof one.height === "number"
            ? one.height
            : one.height[props.oneVariant];
        twoData["Height"] = typeof two.height === "number"
            ? two.height
            : two.height[props.twoVariant];
    }

    if (one.weight && two.weight) {
        oneData["Weight"] = typeof one.weight === "number"
            ? one.weight
            : one.weight[props.oneVariant];
        twoData["Weight"] = typeof two.weight === "number"
            ? two.weight
            : two.weight[props.twoVariant];
    }

    oneData["Hatch Time"] = one.hatch_time_min.toString() + " - "
        + one.hatch_time_max.toString() + " steps";

    twoData["Hatch Time"] = two.hatch_time_min.toString() + " - "
        + two.hatch_time_max.toString() + " steps";

    let offData: {[key:string]:{[subkey:string]:string|number}} = {};
    offData[props.names[props.oneVariant]] = {...oneData};
    offData[props.names[props.twoVariant]] = {...twoData};

    return <InfoTable title="Biology:" data={{...offData}} />
}

//Default export is React Biology component
export default Biology;
