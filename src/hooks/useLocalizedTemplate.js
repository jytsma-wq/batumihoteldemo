import { useState } from "react";

export function resolveLocalizedTemplate(draft, nextTemplate) {
  if (draft.template === nextTemplate || draft.value !== draft.template) {
    return draft.value;
  }
  return nextTemplate;
}

export function useLocalizedTemplate(template) {
  const [draft, setDraft] = useState(() => ({ template, value: template }));
  const value = resolveLocalizedTemplate(draft, template);

  function setValue(nextValue) {
    setDraft({ template, value: nextValue });
  }

  return [value, setValue];
}
