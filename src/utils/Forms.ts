//Import from utils
import type { ReferenceInterface as Reference } from './Reference';
import type { PokemonInterface } from './Pokemon';

import getLocalisedName from './Names';

interface Name {
    name: string,
    language: Reference
}

interface FormInterface {
    id: number,
    name: string,
    order: number,
    form_order: number,
    is_default: boolean,
    is_battle_only: boolean,
    is_mega: boolean,
    form_name: string,
    pokemon: Reference,
    sprites: {
        front_default: string,
        front_shiny: string,
        back_default: string,
        back_shiny: string
    },
    version_group: Reference,
    names: Name[],
    form_names: Name[]
}

function getVarietyName(poke: PokemonInterface, localCode: string, form?: FormInterface) {
    let name = getLocalisedName(poke, localCode);
    if (form?.names !== undefined) {
        let filtered = form.names.filter(result=>result.language.name === localCode);
        name = filtered.length > 0 ? filtered[0].name : name;
    }
    return name;
}

export default getVarietyName;

export type { FormInterface };

