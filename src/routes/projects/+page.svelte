<script lang="ts">
    import { enhance } from "$app/forms";
    import { resolve } from "$app/paths";
    import type { PageServerData } from "./$types";

    let { data }: { data: PageServerData } = $props();

    console.log("projects:", data?.projects);

    let openCreateProject = $state(false);
</script>

<h1>Projects</h1>
<button onclick={() => (openCreateProject = true)}>Create Project</button>
{#if openCreateProject}
    <form method="post" action="?/createProject" use:enhance>
        <label for="name">
            Project Name
            <input name="name" type="text" />
        </label>
        <label for="description">
            Description
            <textarea name="description"></textarea>
        </label>
        <button>Create Project</button>
    </form>
{/if}
<!-- Recents Section -->
<!-- All Projects Section -->
{#each data?.projects as project (project.id)}
    <a href={resolve(`/projects/${project.id}`)}>
        <div>{project.name}</div>
    </a>
{/each}
