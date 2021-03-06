//Import from external 'react' module
import React from 'react';

interface InfoTableProps {
    title: string,
    data:{[key: string]: {[subkey:string]: number|string}},
    compareNumbers?: boolean
}

/**
 * An element displaying information about one or more species/variants
 */
function InfoTable(props:InfoTableProps) {
    let variantNames = Object.keys(props.data);
    let firstVariant = variantNames[0]
    if (firstVariant) {
        return <div className="info-overlay__details-group">
            <h3 className="info-overlay__details-group__title">{props.title}</h3>
            <table className="info-overlay__details-group__table">
                <thead>
                    {variantNames.length > 1 && <tr>
                            <th className="info-overlay__details-group__table-cell">Category</th>
                            {variantNames.map((name)=>{
                                return <th className="info-overlay__details-group__table-cell" key={name}>
                                    {name}
                                </th>
                            })}
                    </tr>
                    }
                </thead>
                <tbody>
                    {Object.keys(props.data[firstVariant]).map((key)=>{
                        let bonusClasses = variantNames.map(()=>"");
                        let keyData = variantNames.map((name)=>props.data[name][key]);
                        if (keyData.length > 1
                            && props.compareNumbers
                            && keyData.every((val)=>typeof val === "number")
                        ){
                            let maxVal = keyData[0];
                            keyData.forEach((val)=>{maxVal = maxVal>val ? maxVal : val;});
                            let goodClassName = keyData.filter(val=>val === maxVal).length > 1
                                ? " yellow"
                                : " green"
                            bonusClasses = keyData.map((val)=>val === maxVal ? goodClassName : " red");
                        }
                        return <tr key={key}>
                            <th className="info-overlay__details-group__table-cell">{key+":"}</th>
                            {variantNames.map((name,index)=>{
                                return <td className={"info-overlay__details-group__table-cell"+bonusClasses[index]} key={name}>
                                    {props.data[name][key]}
                                </td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    }
    return null;
}

//Default export is React InfoTable component
export default InfoTable;
