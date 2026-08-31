<script>
    import { onMount } from "svelte";
    import { complimentsList, categories, sentenceToCamelCase } from "./lib/compliments";

    // load background images
    import cherryBlossoms from "./lib/assets/1711593.gif";
    import mountains from "./lib/assets/8351324.gif";
    import botanicCorner from "./lib/assets/8351249.gif";
    import street from "./lib/assets/8351224.gif";
    import serenePool from "./lib/assets/8351171.gif";

    const altTexts = {}
    altTexts[serenePool] = "pixelated lake reflecting the sky above as it streaks with shooting stars"
    altTexts[street] = "pixelated street leading into a highway"
    altTexts[botanicCorner] = "pixelated corner of a house filled with various houseplants and a cat sitting on the window sill"
    altTexts[mountains] = "pixelated wide shot of a man looking at the mountains"
    altTexts[cherryBlossoms] = "pixelated cherry blossoms next to a busy roadbridge"

    let compliment = $state("");
    let displayedImage = $state(serenePool);
    let selectedCategory = $state(sentenceToCamelCase(categories[0])); // defaults to the first category of compliments
    let imageChanged = $state(false); // whether the user has selected another image or not

    /**
     * @type HTMLImageElement
     */
    let bgImage = $state();

    /**
     * @type HTMLParagraphElement
     */
    let complimentText = $state();

    function generateCompliment() {
      if (!document.startViewTransition) {
        if (complimentText) {
          complimentText.innerText = compliment; // fallback: no animation
          return;
        }
      }
      document.startViewTransition(() => {
        complimentText.innerText = compliment;
      });

      // picks a random compliment from the `complimentList` store
      if (selectedCategory !== "random") {
        const index = Math.floor(Math.random() * complimentsList[selectedCategory].length);
        compliment = complimentsList[selectedCategory][index];
        return
      }
      // generate a random phrase from a random category
      const randomCategory = sentenceToCamelCase(categories[(Math.floor(Math.random() * categories.length))]);
      const index = Math.floor(Math.random() * complimentsList[randomCategory].length);
      compliment = complimentsList[randomCategory][index];
    }

    onMount(() => generateCompliment()) // generate a compliment when the page loads
</script>

<main>
    <div class="background-image-container">
        <img
            bind:this={bgImage}
            src="{serenePool}"
            alt="{altTexts[serenePool]}"
        >
    </div>
    <p
        bind:this={complimentText}
        class="pixelify-sans-400"
    ></p>
    <div class="controls-container">
        <button onclick={generateCompliment}>Get gassed</button>
        <ul>
            {#each categories as category (category)}
                <li><button
                    onclick={() => {
                      const categoryInCamelCase = sentenceToCamelCase(category); // convert to coresponding object keys
                      if (selectedCategory === categoryInCamelCase) {
                        selectedCategory = "random"
                        return
                      }
                      selectedCategory = categoryInCamelCase;
                    }}
                    class="{selectedCategory === sentenceToCamelCase(category) ? 'selected' : ''}"
                >{category}</button></li>
            {/each}
        </ul>
        <div class="background-buttons-container">
            <ul class="background-buttons">
                {#each Array.from(Object.keys(altTexts)) as imageSrc}
                    <li>
                        <button
                            onclick={() => {
                              if (!document.startViewTransition) {
                                  bgImage.src = imageSrc; // fallback: no animation
                                  return;
                                }
                                document.startViewTransition(() => {
                                  bgImage.src = imageSrc;
                                });

                                displayedImage = imageSrc
                            }}
                            class="{imageSrc === displayedImage ? 'selected-image' : ''}"
                        >
                            <img src={imageSrc} alt="{altTexts[imageSrc]}">
                        </button>
                    </li>
                {/each}
            </ul>
        </div>
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
        background-size: cover;
        background-repeat: no-repeat;
    }

    .background-image-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .background-image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        user-select: none;
    }

    .background-image-container img:nth-child(2) {
        position: absolute;
        top: 0;
    }

    button {
        border: 3px solid;
        border-radius: 10px;
        background-color: transparent;
        color: white;
        cursor: pointer;
        font-family: "Jersey 25", sans-serif;
        font-weight: 400;
        font-style: normal;
    }

    button:focus-visible {
        outline: 2px #fff solid;
    }

    button.selected {
        background-color: #000;
        color: #fff;
    }

    p {
        position: fixed;
        width: fit-content;
        margin: auto;
        font-size: 1.6rem;
        font-weight: 600;
        text-align: center;
        padding-inline: 30px;
        word-wrap: break-word;
    }

    .controls-container > button {
        padding-inline: 30px;
        padding-block: 10px;
        background-color: #4b4bff;
        font-size: 1.5rem;
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
        font-size: 1.2rem;
        color: #000000;
        border-color: #000000;
        border-radius: 6px;
    }

    .background-buttons-container {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        left: 20px;
        bottom: 40px;
    }

    ul.background-buttons {
        display: flex;
        align-items: center;
        padding-block-start: 0;
        height: 50px;
        overflow-x: auto;
    }

    ul.background-buttons button {
        width: 60px;
        height: 40px;
        border-radius: 10px;
        overflow: hidden;
    }

    ul.background-buttons button img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: fill;
        user-select: none;
    }

    ul.background-buttons button.selected-image {
        border-color: #ffffff;
    }

    @media (max-width: 958px) {
        .background-buttons-container {
            width: 100vw;
            height: fit-content;
            overflow-x: hidden;
            top: 40px;
            left: 0;
            padding-inline: 10px
        }
    }

    @media (min-width: 640px) {
        p {
            font-size: 3rem;
        }
    }
</style>
