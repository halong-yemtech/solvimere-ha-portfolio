import { IconType } from "react-icons";
import {
  FaAws,
  FaGithub,
  FaIdCard,
  FaLinkedin,
  FaQuestionCircle,
  FaWhatsapp,
} from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import {
  SiApachekafka,
  SiDocker,
  SiGo,
  SiPostgresql,
  SiUpwork,
} from "react-icons/si";

interface Props {
  Icon: IconType | string;
  size?: string;
  iconClassName?: string;
  style?: React.CSSProperties;
  wrapperClassName?: string;
}

// Icons referenced by name in /data. Importing whole react-icons libraries
// (`import * as ...`) bundles tens of thousands of icons, so list them here.
// To use a new icon in /data, import it above and add it to this map.
const iconRegistry: Record<string, IconType> = {
  FaAws,
  FaGithub,
  FaIdCard,
  FaLinkedin,
  FaWhatsapp,
  RiRobot2Line,
  SiApachekafka,
  SiDocker,
  SiGo,
  SiPostgresql,
  SiUpwork,
};

const getIconComponent = (iconName: string): IconType => {
  const icon = iconRegistry[iconName];
  if (!icon && process.env.NODE_ENV !== "production") {
    console.warn(`MyIcon: "${iconName}" is not in iconRegistry (components/MyIcon.tsx)`);
  }
  return icon ?? FaQuestionCircle;
};

export default function MyIcon({
  Icon,
  size,
  iconClassName,
  style,
  wrapperClassName,
}: Props) {
  const IconComponent =
    typeof Icon === "string" ? getIconComponent(Icon) : Icon;

  if (wrapperClassName !== undefined) {
    return (
      <div className={wrapperClassName}>
        <IconComponent
          className={iconClassName || "text-5xl text-main-orange"}
          style={style}
        />
      </div>
    );
  }

  return (
    <div
      className={`icon ${
        size ? size : "w-24 h-24"
      } rounded-full border-2 border-main-orange border-solid flex items-center justify-center`}
    >
      <IconComponent
        className={iconClassName || "text-5xl text-main-orange"}
        style={style}
      />
    </div>
  );
}
