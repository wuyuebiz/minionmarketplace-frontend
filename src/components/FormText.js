import Text from "./Text";

const getFontStyle = (fontType) => {
  switch (fontType) {
    case "B32":
      return { fontSize: 32, fontWeight: 700 };
    case "R32":
      return { fontSize: 32, fontWeight: 400 };
    case "B24":
      return { fontSize: 24, fontWeight: 700 };
    case "R24":
      return { fontSize: 24, fontWeight: 400 };
    case "B20":
      return { fontSize: 20, fontWeight: 700 };
    case "R20":
      return { fontSize: 20, fontWeight: 400 };
    case "B18":
      return { fontSize: 18, fontWeight: 700 };
    case "R18":
      return { fontSize: 18, fontWeight: 400 };
    case "B16":
      return { fontSize: 16, fontWeight: 700 };
    case "R16":
      return { fontSize: 16, fontWeight: 400 };
    case "B14":
      return { fontSize: 14, fontWeight: 700 };
    case "R14":
      return { fontSize: 14, fontWeight: 400 };
    case "B12":
      return { fontSize: 12, fontWeight: 700 };
    case "R12":
      return { fontSize: 12, fontWeight: 400 };
    default:
      return { fontSize: 12, fontWeight: 400 };
  }
};

const FormText = ({ fontType = "R18", children, color, style, ...rest }) => {
  let _fontType;
  if (typeof fontType === "object") {
    _fontType = fontType.default;
  } else {
    _fontType = fontType;
  }

  const fontStyle = getFontStyle(_fontType);

  return (
    <Text
      style={{ color, ...fontStyle, ...style }}
      children={children}
      {...rest}
    />
  );
};

export default FormText;
