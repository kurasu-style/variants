import { cn } from "./utils";

type VariantsMap = {
  [key: string]: { [key: string]: string };
};

type DefaultMap<V extends VariantsMap> = {
  [K in keyof V]: keyof V[K];
};

export interface VariantsInterface {
  base: string;
  variants: VariantsMap;
  default: DefaultMap<VariantsMap>;
}

export class Variants<V extends VariantsMap, D extends DefaultMap<V>> {
  base: string;
  variants: V;
  default: D;

  constructor(config: { base: string; variants: V; default: D }) {
    this.base = config.base;
    this.variants = config.variants;
    this.default = config.default;
  }

  getVariantClasses(variant: string, value: string) {
    if (!this.variants || !this.variants[variant]) {
      return "";
    }

    return this.variants[variant][value];
  }

  forgeClasses(options: Partial<{ [K in keyof V]: keyof V[K] }>): string {
    const classes = [this.base];

    for (const key in this.variants) {
      const variantKey = key as keyof V;

      const value = options[variantKey] ?? this.default[variantKey];
      const variantClass = this.variants[variantKey][value as keyof V[keyof V]];

      if (variantClass) {
        classes.push(variantClass);
      }
    }

    return cn(this.base, ...classes);
  }
}
