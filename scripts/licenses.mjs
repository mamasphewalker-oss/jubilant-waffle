import fs from "node:fs/promises";
import path from "node:path";
const root = path.resolve("node_modules/.pnpm");
const entries = await fs.readdir(root);
const packages = new Map();
for (const entry of entries) {
  if (entry === "node_modules" || entry.startsWith(".")) continue;
  const dir = path.join(root, entry, "node_modules");
  for (const name of await fs.readdir(dir).catch(() => [])) {
    const dirs = name.startsWith("@")
      ? (await fs.readdir(path.join(dir, name))).map((n) =>
          path.join(dir, name, n),
        )
      : [path.join(dir, name)];
    for (const p of dirs) {
      try {
        const pkg = JSON.parse(
          await fs.readFile(path.join(p, "package.json"), "utf8"),
        );
        let license = pkg.license ?? "UNKNOWN";
        let basis = "package.json";
        if (
          pkg.name === "webgl-constants" &&
          pkg.version === "1.1.1" &&
          license === "UNKNOWN"
        ) {
          const text = await fs.readFile(path.join(p, "LICENSE"), "utf8");
          if (
            text.startsWith("MIT License") &&
            text.includes("Copyright (c) 2019 Tim van Scherpenzeel")
          ) {
            license = "MIT";
            basis = "bundled LICENSE manually reviewed";
          }
        }
        packages.set(pkg.name + "@" + pkg.version, {
          name: pkg.name,
          version: pkg.version,
          license,
          basis,
        });
      } catch {}
    }
  }
}
const result = [...packages.values()].sort((a, b) =>
  a.name.localeCompare(b.name),
);
const forbidden = result.filter((p) =>
  /AGPL|(^|[^L])GPL|UNKNOWN/.test(
    typeof p.license === "string" ? p.license : JSON.stringify(p.license),
  ),
);
console.log(`Audited ${result.length} installed package manifests.`);
console.log(JSON.stringify(result, null, 2));
if (forbidden.length) {
  console.error("License review required:", forbidden);
  process.exitCode = 1;
}
