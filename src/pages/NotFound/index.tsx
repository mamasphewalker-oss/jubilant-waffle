import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section>
      <h1>页面不存在</h1>
      <p>请从导航选择教学模块。</p>
      <Link className="button" to="/">
        返回首页
      </Link>
    </section>
  );
}
