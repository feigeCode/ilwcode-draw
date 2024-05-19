
import { Empty as AntEmpty } from "antd";

export default function Empty({ title, text }) {
  return (
    <div className="select-none mt-2">
      <AntEmpty
        description={<div>
          <div>{title}</div>
          <div>{text}</div>
        </div>}
      />
    </div>
  );
}
