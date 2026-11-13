import Price from "./Price";
import { prices } from "@/data/profile";
import { DiCodeigniter } from "react-icons/di";
import { GiCondorEmblem } from "react-icons/gi";

export default function Prices() {
  return (
    <ul className="prices grid sm:grid-cols-2 grid-cols-1">
      <li className="relative vCustomLine sm:before:block before:hidden before:right-0">
        <Price Icon={DiCodeigniter} price={prices[0]} />
      </li>
      <li>
        <Price Icon={GiCondorEmblem} price={prices[1]} />
      </li>
    </ul>
  );
}
