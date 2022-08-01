export interface IRoute {
    readonly name?: string;
    readonly path: string;
    readonly children?: IRoute[];
}
