import first from 'lodash/first'
import split from 'lodash/split'

export const getPurelanguage = (language: string) => first(split(language, '-'))
