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
    const classes = [this.base];

    // Apply regular variants
    for (const key in this.variants) {
      const variantKey = key as keyof V;

      const value = options[variantKey] ?? this.default[variantKey];
      const variantClass = this.variants[variantKey][value as keyof V[keyof V]];

      if (variantClass) {
        classes.push(variantClass);
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
          classes.push(compundClass);
        }
      }
    }

    return cn(this.base, ...classes);
  }
}
