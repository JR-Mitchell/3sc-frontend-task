import type { SpeciesInterface } from './Species';
import type { PokemonInterface } from './Pokemon';
import type { GenerationInterface } from './Generation';

/**
 * Utility function: takes a species or pokemon, returns its localised name
 */
function getLocalisedName(item: SpeciesInterface | PokemonInterface | GenerationInterface, localCode: string) {
    let newItem = item as SpeciesInterface;
    let name = newItem?.name || "";
    name = name.charAt(0).toUpperCase() + name.substr(1);
    if (newItem?.names !== undefined) {
        let filtered = newItem.names.filter(result=>result.language.name === localCode);
        name = filtered.length > 0 ? filtered[0].name : name;
    }
    return name;
}

export default getLocalisedName;
