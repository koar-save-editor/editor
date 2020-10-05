import { Compiler } from 'webpack';

export class AddFilePlugin {
  constructor(private readonly options: AddFilePlugin.Options) {}

  apply(compiler: Compiler) {
    const { value, name } = this.options;
    compiler.hooks.emit.tapPromise(
      `${AddFilePlugin.name}:${name}`,
      compilation => {
        compilation.assets[name] = {
          size: () => {
            return typeof value === 'object'
              ? Buffer.byteLength(value)
              : value.length;
          },
          source: () => {
            return typeof value === 'object' ? value : Buffer.from(value);
          },
        };
        return Promise.resolve();
      }
    );
  }
}

export namespace AddFilePlugin {
  export interface Options {
    value: string | Buffer;
    name: string;
  }
}
