import classNames from "classnames";
import React from "react";

export default function Button({
  primary,
  danger,
  warning,
  success,
  primaryOutlined,
  dangerOutlined,
  warningOutlined,
  successOutlined,
  rounded,
  children,
  ...rest
}) {
  const finalizedClassNames = classNames(
    rest.className,
    "px-8 py-2 text-white",
    {
      "bg-blue-500 hover:bg-blue-700": primary,
      "bg-red-500 hover:bg-red-600": danger,
      "bg-yellow-300 hover:bg-yellow-400": warning,
      "bg-green-500 hover:bg-green-600": success,
      "rounded-full": rounded,
      "border border-blue-700 bg-white text-black hover:bg-blue-700 hover:text-white":
        primaryOutlined,
      "border border-red-500 bg-white text-black hover:bg-red-500 hover:text-white":
        dangerOutlined,
      "border border-yellow-300 bg-white text-black hover:bg-yellow-300":
        warningOutlined,
      "border border-green-500 bg-white text-black hover:bg-green-500 hover:text-white":
        successOutlined,
    }
  );
  return (
    <div>
      <button {...rest} className={finalizedClassNames}>
        {children}
      </button>
    </div>
  );
}

Button.propTypes = {
  isButtonOfASingleType: ({
    primary,
    danger,
    warning,
    success,
    primaryOutlined,
    dangerOutlined,
    warningOutlined,
    successOutlined,
  }) => {
    let count =
      Number(!!primary) +
      Number(!!danger) +
      Number(!!warning) +
      Number(!!success) +
      Number(!!primaryOutlined) +
      Number(!!dangerOutlined) +
      Number(!!warningOutlined) +
      Number(!!successOutlined);
    if (count > 1)
      return new Error("Multiple styling classes selected for a button!");
  },
};
