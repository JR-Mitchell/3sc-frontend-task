import type { PokemonInterface } from './Pokemon';
import type { FormInterface } from './Forms';

/**
 * Simple interface for sprites collection
 */
interface SpritesInterface {
    back_default: string | null,
    back_female: string | null,
    back_shiny: string | null,
    back_shiny_female: string | null,
    front_default: string | null,
    front_female: string | null,
    front_shiny: string | null,
    front_shiny_female: string | null,
}

function getVarietySprite(poke: PokemonInterface, form?: FormInterface) {
    return form?.sprites?.front_default || poke?.sprites?.front_default || undefined;
}

export default getVarietySprite;

export type { SpritesInterface };
