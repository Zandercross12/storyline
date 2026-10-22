<script lang="ts">
    import { enhance } from "$app/forms";

    let loginType = $state(true);

    let headerText = $derived(loginType ? "Login" : "Register");
    let formAction = $derived(loginType ? "?/signInEmail" : "?/signUpEmail");
</script>

<!-- Toggle Form Type -->
<div>
    <button onclick={() => (loginType = true)}>Login</button>
    <button onclick={() => (loginType = false)}>Register</button>
</div>

<!-- Form -->
<h1>{headerText}</h1>
<form method="post" action={formAction} use:enhance>
    {#if !loginType}
        <label for="name"
            >Username
            <input name="name" />
        </label>
    {/if}
    <label for="email"
        >Email
        <input type="email" name="email" /></label
    >
    <label for="password">
        Password
        <input type="password" name="password" />
    </label>
    <button>{headerText}</button>
</form>
