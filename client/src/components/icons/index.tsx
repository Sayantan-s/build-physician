import { JSX } from "react";
import { CSS } from "./css";
import { HTML } from "./html";
import { Image } from "./img";
import { Js } from "./js";
import { Json } from "./json";
import { Jsx } from "./jsx";
import { Less } from "./less";
import { Sass } from "./sass";
import { Ts } from "./ts";
import { Tsx } from "./tsx";
import { Doc } from "./doc";

export const TECHSTACK_ICONS: Record<string, JSX.Element> = {
  ".jsx": <Jsx width={24} />,
  ".tsx": <Tsx width={24} />,
  ".html": <HTML width={20} />,

  ".scss": <Sass width={24} />,
  ".sass": <Sass width={24} />,
  ".css": <CSS width={24} />,
  ".less": <Less width={24} />,

  ".jpg": <Image width={24} />,
  ".png": <Image width={24} />,
  ".webp": <Image width={24} />,
  ".jpeg": <Image width={24} />,
  ".gif": <Image width={24} />,
  ".svg": <Image width={24} />,
  ".aviff": <Image width={24} />,

  ".js": <Js width={24} />,
  ".ts": <Ts width={24} />,
  ".json": <Json width={24} />,
};
