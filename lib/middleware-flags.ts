import { unstable_declareMiddlewareFlag } from "@vercel/flags/next/middleware";

export const showPromoBannerFlag = unstable_declareMiddlewareFlag<boolean>({
  key: "showPromoBanner",
  async decide({ request }) {
    return false;
  },
});
