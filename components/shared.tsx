export const colors = {
  black: "#3A3935",
  tan: "#E6E6DA",
  sienna: "#A86654",
};

export const sluggify = (string: string) => {
  return string.toLowerCase().replaceAll(" ", "-");
};
