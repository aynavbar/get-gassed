<script>
    import { onMount } from "svelte";
    import { complimentsList, categories } from "./lib/compliments";

    let compliment = $state("");
    let selectedCategory = $state(categories[0]); // defaults to the first category of compliments
    let isExiting = $state(false);

    function generateCompliment() {
      // picks a random compliment from the `complimentList` store

      isExiting = true
      if (selectedCategory !== "random") {
        const index = Math.floor(Math.random() * complimentsList[selectedCategory].length);
        compliment = complimentsList[selectedCategory][index];
        return
      }
      // generate a random phrase from a random category
      const randomCategory = categories[(Math.floor(Math.random() * categories.length))];
      const index = Math.floor(Math.random() * complimentsList[randomCategory].length);
      compliment = complimentsList[randomCategory][index];
    }

    onMount(() => generateCompliment()) // generate a compliment when the page loads
</script>

<main>
    <p class="{isExiting ? 'slide' : ''}" onanimationend={() => {
      isExiting = false
    }}>{compliment}</p>
    <div class="controls-container">
        <button onclick={generateCompliment}>Get gassed</button>
        <ul>
            {#each categories as category (category)}
                <li><button
                    onclick={() => {
                      if (selectedCategory === category) {
                        selectedCategory = "random"
                        return
                      }

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
    </div>
</main>

<style>
    main {
        width: 100vw;
        height: 100dvh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #9dff8d;
    }

    button {
        border: 3px solid;
        border-radius: 10px;
        background-color: transparent;
        color: white;
        font-size: 1rem;
        cursor: pointer;
    }

    button.selected {
        background-color: #000;
        color: #fff;
    }

    p {
        position: fixed;
        width: fit-content;
        margin: auto;
        font-size: 2rem;
        transition: transform 0.2s ease;
    }

    p.slide {
        animation: fade-out-in 0.3s ease-in-out;
    }

    @keyframes fade-out-in {
        2% {
            opacity: 2%;
        }

        100% {
            opacity: 100%;
        }
    }

    .controls-container > button {
        padding-inline: 30px;
        padding-block: 10px;
        background-color: #4b4bff;
        font-size: 0.9rem;
        border: none;
        font-weight: normal;
    }

    .controls-container {
        position: absolute;
        bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    ul {
        display: grid;
        grid-template-columns: 100px 100px;
        grid-template-rows: 30px 30px;
        gap: 10px;
        padding-block-start: 40px;
    }

    ul li {
        list-style-type: none;
    }

    ul button {
        width: 100%;
        height: 100%;
        font-size: 0.9rem;
        color: #000000;
        border-color: #000000;
        border-radius: 6px;
    }
</style>
