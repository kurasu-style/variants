import { cn } from "./utils";

export { cn, type ClassValue } from "./utils";

export type VariantsType<T> = T extends () => infer R ? R : never;

type VariantsMap = {
  [key: string]: { [key: string]: string };
};

type VariantOptions<V extends VariantsMap> = {
  [K in keyof V]?: keyof V[K];
};

type DefaultMap<V extends VariantsMap> = {
  [K in keyof V]: keyof V[K];
};

type CompoundVariant<V extends VariantsMap> = (options: {
  [K in keyof V]: keyof V[K];
}) => string | undefined;

export class Variants<V extends VariantsMap, D extends DefaultMap<V>> {
  base: string;
  variants: V;
  default: D;
  compoundVariants?: CompoundVariant<V>[];

  constructor(config: {
    base: string;
    variants: V;
    default: D;
    compoundVariants?: CompoundVariant<V>[];
  }) {
    this.base = config.base;
    this.variants = config.variants;
    this.default = config.default;
    this.compoundVariants = config.compoundVariants || [];
  }

  getBase(): string {
    return this.base;
  }

  getVariants(): V {
    return this.variants;
  }

  getVariant<K extends keyof V>(key: K): V[K] {
    return this.variants[key];
  }

  getDefault(): D {
    return this.default;
  }

  forgeClasses(options: VariantOptions<V> = {}): string {
    const classes = new Set<string>();

    classes.add(this.base);

    // Apply regular variants
    for (const key in this.variants) {
      const variantKey = key as keyof V;

      const value = options[variantKey] ?? this.default[variantKey];
      const variantClass = this.variants[variantKey][value as keyof V[keyof V]];

      if (variantClass) {
        classes.add(variantClass);
      }
    }

    // Apply compound variants
    if (this.compoundVariants) {
      for (const compoundVariant of this.compoundVariants) {
        const compundClass = compoundVariant({
          ...this.default,
          ...options,
        } as { [K in keyof V]: keyof V[K] });

        if (compundClass) {
          compundClass.split(" ").forEach((c) => {
            classes.add(c.trim());
          });
        }
      }
    }

    return cn(...Array.from(classes));
  }
}
