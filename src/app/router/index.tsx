import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
export const routes = [
  ["/", "首页"],
  ["/anatomy", "3D 人体"],
  ["/physiology", "生理学"],
  ["/pathology-pharmacology", "病理与药理"],
  ["/diagnosis", "中西医诊断"],
  ["/treatment", "治疗：西药与方剂"],
  ["/cases", "患者病例"],
] as const;
export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("../../pages/Home")).default,
        }),
      },
      {
        path: "anatomy",
        lazy: async () => ({
          Component: (await import("../../pages/Anatomy3D")).default,
        }),
      },
      {
        path: "physiology",
        lazy: async () => ({
          Component: (await import("../../pages/Physiology")).default,
        }),
      },
      ...["pathology-pharmacology", "diagnosis", "treatment", "cases"].map(
        (path) => ({
          path,
          lazy: async () => ({
            Component: (await import("../../pages/TeachingSkeleton")).default,
          }),
        }),
      ),
      {
        path: "*",
        lazy: async () => ({
          Component: (await import("../../pages/NotFound")).default,
        }),
      },
    ],
  },
]);
