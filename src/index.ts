import { Argument } from './ClassGenerator/Argument';
import { ClassGenerator } from './ClassGenerator/ClassGenerator';
import type { IConfig } from './IConfig';
import type { IRoute } from './IRoute';
import { MethodModifiers } from './ClassGenerator/MethodModifiers';
import fs from 'node:fs';
import { sync as globSync } from 'glob';
import path from 'node:path';

const readFile = (filePath: string): string => fs.readFileSync(filePath, { encoding: 'utf8' });

const replaceNotWordCharacters = (string: string, replaceValue: string): string =>
    string.replaceAll(/[\W_]/gu, replaceValue);

const capitalize = (string: string): string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

const uncapitalize = (string: string): string => `${string.charAt(0).toLocaleLowerCase()}${string.slice(1)}`;

// eslint-disable-next-line max-statements
const getRouteName = (route: IRoute): string => {
    let pathLike: string = route.path;
    if (route.name !== undefined) {
        pathLike = replaceNotWordCharacters(route.name, '/');
    }
    const pathParts: string[] = pathLike.split('/').filter((pathPart: string) => pathPart !== '');
    const isEmptyPath: boolean = pathParts.length === 0;

    if (isEmptyPath) {
        return 'root';
    }

    let pathPartsWithoutParameter: string[] = pathParts;

    const lastPathPart: string = pathParts[pathParts.length - 1] ?? '';

    if (lastPathPart.startsWith(':')) {
        pathPartsWithoutParameter = pathParts.slice(0, -1);
    }

    return uncapitalize(pathPartsWithoutParameter.map((pathPart: string) => capitalize(pathPart)).join(''));
};

const getRouteArguments = (route: IRoute): Argument[] =>
    route.path
        .split('/')
        .filter((pathPart: string) => pathPart.startsWith(':'))
        .map((pathPart: string) => pathPart.slice(1))
        .map(
            (parameterName: string) =>
                new Argument(parameterName, 'string', parameterName.endsWith('?') ? `''` : undefined),
        );

const getRouteReturnValue = (route: IRoute): string =>
    getRouteArguments(route).reduce(
        (result: string, argument: Argument) =>
            result.replace(`:${argument.name}`, `$\{${argument.name.replace(/\?$/u, '')}}`),
        route.path,
    );

// eslint-disable-next-line max-statements
const generateRouter = (config: Required<IConfig>, routerDeclarationFilePath: string): void => {
    const routerDeclarationFileContent: string = readFile(routerDeclarationFilePath);
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    const routesMatchArray: RegExpMatchArray | null = /new UniversalRouter.*?\(.*?(?<routes>\[.*\]).*?\)/su.exec(
        routerDeclarationFileContent,
    );

    if (routesMatchArray?.groups?.['routes'] === undefined) {
        throw new Error(`UniversalRouter routes declaration in file '${routerDeclarationFilePath}' not found`);
    }

    const { routes: routesString } = routesMatchArray.groups;

    let routes: IRoute[] = [];
    routes = [];
    // eslint-disable-next-line no-eval
    eval(`routes = ${routesString}`);

    const classGenerator: ClassGenerator = new ClassGenerator(config.outputClassName, true, true);

    // eslint-disable-next-line sonarjs/no-empty-collection
    routes.forEach((route: IRoute) => {
        classGenerator.addMethod(
            new MethodModifiers('public', 'static'),
            getRouteName(route),
            'string',
            getRouteArguments(route),
            `return \`${getRouteReturnValue(route)}\`;`,
        );
    });

    const outputDirectoryPath: string = path.dirname(config.outputClassPath);

    if (!fs.existsSync(outputDirectoryPath)) {
        fs.mkdirSync(outputDirectoryPath, { recursive: true });
    }

    const classContent: string = classGenerator.generate();
    fs.writeFileSync(config.outputClassPath, classContent, {});
};

const configFilePath = 'universal-router-typesafe-urls.config.json';

let config: IConfig = {
    baseDir: '',
    outputClassName: 'Router',
    outputClassPath: 'Router.ts',
};

try {
    const readConfig: Partial<IConfig> = JSON.parse(readFile(configFilePath)) as Partial<IConfig>;
    config = { ...config, ...readConfig };
} catch {
    // eslint-disable-next-line no-console
    console.info(`No config file found at path ${configFilePath}`);
}

const isEnabledWatchMode = !process.argv.includes('--no-watch');

const filePaths: string[] = globSync(`./${config.baseDir}/**/*.ts`, { ignore: ['./node_modules/**/*'] });

const routerDeclarationFilePath: string | undefined = filePaths.find((filePath: string) => {
    const fileContent: string = readFile(filePath);
    const universalRouterImportExists: boolean = /import .* from 'universal-router';/u.test(fileContent);

    if (!universalRouterImportExists) {
        return false;
    }

    const universalRouterInitializationExists: boolean = /new UniversalRouter.*\(/u.test(fileContent);

    return universalRouterInitializationExists;
});

if (routerDeclarationFilePath === undefined) {
    throw new Error('File with UniversalRouter routes declaration not found');
}

if (isEnabledWatchMode) {
    fs.watch(routerDeclarationFilePath, () => generateRouter(config, routerDeclarationFilePath));
}

generateRouter(config, routerDeclarationFilePath);
