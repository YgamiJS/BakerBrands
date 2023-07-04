import { useRoute } from "vue-router";

export const useRoutes = () => {
  const routes = useRoute().fullPath.match(/\w+/gi);

  return { routes };
};
