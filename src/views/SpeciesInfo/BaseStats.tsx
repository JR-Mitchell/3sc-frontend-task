//Import from external 'react' module
import React from 'react';

//Import from local 'components'
import InfoTable from 'components/InfoTable'

function BaseStats(props:{[key:string]: number}) {
    let data: {[key:string]: {[subkey: string]:string|number}} = {
        only: {}
    }
    Object.entries(props).forEach((item)=>{
        data.only[item[0].toUpperCase()] = item[1];
    });
    return <InfoTable title="Base Stats" data={{...data}} />
}

//Default export is React BaseStats component
export default BaseStats;
