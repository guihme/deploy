export class Result<T = any> {
    public isSuccess: boolean;
    public isFailure: boolean;
    public error: Error;
    private _value: T | undefined;

    protected constructor(value?: T, error?: Error) {
        this.isSuccess = error? false : true;
        this.isFailure = !this.isSuccess;
        this.error = error || new Error("Unknown error");
        this._value = value;

    }

    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(value);
    }

    public errorValue(): string {
        return this.error.message;
    }

    public static fail(error: Error): Result {

        return new Result(undefined, error as Error);
    }

    public getValue(): T {
        if (!this.isSuccess) {
            throw new Error(
                "Can't get the value of an error result. Use 'errorValue' instead."
            );
        }
        return this._value;
    }

}