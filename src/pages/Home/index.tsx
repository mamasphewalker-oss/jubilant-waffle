import { Link } from "react-router-dom";
import { ArrowUpRight, Box, Activity, BookOpen } from "lucide-react";
import { CoursePath } from "../../components/curriculum/CoursePath";
const stages = [
  "正常解剖",
  "正常生理",
  "病理生理",
  "疾病",
  "现代医学诊断",
  "检查",
  "循证治疗",
  "药理",
  "病例推理",
  "中西医结合补充教学",
];
export default function Home() {
  return (
    <>
      <section className="home-intro">
        <div>
          <h1>
            从结构到机制，
            <br />
            <span>建立临床思维。</span>
          </h1>
          <p className="lead">现代医学基础下的中西医结合 3D 临床教学平台</p>
          <p>
            以解剖与生理为起点，以可追溯证据连接疾病、诊断和治疗。第一阶段提供交互技术与教学模型原型。
          </p>
          <Link className="button primary" to="/anatomy">
            进入 3D 交互实验室 <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="learning-path">
          <h2>教学路径</h2>
          <ol>
            {stages.map((stage, i) => (
              <li key={stage}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {stage}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="module-list" aria-label="第一阶段模块">
        <Link to="/anatomy">
          <Box />
          <div>
            <h2>3D 交互实验室</h2>
            <p>几何体占位 · 选择、分层与镜头控制</p>
          </div>
          <ArrowUpRight />
        </Link>
        <Link to="/physiology">
          <Activity />
          <div>
            <h2>心血管教学模型</h2>
            <p>观察心率与搏出量如何影响心输出量</p>
          </div>
          <ArrowUpRight />
        </Link>
        <Link to="/cases">
          <BookOpen />
          <div>
            <h2>病例推理框架</h2>
            <p>合成病例引擎的阶段与证据接口</p>
          </div>
          <ArrowUpRight />
        </Link>
      </section>
      <CoursePath />
      <p className="notice">
        教学原型：未接入真实人体模型、患者数据或临床决策服务。中医内容属于标准化补充教学层，需区分传统理论与现代生物医学证据。
      </p>
    </>
  );
}
