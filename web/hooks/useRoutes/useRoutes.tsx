export const origin =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_PROTOCOL_SCHEME}://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : `${process.env.NEXT_PUBLIC_PROTOCOL_SCHEME}://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`;

export const apiOriginWS = `ws://${process.env.NEXT_PUBLIC_API_URL}`;
export const apiOrigin =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_PROTOCOL_SCHEME}://${process.env.NEXT_PUBLIC_API_URL}`
    : `${process.env.NEXT_PUBLIC_PROTOCOL_SCHEME}://${process.env.NEXT_PUBLIC_API_URL}`;

export const routes = {
  home: () => `${origin}/`,
  api: {
    images: {
      upload: () => `${origin}/api/images/upload`,
    },
  },
};

export const useRoutes = () => routes;
