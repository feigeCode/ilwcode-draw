import { useState } from "react";
import { AutoComplete } from "antd";
import { useNotes } from "../../../hooks";
import { useTranslation } from "react-i18next";

export default function SearchBar({ setActiveKey }) {
  const { notes } = useNotes();
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();

  const [filteredResult, setFilteredResult] = useState(
    notes.map((t) => ({
      value: t.title,
      label: t.title
    })),
  );

  const handleStringSearch = (value) => {
    setFilteredResult(
      notes.map((t) => ({
        value: t.title,
        label: t.title
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
        const { id } = notes.find((t) => t.title === v);
        setActiveKey(`${id}`);
        document
          .getElementById(`scroll_note_${id}`)
          .scrollIntoView({ behavior: "smooth" });
      }}
      className="w-full"
    />
  );
}
