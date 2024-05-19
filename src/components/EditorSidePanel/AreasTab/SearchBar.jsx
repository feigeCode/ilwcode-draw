import { useState } from "react";
import { useAreas } from "../../../hooks";
import { AutoComplete } from "antd";
import { useTranslation } from "react-i18next";

export default function SearchBar() {
  const { areas } = useAreas();
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();

  const [filteredResult, setFilteredResult] = useState(
    areas.map((t) => ({
      value: t.name,
      label: t.name
    })),
  );

  const handleStringSearch = (value) => {
    setFilteredResult(
      areas.map((t) => ({
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
        const { id } = areas.find((t) => t.name === v);
        document
          .getElementById(`scroll_area_${id}`)
          .scrollIntoView({ behavior: "smooth" });
      }}
      className="w-full"
    />
  );
}
