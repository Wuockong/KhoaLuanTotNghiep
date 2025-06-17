import React, { useState } from "react";
import { withTheme } from "@rjsf/core";
// import { Theme as Bootstrap4Theme } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { Theme as MuiTheme } from "@rjsf/mui";
const Form = withTheme(MuiTheme);
const defaultJsonSchema = {
  title: "TestAttemptData",
  type: "object",
  properties: {
    _id: { type: "string" },
    attempt_id: { type: "string" },
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          difficulty: {
            type: "string",
            enum: ["easy", "medium", "hard"],
          },
          options: {
            type: "array",
            minItems: 4,
            maxItems: 4,
            items: {
              type: "string",
            },
          },
          correct_answer: { type: "string" },
        },
        required: ["question", "difficulty", "options", "correct_answer"],
        additionalProperties: false,
      },
    },

    timestamp: { type: "string", format: "date-time" },
  },
  required: ["_id", "attempt_id", "questions", "timestamp"],
  additionalProperties: false,
};
export const testAttemptUiSchema = {
  _id: {
    "ui:disabled": true,
  },
  attempt_id: {
    "ui:placeholder": "Enter attempt ID",
  },
  timestamp: {
    "ui:widget": "alt-datetime",
  },
  questions: {
    items: {
      question: {
        "ui:placeholder": "Enter the question text",
      },
      difficulty: {
        "ui:widget": "radio",
      },
      options: {
        items: {
          "ui:placeholder": "Option",
        },
      },
      correct_answer: {
        "ui:placeholder": "Correct answer text",
      },
    },
  },
};
const TestAttemptRJFS = () => {
  const [formData, setFormData] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  return (
    <div className="container py-4">
      <h3>📘 Test Attempt Form</h3>

      <Form
        schema={defaultJsonSchema}
        uiSchema={testAttemptUiSchema}
        formData={formData}
        validator={validator}
        onChange={({ formData }) => setFormData(formData)}
        onSubmit={({ formData }) => {
          setSubmittedData(formData);
          console.log("✅ Submitted", formData);
        }}
        onError={(errors) => console.log("❌ Errors", errors)}
      />

      {submittedData && (
        <div className="mt-4">
          <h5>📤 Submitted JSON:</h5>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TestAttemptRJFS;
