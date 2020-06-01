import Snap from "snapsvg-cjs";

export const getXYScale = (
  officeId: string,
  styleId: string,
  containerId: string
) => {
  const container = document.getElementById(containerId);

  const pos = getPositions(officeId, styleId);

  const x = container.clientWidth / 2 - (pos.R.x + pos.R.w / 2) * 1.5; // calculating x translate

  const y = container.clientHeight / 2 - (pos.R.y + pos.R.h / 2) * 1.5; // calculating y translate

  //   let Xch = "-" + Math.abs(X);
  //   let Ych = Y < 0 ? 0 : "+" + Y;

  //   console.log("X: ", X, " Y :", Ych);

  return {
    x,
    y,
  };
};

const getPositions = (officeId: string, styleId: string) => {
  let pos: any = {};

  pos.svg = Snap("svg").getBBox();

  pos.g = getTransformer(styleId);

  pos.R = Snap("g#" + officeId).getBBox();

  pos.k = pos.svg.w / pos.g.w;

  console.log(pos);

  return pos;
};

export const getTransformer = (selector: string) => {
  const transformStr = document.getElementById(selector).parentElement.style
    .transform;

  const transformArray = transformStr.split(" ");

  const xPossiotion = transformArray[0].substring(
    transformArray[0].indexOf("(") + 1,
    transformArray[0].indexOf("p")
  );
  const yPossiotion = transformArray[1].substring(
    0,
    transformArray[1].indexOf("p")
  );

  const scale = transformArray[2].substring(
    transformArray[2].indexOf("(") + 1,
    transformArray[2].indexOf(")")
  );

  const gWidth = document.getElementById(selector).parentElement.clientWidth;
  const gHeight = document.getElementById(selector).parentElement.clientHeight;

  return {
    w: gWidth,
    h: gHeight,
    x: parseInt(xPossiotion),
    y: parseInt(yPossiotion),
    scale: parseFloat(scale),
  };
};
