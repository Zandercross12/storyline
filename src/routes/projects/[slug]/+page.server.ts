import { db } from "$lib/server/db/index.js";
import { project } from "$lib/server/db/project.schema.js";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const load = async ({ locals, params }) => {
  if (!locals.user) {
    return redirect(302, "/login");
  }

  const projects = await db
    .select()
    .from(project)
    .where(eq(project.id, params.slug))
    .limit(1);

  return { user: locals.user, slug: params.slug, project: projects[0] };
};

// export const addOrUpdatePage = async () => {
//
// }

// export const get
