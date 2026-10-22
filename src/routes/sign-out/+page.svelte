<script>
    import { enhance } from "$app/forms";
    import { resolve } from "$app/paths";
</script>

Are you sure?
<form method="post" action="?/signOut" use:enhance>
    <button>Confirm</button>
</form>
<a href={resolve("/")}>Home</a>
