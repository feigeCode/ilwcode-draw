import { useState } from "react";
import { AutoComplete } from "antd";
import { useSelect, useTypes } from "../../../hooks";
import { ObjectType } from "../../../data/constants";
import { useTranslation } from "react-i18next";

export default function Searchbar() {
  const { types } = useTypes();
  const [value, setValue] = useState("");
  const { setSelectedElement } = useSelect();
  const { t } = useTranslation();

  const [filteredResult, setFilteredResult] = useState(
    types.map((t) => ({
      value: t.name,
      label: t.name
    })),

  );

  const handleStringSearch = (value) => {
    setFilteredResult(
      types.map((t) => ({
        value: t.name,
        label: t.name
      })).filter((i) => i.includes(value)),
    );
  };
  return (
    <AutoComplete
      options={filteredResult}
      value={value}
      allowClear
      placeholder={t("search")}
      onSearch={(v) => handleStringSearch(v)}
      onChange={(v) => setValue(v)}
      onSelect={(v) => {
        const i = types.findIndex((t) => t.name === v);
        setSelectedElement((prev) => ({
          ...prev,
          id: i,
          open: true,
          element: ObjectType.TYPE,
        }));
        document
          .getElementById(`scroll_type_${i}`)
          .scrollIntoView({ behavior: "smooth" });
      }}
      className="w-full"
    />
  );
}
