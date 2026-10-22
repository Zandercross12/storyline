<script lang="ts">
    import type { PageServerData } from "./$types";
    import { dndzone } from "svelte-dnd-action";

    let { data }: { data: PageServerData } = $props();

    let project = $derived(data.project);

    console.log("project", project);

    // Types
    type ContentItem = {
        id: string;
        type: "page" | "note" | "outline";
        name: string;
        content: string;
    };

    type Window = {
        id: string;
        tabs: string[];       // ContentItem IDs
        activeTabId: string;
    };

    // States
    let activeWindowId = $state<string | null>(null);
    let contentArray: ContentItem[] = $state([]);

    console.log("contentArray", contentArray);

    // Functions
    const addPage = () => {
        const newContentArray: ContentItem = {
            id: crypto.randomUUID(),
            type: "page",
            name: "",
            content: "",
        };

        contentArray.push(newContentArray);
    };

    let debounceTimer: ReturnType<typeof setTimeout>;

    const handleTitleChange = (index: number, event: Event) => {
        const input = event.currentTarget as HTMLInputElement;

        contentArray[index].name = input.value;

        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(() => {
            console.log("Updated Contentarray", contentArray);
        }, 1000);
    };

    const handleContentChange = (index: number, event: Event) => {
        const input = event.currentTarget as HTMLTextAreaElement;

        contentArray[index].content = input.value;

        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(() => {
            console.log("User stopped typing:", contentArray[index].content);
        }, 1000);
    };

    const handleDndConsider = (event: CustomEvent) => {
        contentArray = event.detail.items;
    };

    const handleDndFinalize = (event: CustomEvent) => {
        contentArray = event.detail.items;

        console.log("Final order:", contentArray);
    };
</script>

<!-- Should be multiple different views for this screen (options or account settings?) -->

<h1>{project.name}</h1>
<p>{project.description}</p>

<button onclick={() => addPage()}>Add Page</button>
<button onclick={() => console.log("add category")}>Add Category</button>
<button onclick={() => console.log("add outline")}>Add Outline</button>

<!-- Windows -->
<!-- TODO: Loop over window items -->

<ul
    use:dndzone={{
        items: contentArray,
        flipDurationMs: 200,
    }}
    onconsider={handleDndConsider}
    onfinalize={handleDndFinalize}
>
    {#each contentArray as window, index (window.id)}

        <li>
            <div>
                {window.id}
            </div>
            <input
                type="text"
                placeholder={window.name}
                value={window.name ?? ""}
                oninput={(event) => handleTitleChange(index, event)}
            />
            <textarea
                placeholder="Page Content"
                oninput={(event) => handleContentChange(index, event)}
                >{window.content ?? ""}</textarea
            >
        </li>
    {/each}
</ul>
