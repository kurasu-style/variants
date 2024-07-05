// TODO: Add a way to pull types from the variants

export * as utils from "./utils";

import { cn } from "./utils";

type VariantsMap = {
  [key: string]: { [key: string]: string };
};

type DefaultMap<V extends VariantsMap> = {
  [K in keyof V]: keyof V[K];
};

type VariantOptions<V extends VariantsMap> = {
  [K in keyof V]?: keyof V[K];
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
