export class ApiError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ApiError'
    }
}

export class MissingRootPathError extends ApiError {
    constructor(rootPath: string) {
        super(`Faltou a raiz do caminho: ${rootPath}.`)
        this.name = 'MissingRootPathError'
    }
}

export class InvalidFormatError extends ApiError {
    constructor() {
        super('Precisa ser um array de objetos com os campos entryId e path.')
        this.name = 'InvalidFormatError'
    }
}