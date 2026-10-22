import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (event) => {
  if (!event.locals.user) {
    return {};
  }

  return { user: event.locals.user };
};
