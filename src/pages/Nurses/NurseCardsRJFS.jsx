import React, { useState } from "react";
import { withTheme } from "@rjsf/core";
import { Theme as MuiTheme } from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";

const Form = withTheme(MuiTheme);
const defaultJsonSchema = {
  title: "Thông tin thẻ ",
  type: "object",
  properties: {
    _id: { type: "string" },
    card_id: {
      type: "string",
      description: "ID duy nhất của thẻ (có thể là QR code hoặc mã NFC).",
    },
    hashed_student_id: {
      type: "string",
      nullable: true,
      description:
        "băm ID sinh viên của nurse, liên kết với collection nurses.",
    },
    user_id: {
      type: "string",
      nullable: true,
      description: "ID người dùng elderly, liên kết với collection elderlies.",
    },
    status: {
      type: "string",
      enum: ["active", "inactive", "revoked", "lost"],
      default: "active",
      description:
        "Trạng thái của thẻ: active (hoạt động), inactive (không hoạt động), revoked (bị thu hồi), lost (bị mất).",
    },
    issued_by: {
      type: "string",
      default: "Green Card Company",
      description: "Thực thể cấp phát thẻ (mặc định là công ty thẻ xanh).",
    },
    issued_at: {
      type: "string",
      format: "date-time",
      description: "Thời điểm cấp phát thẻ.",
    },
    expired_at: {
      type: "string",
      format: "date-time",
      nullable: true,
      description: "Ngày hết hạn thẻ (tùy chọn).",
    },
    last_used_at: {
      type: "string",
      format: "date-time",
      nullable: true,
      description: "Lần cuối sử dụng QR hoặc NFC thẻ.",
    },
    public_key: {
      type: "string",
      description: "Khóa công khai để xác thực chữ ký số.",
    },
    private_key_encrypted: {
      type: "string",
      description: "Khóa riêng tư được mã hóa để bảo mật.",
    },
    qr_code_data: {
      type: "string",
      description:
        "Hình ảnh QR code được mã hóa dưới dạng Base64 (ví dụ: data:image/png;base64,iVBORw0KG...).",
      pattern: "^data:image\\/([a-zA-Z+\\-\\.]+);base64,[a-zA-Z0-9+/=]+$",
    },
    signature: {
      type: "string",
      description:
        "Chữ ký số được tạo từ hashed_student_id + card_id + user_id.",
    },
  },
  required: [
    "_id",
    "card_id",
    "status",
    "issued_by",
    "issued_at",
    "public_key",
    "private_key_encrypted",
    "qr_code_data",
    "signature",
  ],
  additionalProperties: false,
};
const defaultUiSchema = {
  card_id: {
    "ui:placeholder": "Nhập ID thẻ",
  },
  status: {
    "ui:widget": "select",
  },
  issued_at: {
    "ui:widget": "alt-datetime",
  },
  expired_at: {
    "ui:widget": "alt-datetime",
  },
  last_used_at: {
    "ui:widget": "alt-datetime",
  },
  qr_code_data: {
    "ui:widget": "textarea",
  },
  private_key_encrypted: {
    "ui:widget": "password",
  },
};

const NurseInfoRJFS = () => {
  const [jsonSchemaStr, setJsonSchemaStr] = useState(
    JSON.stringify(defaultJsonSchema, null, 2)
  );
  const [uiSchemaStr, setUiSchemaStr] = useState(
    JSON.stringify(defaultUiSchema, null, 2)
  );

  const [schema, setSchema] = useState(defaultJsonSchema);
  const [uiSchema, setUiSchema] = useState(defaultUiSchema);
  const [formData, setFormData] = useState({});

  const handleApplySchemas = () => {
    try {
      const parsedJsonSchema = JSON.parse(jsonSchemaStr);
      const parsedUiSchema = JSON.parse(uiSchemaStr);
      setSchema(parsedJsonSchema);
      setUiSchema(parsedUiSchema);
    } catch (e) {
      alert("Lỗi khi parse JSON. Vui lòng kiểm tra lại schema.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>CardData RJSF Form Preview</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <h3>📦 JSON Schema</h3>
          <textarea
            rows={30}
            style={{ width: "100%" }}
            value={jsonSchemaStr}
            onChange={(e) => setJsonSchemaStr(e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h3>🎨 UI Schema</h3>
          <textarea
            rows={30}
            style={{ width: "100%" }}
            value={uiSchemaStr}
            onChange={(e) => setUiSchemaStr(e.target.value)}
          />
        </div>
      </div>
      <button style={{ marginTop: "10px" }} onClick={handleApplySchemas}>
        ✅ Áp dụng schema
      </button>

      <div style={{ marginTop: "30px" }}>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          validator={validator}
          onChange={({ formData }) => setFormData(formData)}
          onSubmit={({ formData }) =>
            console.log("Form submitted with data:", formData)
          }
        />
      </div>
    </div>
  );
};

export default NurseInfoRJFS;
