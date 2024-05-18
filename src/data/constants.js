import i18n from "../i18n/i18n";

export const sqlDataTypes = [
  "INT",
  "SMALLINT",
  "BIGINT",
  "DECIMAL",
  "NUMERIC",
  "FLOAT",
  "DOUBLE",
  "REAL",
  "CHAR",
  "VARCHAR",
  "TEXT",
  "DATE",
  "TIME",
  "TIMESTAMP",
  "DATETIME",
  "BOOLEAN",
  "BINARY",
  "VARBINARY",
  "BLOB",
  "JSON",
  "UUID",
  "ENUM",
  "SET",
];

export const tableThemes = [
  "#f03c3c",
  "#ff4f81",
  "#bc49c4",
  "#a751e8",
  "#7c4af0",
  "#6360f7",
  "#7d9dff",
  "#32c9b0",
  "#3cde7d",
  "#89e667",
  "#ffe159",
  "#ff9159",
];

export const noteThemes = [
  "#ffdfd9",
  "#fcf7ac",
  "#cffcb1",
  "#c7d2ff",
  "#e7c7ff",
];

export const defaultBlue = "#175e7a";
export const defaultNoteTheme = "#fcf7ac";
export const tableHeaderHeight = 50;
export const tableWidth = 200;
export const tableFieldHeight = 36;
export const tableColorStripHeight = 7;

export const Cardinality = {
  ONE_TO_ONE: i18n.t("one_to_one"),
  ONE_TO_MANY: i18n.t("one_to_many"),
  MANY_TO_ONE: i18n.t("many_to_one"),
};

export const Constraint = {
  NONE: "No action",
  RESTRICT: "Restrict",
  CASCADE: "Cascade",
  SET_NULL: "Set null",
  SET_DEFAULT: "Set default",
};

export const Tab = {
  TABLES: "1",
  RELATIONSHIPS: "2",
  AREAS: "3",
  NOTES: "4",
  TYPES: "5",
};

export const ObjectType = {
  NONE: 0,
  TABLE: 1,
  AREA: 2,
  NOTE: 3,
  RELATIONSHIP: 4,
  TYPE: 5,
};

export const Action = {
  ADD: 0,
  MOVE: 1,
  DELETE: 2,
  EDIT: 3,
  PAN: 4,
};

export const State = {
  NONE: 0,
  SAVING: 1,
  SAVED: 2,
  LOADING: 3,
  ERROR: 4,
};

export const MODAL = {
  NONE: 0,
  IMG: 1,
  CODE: 2,
  IMPORT: 3,
  RENAME: 4,
  OPEN: 5,
  SAVEAS: 6,
  NEW: 7,
  IMPORT_SRC: 8,
  TABLE_WIDTH: 9,
  LANGUAGE: 10,
};

export const STATUS = {
  NONE: 0,
  WARNING: 1,
  ERROR: 2,
  OK: 3,
};

export const SIDESHEET = {
  NONE: 0,
  TODO: 1,
  TIMELINE: 2,
};


export const DATA_TYPE_LIST = [
  {label: '整数', value: 'INTEGER'},
  {label: '长整数', value: 'LONG'},
  {label: '小数', value: 'DECIMAL'},
  {label: '文本', value: 'TEXT'},
  {label: '多行文本', value: 'MULTI_TEXT'},
  {label: '富文本', value: 'RICH_TEXT'},
  {label: '图片', value: 'IMAGE'},
  {label: '文件', value: 'FILE'},
  {label: '日期', value: 'DATE'},
  {label: '时间', value: 'TIME'},
  {label: '日期时间', value: 'DATETIME'},
  {label: '布尔', value: 'BOOLEAN'},
  {label: '枚举', value: 'ENUM'},
  {label: '实体', value: 'ENTITY'}
]