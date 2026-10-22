<script lang="ts">
    let { window } = $props();
</script>

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
