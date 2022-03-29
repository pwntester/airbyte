import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { ArrayHelpers, FormikProps } from "formik";

import TransformationForm from "views/Connection/TransformationForm";
import ArrayOfObjectsEditor from "components/ArrayOfObjectsEditor";
import { Transformation } from "core/domain/connection/operation";
import { isDefined } from "utils/common";

const TransformationField: React.FC<
  ArrayHelpers & {
    form: FormikProps<{ transformations: Transformation[] }>;
    defaultTransformation: Transformation;
    disabled?: boolean;
  }
> = ({ remove, push, replace, form, defaultTransformation, disabled }) => {
  const [editableItemIdx, setEditableItem] = useState<number | null>(null);
  return (
    <ArrayOfObjectsEditor
      items={form.values.transformations}
      editableItemIndex={editableItemIdx}
      mainTitle={
        <FormattedMessage
          id="form.transformationCount"
          values={{ count: form.values.transformations.length }}
        />
      }
      addButtonText={<FormattedMessage id="form.addTransformation" />}
      onRemove={remove}
      onStartEdit={(idx) => setEditableItem(idx)}
      disabled={disabled}
    >
      {(editableItem) => (
        <TransformationForm
          transformation={editableItem ?? defaultTransformation}
          onCancel={() => setEditableItem(null)}
          onDone={(transformation) => {
            if (isDefined(editableItemIdx)) {
              editableItemIdx >= form.values.transformations.length
                ? push(transformation)
                : replace(editableItemIdx, transformation);
              setEditableItem(null);
            }
          }}
        />
      )}
    </ArrayOfObjectsEditor>
  );
};

export { TransformationField };
