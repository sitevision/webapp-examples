import i18n from "@sitevision/api/common/i18n";
import * as React from "react";

const NoLinks = () => {
  return (
    <p className="env-color--info">
      <em>{i18n.get("noLinks")}</em>
    </p>
  );
};

export default NoLinks;
