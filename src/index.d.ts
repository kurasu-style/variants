export type VariantsType<T> = T extends () => infer R ? R : never;
export type VariantKey<T, K extends keyof T> = keyof T[K];

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
  });

  forgeClasses(options?: VariantOptions<V>): string;
}
