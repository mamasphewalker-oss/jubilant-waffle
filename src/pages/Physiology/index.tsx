import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  defaults,
  simulate,
  type CardiovascularParameters,
} from "../../simulations/cardiovascular/model";
const controls = [
  ["heartRate", "心率 HR", "次/分", 30, 180],
  ["strokeVolume", "搏出量 SV", "mL/次", 20, 140],
  ["systemicVascularResistance", "体循环阻力 SVR", "mmHg·min/L", 5, 35],
] as const;
export default function Physiology() {
  const [parameters, setParameters] =
    useState<CardiovascularParameters>(defaults);
  const result = simulate(parameters);
  const data = Array.from({ length: 16 }, (_, i) => ({
    hr: 30 + i * 10,
    co: ((30 + i * 10) * parameters.strokeVolume) / 1000,
  }));
  return (
    <>
      <div className="page-heading">
        <h1>心血管教学模型</h1>
        <p>探索参数之间的关系，理解公式的边界。</p>
      </div>
      <p className="notice gold">
        这是教学模型，不是患者计算器，也不是临床决策工具。所有数值均为教学假设，不提供个体化剂量。
      </p>
      <div className="simulation-layout">
        <section className="panel">
          <h2>教学参数</h2>
          {controls.map(([key, label, unit, min, max]) => (
            <label className="simulation-control" key={key}>
              {label}
              <output>
                {parameters[key]} {unit}
              </output>
              <input
                aria-label={label}
                type="range"
                min={min}
                max={max}
                value={parameters[key]}
                onChange={(e) =>
                  setParameters((p) => ({
                    ...p,
                    [key]: Number(e.target.value),
                  }))
                }
              />
            </label>
          ))}
          <button className="button" onClick={() => setParameters(defaults)}>
            恢复教学参数
          </button>
        </section>
        <section className="panel">
          <h2>派生指标</h2>
          <div className="metric" aria-live="polite">
            <span>心输出量 CO</span>
            <strong data-testid="cardiac-output">
              {result.cardiacOutput.toFixed(2)} <small>L/min</small>
            </strong>
          </div>
          <p className="formula">CO = HR × SV ÷ 1000</p>
          <p>简化压力梯度：{result.pressureGradient.toFixed(1)} mmHg</p>
          <p className="muted">
            ΔP = CO ×
            SVR。忽略中心静脉压、反馈调节与个体差异；不等同于患者血压预测。
          </p>
        </section>
      </div>
      <section className="panel chart-panel">
        <h2>固定搏出量时，心输出量随心率线性变化</h2>
        <p>
          横轴：心率（次/分） · 纵轴：心输出量（L/min）。示意关系，无患者数据。
        </p>
        <div style={{ height: 280 }} aria-label="心率与心输出量线性关系图">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 25, left: 5, bottom: 10 }}
              accessibilityLayer
            >
              <CartesianGrid stroke="#244253" strokeDasharray="3 3" />
              <XAxis dataKey="hr" stroke="#aac2d5" />
              <YAxis stroke="#aac2d5" />
              <Tooltip
                contentStyle={{
                  background: "#0b2538",
                  border: "1px solid #315366",
                }}
              />
              <Line
                type="linear"
                dataKey="co"
                name="CO (L/min)"
                stroke="#18B7A0"
                strokeWidth={3}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <details>
          <summary>图表数据（可访问表格）</summary>
          <table>
            <thead>
              <tr>
                <th>HR（次/分）</th>
                <th>CO（L/min）</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.hr}>
                  <td>{d.hr}</td>
                  <td>{d.co.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
        <p className="muted">
          来源：教学公式与假设，详见项目 simulation-assumptions
          文档。参数范围仅限定演示空间，不代表参考区间。
        </p>
      </section>
    </>
  );
}
