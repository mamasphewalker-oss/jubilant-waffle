import { describe, expect, it } from "vitest";
import {
  flattenCatalog,
  searchCatalog,
  type CatalogNode,
} from "../../src/app/catalog";
import { resolveAssetUrl } from "../../src/app/assets";
describe("learning catalog", () => {
  it("searches both languages and aliases without inventing available content", () => {
    expect(searchCatalog("  cCs  ", "/")[0].id).toBe("ccs");
    expect(
      searchCatalog("冠状动脉", "/").some((n) => n.id === "coronary"),
    ).toBe(true);
    expect(searchCatalog("LAD", "/")[0].path).toBeUndefined();
    expect(searchCatalog("unknown xyz", "/")).toEqual([]);
    expect(searchCatalog("", "/diagnosis")[0].id).toBe("diagnosis");
  });
  it("traverses arbitrarily nested chapters without a fixed depth", () => {
    let node: CatalogNode = {
      id: "leaf",
      zh: "末级",
      en: "Leaf",
      kind: "anatomy",
      status: "pending",
    };
    for (let i = 0; i < 10; i++)
      node = { ...node, id: `chapter-${i}`, children: [node] };
    expect(flattenCatalog([node])).toHaveLength(11);
    expect(flattenCatalog([node]).at(-1)?.id).toBe("leaf");
  });
});
describe("static deployment asset URLs", () => {
  it("resolves root and GitHub project bases", () => {
    expect(resolveAssetUrl("models/heart.glb", "/")).toBe("/models/heart.glb");
    expect(resolveAssetUrl("models/heart.glb", "/jubilant-waffle/")).toBe(
      "/jubilant-waffle/models/heart.glb",
    );
  });
  it.each([
    "",
    "/models/a.glb",
    "../a.glb",
    "https://example.org/a",
    "C:\\model.glb",
    "models/%2e%2e/a",
    "a//b",
  ])("rejects nonlocal or ambiguous path %s", (path) => {
    expect(() => resolveAssetUrl(path)).toThrow();
  });
});
