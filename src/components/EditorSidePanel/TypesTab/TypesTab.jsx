import { Collapse, Button, Popover } from "antd";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { useSelect, useTypes } from "../../../hooks";
import { ObjectType } from "../../../data/constants";
import Searchbar from "./SearchBar";
import Empty from "../Empty";
import TypeInfo from "./TypeInfo";
import { useTranslation } from "react-i18next";

export default function TypesTab() {
  const { types, addType } = useTypes();
  const { selectedElement, setSelectedElement } = useSelect();
  const { t } = useTranslation();

  return (
    <>
      <div className="flex gap-2">
        <Searchbar />
        <div>
          <Button icon={<PlusOutlined />} block onClick={() => addType()}>
            {t("add_type")}
          </Button>
        </div>
        <Popover
          content={
            <div className="w-[240px] text-sm space-y-2 popover-theme">
              {t("types_info")
                .split("\n")
                .map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
            </div>
          }
          showArrow
          position="rightTop"
        >
          <Button theme="borderless" icon={<InfoCircleOutlined />} />
        </Popover>
      </div>
      {types.length <= 0 ? (
        <Empty title={t("no_types")} text={t("no_types_text")} />
      ) : (
        <Collapse
          activeKey={
            selectedElement.open && selectedElement.element === ObjectType.TYPE
              ? `${selectedElement.id}`
              : ""
          }
          onChange={(id) =>
            setSelectedElement((prev) => ({
              ...prev,
              open: true,
              id: parseInt(id),
              element: ObjectType.TYPE,
            }))
          }
          accordion
          items={types.map((t, i) => {
            return {
              id: i,
              label: <div id={`scroll_type_${index}`} className="overflow-hidden text-ellipsis whitespace-nowrap">{t.name}</div>,
              children: <TypeInfo data={t} key={i} index={i} />,
            }
          })}
        >
        </Collapse>
      )}
    </>
  );
}
