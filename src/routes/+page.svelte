<script lang="ts">
    import type { PageServerData } from './$types';
    // Check if logged in
    let {data}: {data: PageServerData} = $props();
    console.log('data', data);
</script>

<h1>Home</h1>
<!-- Recommended Section -->
<!-- Browse Section -->
