<script lang="ts">
    import "./layout.css";
    import favicon from "$lib/assets/favicon.svg";
    import { resolve } from "$app/paths";
    import type { PageServerData } from "./$types";
    import type { Snippet } from "svelte";

    let { children, data }: { data: PageServerData; children: Snippet<[]> } =
        $props();

    let userData = $derived(data?.user);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<nav>
    <ul>
        {#if userData}
            <li>
                <a href={resolve("/sign-out")}>Sign Out</a>
            </li>
        {/if}
    </ul>
</nav>
{@render children()}
