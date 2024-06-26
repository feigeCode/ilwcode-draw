import { Input } from "antd";
import { useTranslation } from "react-i18next";

export default function Rename({ title, setTitle }) {
  const { t } = useTranslation();

  return (
    <Input
      placeholder={t("name")}
      value={title}
      onChange={(v) => setTitle(v)}
    />
  );
}
