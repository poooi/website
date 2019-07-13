import { first, split } from 'lodash'

export const getPurelanguage = (language: string) => first(split(language, '-'))
