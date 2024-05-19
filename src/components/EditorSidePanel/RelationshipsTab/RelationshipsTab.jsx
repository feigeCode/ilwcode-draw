import { Collapse } from "antd";
import { useSelect, useTables } from "../../../hooks";
import Empty from "../Empty";
import SearchBar from "./SearchBar";
import RelationshipInfo from "./RelationshipInfo";
import { ObjectType } from "../../../data/constants";
import { useTranslation } from "react-i18next";

export default function RelationshipsTab() {
  const { relationships } = useTables();
  const { selectedElement, setSelectedElement } = useSelect();
  const { t } = useTranslation();

  return (
    <>
      <SearchBar />


        {relationships.length <= 0 ? (
          <Empty
            title={t("no_relationships")}
            text={t("no_relationships_text")}
          />
        ) : (
          <Collapse
            activeKey={
              selectedElement.open &&
              selectedElement.element === ObjectType.RELATIONSHIP
                ? `${selectedElement.id}`
                : ""
            }
            onChange={(k) =>
              setSelectedElement((prev) => ({
                ...prev,
                open: true,
                id: parseInt(k),
                element: ObjectType.RELATIONSHIP,
              }))
            }
            accordion
            items={relationships.map((r) => {
              return {
                id: r.id,
                label: <div id={`scroll_ref_${r.id}`} className="overflow-hidden text-ellipsis whitespace-nowrap">{r.name}</div>,
                children: <RelationshipInfo key={r.id} data={r} />
              }
            })}
          />
        )}
    </>
  );
}
