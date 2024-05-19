import { useState } from "react";
import { useSelect, useTables } from "../../../hooks";
import { AutoComplete } from "antd";
import { ObjectType } from "../../../data/constants";
import { useTranslation } from "react-i18next";

export default function SearchBar() {
  const { relationships } = useTables();
  const [searchText, setSearchText] = useState("");
  const { setSelectedElement } = useSelect();
  const { t } = useTranslation();

  const [filteredResult, setFilteredResult] = useState(
    relationships.map((t) => ({
      value: t.name,
      label: t.name
    })),
  );

  const handleStringSearch = (value) => {
    setFilteredResult(
      relationships.map((t) =>  ({
        value: t.name,
        label: t.name
      })).filter((i) => i.value.includes(value)),
    );
  };
  return (
    <AutoComplete
      options={filteredResult}
      value={searchText}
      allowClear
      placeholder={t("search")}
      onSearch={(v) => handleStringSearch(v)}
      onChange={(v) => setSearchText(v)}
      onSelect={(v) => {
        const { id } = relationships.find((t) => t.name === v);
        setSelectedElement((prev) => ({
          ...prev,
          id: id,
          open: true,
          element: ObjectType.RELATIONSHIP,
        }));
        document
          .getElementById(`scroll_ref_${id}`)
          .scrollIntoView({ behavior: "smooth" });
      }}
      className="w-full"
    />
  );
}
