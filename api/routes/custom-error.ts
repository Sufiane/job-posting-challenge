export class ValidationError extends Error {
    private readonly type = 'Validation'

    constructor(message: string) {
        super(message);
    }
}
