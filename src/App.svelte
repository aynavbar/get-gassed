<script>
    import { onMount } from "svelte";
    import { complimentsList } from "./lib/compliments";

    const categories = Array.from(Object.keys(complimentsList));

    let compliment = $state("");
    let selectedCategory = $state(categories[0]);

    function generateCompliment() {
      // picks a random compliment from the `complimentList` store
      const index = Math.floor(Math.random() * complimentsList[selectedCategory].length);
      compliment = complimentsList[selectedCategory][index];
    }

    onMount(() => generateCompliment()) // generate a compliment when the page loads
</script>

<main>
    <p>{compliment}</p>
    <button onclick={generateCompliment}>Get gassed</button>
    <ul>
        {#each categories as category (category)}
            <li><button
                onclick={() => {
                  selectedCategory = category
                }}
                class="{selectedCategory === category ? 'selected' : ''}"
            >{{
              general: "General",
              workEthic: "Work ethic",
              creativity: "Creativity",
              devCode: "Writing code"
            }[category]}</button></li>
        {/each}
    </ul>
</main>

<style>
    main {
        width: 100vw;
        height: 100dvh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .selected {
        color: red;
    }
</style>
