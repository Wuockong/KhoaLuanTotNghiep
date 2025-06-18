import React, { useState } from "react";
import { withTheme } from "@rjsf/core";
// import { Theme as Bootstrap4Theme } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { Theme as MuiTheme } from "@rjsf/mui";
const Form = withTheme(MuiTheme);
// const Form = withTheme(Bootstrap4Theme);

const defaultJsonSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Elderly",
  description:
    "Schema for the elderlies collection, containing detailed information about elderly users.",
  type: "object",
  properties: {
    _id: {
      type: "string",
      description: "ID duy nhất của tài liệu do MongoDB tạo.",
    },
    user_id: {
      type: "string",
      description: "UUID duy nhất được tạo tự động để xác định người dùng.",
    },
    email: {
      type: "string",
      format: "email",
      description: "Email của người cao tuổi, dùng để xác minh tài khoản.",
    },
    email_verified: {
      type: "boolean",
      default: false,
      description:
        "Trạng thái xác minh email. Phải là true để hoàn tất đăng ký.",
    },
    hashed_password: {
      type: "string",
      nullable: true,
      description: "Băm mật khẩu của người cao tuổi bằng thuật toán bcrypt.",
    },

    full_name: {
      type: "string",
      nullable: true,
      description: "Họ và tên đầy đủ của người cao tuổi.",
    },
    gender: {
      type: "boolean",
      nullable: true,
      description:
        "Giới tính của người cao tuổi (true = male, false = female).",
    },
    date_of_birth: {
      type: "string",
      format: "date",
      nullable: true,
      description: "Ngày sinh của người cao tuổi (định dạng YYYY-MM-DD).",
    },
    permanent_address: {
      type: "object",
      nullable: true,
      description: "Địa chỉ hộ khẩu thường trú.",
      properties: {
        street: { type: "string", nullable: true },
        city: { type: "string", nullable: true },
        country: { type: "string", nullable: true },
      },
    },
    current_address: {
      type: "object",
      nullable: true,
      description: "Địa chỉ hiện tại đang sinh sống.",
      properties: {
        street: { type: "string", nullable: true },
        city: { type: "string", nullable: true },
        country: { type: "string", nullable: true },
      },
    },
    insurance_number: {
      type: "string",
      nullable: true,
      description: "Mã số bảo hiểm xã hội/y tế.",
    },
    phone_number: {
      type: "string",
      nullable: true,
      description: "Số điện thoại liên hệ.",
    },
    avatar_url: {
      type: "string",
      nullable: true,
      description: "URL của ảnh đại diện đã băm.",
    },
    updated_at: {
      type: "string",
      format: "date-time",
      nullable: true,
      description: "Ngày cập nhật hồ sơ gần nhất (ISO 8601).",
    },
  },
  required: ["_id", "user_id", "email", "email_verified"],
  additionalProperties: false,
};
const defaultUiSchema = {
  gender: {
    "ui:widget": "radio",
    "ui:options": {
      labels: { true: "Nam", false: "Nữ" },
    },
  },
  date_of_birth: {
    "ui:widget": "alt-date",
  },
  updated_at: {
    "ui:widget": "alt-datetime",
  },
  email: {
    "ui:placeholder": "example@email.com",
  },
  hashed_password: {
    "ui:widget": "password",
  },
  avatar_url: {
    "ui:widget": "textarea",
  },
};

const ElderlyRJFS = () => {
  const [jsonSchemaStr, setJsonSchemaStr] = useState(
    JSON.stringify(defaultJsonSchema, null, 2)
  );
  const [uiSchemaStr, setUiSchemaStr] = useState(
    JSON.stringify(defaultUiSchema, null, 2)
  );

  const [jsonSchema, setJsonSchema] = useState(defaultJsonSchema);
  const [uiSchema, setUiSchema] = useState(defaultUiSchema);
  const [formData, setFormData] = useState({});

  const applySchemaChanges = () => {
    try {
      setJsonSchema(JSON.parse(jsonSchemaStr));
      setUiSchema(JSON.parse(uiSchemaStr));
    } catch (e) {
      alert("❌ Lỗi khi parse JSON schema. Vui lòng kiểm tra lại.");
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h2>🧓 Elderly RJSF Form Editor</h2>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <h4>📄 JSON Schema</h4>
          <textarea
            value={jsonSchemaStr}
            onChange={(e) => setJsonSchemaStr(e.target.value)}
            rows={30}
            style={{ width: "100%", fontFamily: "monospace", fontSize: 13 }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 300 }}>
          <h4>🎨 UI Schema</h4>
          <textarea
            value={uiSchemaStr}
            onChange={(e) => setUiSchemaStr(e.target.value)}
            rows={30}
            style={{ width: "100%", fontFamily: "monospace", fontSize: 13 }}
          />
        </div>
      </div>

      <button onClick={applySchemaChanges} style={{ marginTop: 12 }}>
        ✅ Áp dụng schema
      </button>

      <div style={{ marginTop: 40 }}>
        <h3>🧾 Form Preview</h3>
        <Form
          schema={jsonSchema}
          uiSchema={uiSchema}
          formData={formData}
          validator={validator} // ⬅️ bắt buộc!
          onChange={({ formData }) => setFormData(formData)}
          onSubmit={({ formData }) =>
            console.log("📤 Submitted form data:", formData)
          }
        />
      </div>
    </div>
  );
};

export default ElderlyRJFS;
