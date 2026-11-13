import type { Access } from "payload";

/** Anyone (including the public site and REST API) may read. */
export const anyone: Access = () => true;

/** Only logged-in CMS users. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user);
