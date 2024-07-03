import dts from "bun-plugin-dts";

await Bun.build({
  entrypoints: ["./src/index.ts", "./src/utils.ts"],
  outdir: "./dist",
  minify: true,
  plugins: [dts()],
});
