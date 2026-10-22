import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { project, projectAuthor } from "$lib/server/db/project.schema";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) {
    return redirect(302, '/login');
  }

  const projects = await db.select().from(project);
  return { user: event.locals.user, projects: projects };
};

export const actions: Actions = {
  createProject: async (event) => {
    const formData = await event.request.formData();

    const name = formData.get("name")?.toString() ?? "";
    const description = formData.get("description")?.toString() ?? "";

    // Project Name and Authentication checks
    if (!name) {
      return fail(401, {
        error: "Project name is required."
      });
    }

    const user = event.locals.user;

    if (!user) {
      return fail(401, {
        error: "You must be signed in to create a project."
      })
    }

    const projectId = crypto.randomUUID();

    try {
      await db.transaction(async (tx) => {
        await tx.insert(project).values({
          id: projectId,
          name,
          description: description || null
        });

        await tx.insert(projectAuthor).values({
          projectId,
          userId: user.id
        })
      })
    } catch (error) {
      console.error("Failed to create project:", error);

      return fail(500, {
        error: "Failed to create project."
      })
    }

    return redirect(302, `/projects/${projectId}`);
  }
}
