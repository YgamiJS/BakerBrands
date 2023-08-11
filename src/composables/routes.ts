import { useRoute } from "vue-router";

export const useRoutes = () => {
  const routes = useRoute()
    .fullPath.match(/\w+/gi)
    ?.map((char) => char.replace(/^[a-zA-Z0-9]{20}$/, ""))!;

  return { routes };
};
