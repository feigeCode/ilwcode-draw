import { useState } from "react";
import { Action, ObjectType } from "../../../data/constants";
import {
  Collapse,
  Row,
  Col,
  Input,
  Button,
  Card,
} from "antd";
import { useUndoRedo, useTypes } from "../../../hooks";
import TypeField from "./TypeField";
import { useTranslation } from "react-i18next";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

export default function TypeInfo({ index, data }) {
  const { deleteType, updateType } = useTypes();
  const { setUndoStack, setRedoStack } = useUndoRedo();
  const [editField, setEditField] = useState({});
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center mb-2.5">
        <div className="text-md font-semibold break-keep">{t("name")}: </div>
        <Input
          value={data.name}
          placeholder={t("name")}
          className="ms-2"
          onChange={(value) => updateType(index, { name: value })}
          onFocus={(e) => setEditField({ name: e.target.value })}
          onBlur={(e) => {
            if (e.target.value === editField.name) return;
            setUndoStack((prev) => [
              ...prev,
              {
                action: Action.EDIT,
                element: ObjectType.TYPE,
                component: "self",
                tid: index,
                undo: editField,
                redo: { name: e.target.value },
                message: t("edit_type", {
                  typeName: data.name,
                  extra: "[name]",
                }),
              },
            ]);
            setRedoStack([]);
          }}
        />
      </div>
      {data.fields.map((f, j) => (
        <TypeField key={j} data={f} fid={j} tid={index} />
      ))}
      <Card
        styles={{body: { padding: "4px" }}}
        style={{ marginTop: "12px", marginBottom: "12px" }}
      >
        <Collapse items={[{
          id: '1',
          label: t("comment"),
          children: <Input.TextArea
            field="comment"
            value={data.comment}
            autosize
            placeholder={t("comment")}
            rows={1}
            onChange={(value) =>
              updateType(index, { comment: value }, false)
            }
            onFocus={(e) => setEditField({ comment: e.target.value })}
            onBlur={(e) => {
              if (e.target.value === editField.comment) return;
              setUndoStack((prev) => [
                ...prev,
                {
                  action: Action.EDIT,
                  element: ObjectType.TYPE,
                  component: "self",
                  tid: index,
                  undo: editField,
                  redo: { comment: e.target.value },
                  message: t("edit_type", {
                    typeName: data.name,
                    extra: "[comment]",
                  }),
                },
              ]);
              setRedoStack([]);
            }}
          />
        }]}>
        </Collapse>
      </Card>
      <Row gutter={6} className="mt-2">
        <Col span={12}>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setUndoStack((prev) => [
                ...prev,
                {
                  action: Action.EDIT,
                  element: ObjectType.TYPE,
                  component: "field_add",
                  tid: index,
                  message: t("edit_type", {
                    typeName: data.name,
                    extra: "[add field]",
                  }),
                },
              ]);
              setRedoStack([]);
              updateType(index, {
                fields: [
                  ...data.fields,
                  {
                    name: "",
                    type: "",
                  },
                ],
              });
            }}
            block
          >
            {t("add_field")}
          </Button>
        </Col>
        <Col span={12}>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => deleteType(index)}
            block
          >
            {t("delete")}
          </Button>
        </Col>
      </Row>
    </div>
  );
}
