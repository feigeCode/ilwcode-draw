import { useMemo, useState } from "react";
import { useSelect } from "../../../hooks";
import { AutoComplete } from "antd";
import { ObjectType } from "../../../data/constants";
import { useTranslation } from "react-i18next";

export default function SearchBar({ tables }) {
  const { setSelectedElement } = useSelect();
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();
  const filteredTable = useMemo(
    () => tables.map((t) => ({
      value: t.name,
      label: t.name
    })).filter((i) => i.value.includes(searchText)),
    [tables, searchText],
  );

  return (
    <AutoComplete
      options={filteredTable}
      value={searchText}
      allowClear
      placeholder={t("search")}
      onChange={(v) => setSearchText(v)}
      onSelect={(v) => {
        const { id } = tables.find((t) => t.name === v);
        setSelectedElement((prev) => ({
          ...prev,
          id: id,
          open: true,
          element: ObjectType.TABLE,
        }));
        document
          .getElementById(`scroll_table_${id}`)
          .scrollIntoView({ behavior: "smooth" });
      }}
      className="w-full"
    />
  );
}
