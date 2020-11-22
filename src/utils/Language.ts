//Imports from local relative directory
import type { ReferenceInterface as Reference } from './Reference'

interface Name {
    name: string,
    language: Reference
}

/**
 * Interface for a /language API endpoint
 */
interface LanguageInterface {
    id: number,
    name: string,
    official: boolean,
    iso639: string,
    iso3166: string,
    names: Name[]
}

export type { LanguageInterface };
