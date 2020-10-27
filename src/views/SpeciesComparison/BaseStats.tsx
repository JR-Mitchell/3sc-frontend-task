//Import from external 'react' module
import React from 'react';

//Import from local 'components'
import InfoTable from 'components/InfoTable'

interface BaseStatsProps {
    one: {[key: string]: number},
    two: {[key: string]: number},
    oneName: string,
    twoName: string
}

function BaseStats(props:BaseStatsProps) {
    let data: {[key:string]:{[subkey:string]:string|number}} = {};
    data[props.oneName] = {};
    data[props.twoName] ={};
    Object.entries(props.one).forEach((item)=>{
        data[props.oneName][item[0].toUpperCase()] = item[1];
    });
    Object.entries(props.two).forEach((item)=>{
        data[props.twoName][item[0].toUpperCase()] = item[1];
    });

    return <InfoTable compareNumbers title="Base Stats" data={{...data}} />
}

//Default export is React BaseStats component
export default BaseStats;
