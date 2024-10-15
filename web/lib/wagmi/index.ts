import { createConfig } from "@wagmi/core";
import { polygonAmoy } from "wagmi/chains";
import { http } from "wagmi";

const chains = [polygonAmoy] as const;

const config = createConfig({
  chains,
  transports: {
    [polygonAmoy.id]: http(),
  },
});

const e = {
  defaultConfig: config,
};

export default e;
