export class MissingRootPathError extends Error {
    constructor(rootPath: string) {
        super(`Missing root path: ${rootPath}`)
        this.name = 'MissingRootPathError'
    }
}