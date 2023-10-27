import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  entries: [
    // @ts-ignore
    { format: "cjs", input: "src/", ext: "cjs" },
    { format: "esm", input: "src/" },
  ],
  outDir: "dist",
});
