# Kurasu (クラス) - Core

## Introduction

**Kurasu Core** is a simple and powerful library tailored for managing class-based variants in your **JavaScript** or **TypeScript** projects. It allows you to define and manipulate **CSS** class names dynamically based on various conditions, making it easier to handle styling variations in a clean and maintainable way.

### Key Features

- 🛠️ **Class Variants Management**: Define variants for different styling properties and dynamically generate class name based on previously provided classes.
- 🔧 **Default Variants**: Set default values for your variants to ensure consistent styling across your components
- 🎨 **Compound Variants**: Create compound variants that combine multiple variant conditions to apply specific class names.
- 🧹 **Clean Output**: Ensures that duplicate class names are removed, providing clean and efficient class strings.
- 🏷️ **Class Handling**: Includes `clsx`-like utility for handling class strings effortlessly.
- 🧩 **Type Safety**: Built with TypeScript to ensure type safety and reduce errors.
- ⚡ **Lightweight**: Minimal footprint, ensuring your project stays lean and fast.

## Getting started

### Installation

To use **Kurasu Core** in your project, you can install it as a dependency with **npm**, **yarn**, **pnpm** or **bun**:

```
bun add -D @kurasu/core
```

Note: Use a runtime of your choice

### Example Usage

`example.tsx`

```js
import { Variants, type VariantsType  } from "@kurasu/core";

const variants = new Variants({
  base: 'base-class',
  variants: {
    size: {
      small: 'small-size',
      large: 'large-size'
    },
    color: {
      light: 'light-color',
      dark: 'dark-color'
    }
  },
  default: {
    size: 'small',
    color: 'light'
  },
  compoundVariants: {
    ({ size, color }) => {
      if (size === 'large' && color === 'dark') {
        return 'large-dark-class'
      }

      return ''
    }
  }
})

type Size = keyof VariantType<typeof variants.getVariants>['size']
type Color = keyof VariantType<typeof variants.getVariants>['color']

// In this example a JSX component
export const Example = (
  { size, color }: { size: Size, color: Color }
) => {
  return (
    <div className={variants.forgeClasses({ size, color })} />
  )
}
```

`main.ts`

```js
import { Example } from "./example";

const Main = () => {
  return <Example size="large" color="dark" />;
};

// Class output of Example: "large-size dark-color large-dark-class"
```

### API

### Variants Class

```js
new Variants(config: {
  base: string;
  variants: VariantsMap;
  default: DefaultMap<VariantsMap>;
  compoundVariants?: CompoundVariant<VariantsMap>[];
})
```

- `base`: a base class string that will always be included.
- `variants`: an object defining the different variant options.
- `default`: an object defining the default values for the variants.
- `compoundVariants (optional)`: an array of functions that return class names based on specific variant conditions.

#### VariantsMap

Defines the structure of the variants object.

```ts
type VariantsMap = {
  [key: string]: { [key: string]: string };
};
```

#### DefaultMap

Maps each variant key to one of its possible values, setting default values for the variants.

```ts
type DefaultMap<V extends VariantsMap> = {
  [K in keyof V]: keyof V[K];
};
```

#### VariantOptions

Defines the optional variant values passed to the forgeClasses method.

```ts
type VariantOptions<V extends VariantsMap> = {
  [K in keyof V]?: keyof V[K];
};
```

#### VariantsType

Extracts the type of the variants object returned by the getVariants method in the Variants class.

```ts
export type VariantsType<T> = T extends () => infer R ? R : never;
```

#### CompoundVariant

A function type that takes variant options and returns a class name string or undefined.

```ts
type CompoundVariant<V extends VariantsMap> = (options: {
  [K in keyof V]: keyof V[K];
}) => string | undefined;
```

### Methods

#### forgeClasses

Generates the class string based on the provided variant options, removing any duplicate class names.

```ts
forgeClasses(options?: VariantOptions<VariantsMap>): string
```

### Utility Functions

#### cn

A utility function to concatenate class names, ensuring duplicates are removed.

```ts
export declare function cn(...inputs: ClassValue[]): string;
```

## Acknowledgements

**Kurasu Core** is heavily inspired by libraries such as [Stitches](https://github.com/stitchesjs/stitches), [Tailwind-Variants](https://github.com/joe-bell/cva) and [CVA](<[Tailwind-Variants](https://github.com/joe-bell/cva)>).

Main difference between this library and above is that **Kurasu Core** is created in OOP and supports custom functions as `compoundVariants`.

In the future I plan on adding more features that would expand the experience as well as creating functional API for people that don't really like OOP.

## License

Kurasu Core is licensed under the MIT License.
