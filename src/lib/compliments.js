const complimentsList = {
  general: [
    "You bring a kind of energy that makes everything around you better.",
    "You're proof that consistency beats perfection.",
    "The world genuinely needs more people like you in it.",
    "You handle hard days better than you give yourself credit for.",
    "Your presence alone makes a room feel lighter.",
    "You've got a rare kind of resilience — the quiet, steady kind.",
    "You make it look easy, even when it isn't.",
    "You're someone people feel safe being honest with.",
    "You've grown so much, even if it's hard to see day to day.",
    "You have impeccable taste in exactly one thing: yourself. (Kidding — you're great.)",
    "You're the friend everyone wishes they had on speed dial.",
    "You turn ordinary moments into good memories.",
    "You've got main character energy, and you don't even try for it.",
    "You're allowed to be proud of how far you've come.",
    "You make hard things look like a Tuesday.",
    "Your gut instincts are sharper than you think.",
    "You're the kind of person who makes plans and actually shows up.",
    "You've got a spark that doesn't dim, even on rough days.",
    "You're doing better than you think you are. Seriously.",
    "You radiate 'main quest energy,' not 'side character energy.'",
    "You're wildly underrated, and that's about to change.",
    "You've got the kind of heart that makes people want to be better.",
    "You're built different — the good kind of different.",
    "You make people feel like they matter, and that's a superpower.",
    "You're one of the good ones. The world's lucky to have you.",
  ],

  workEthic: [
    "You show up even on the days it would be easier not to.",
    "Your work ethic is the kind people quietly try to copy.",
    "You finish what you start, and that's rarer than people think.",
    "You've turned 'I'll figure it out' into a personality trait, and it works.",
    "You put in the reps nobody sees, and it shows.",
    "You don't need a pep talk to get moving — you just move.",
    "You treat 'good enough' like a challenge, not a finish line.",
    "You've got the discipline of someone twice your experience.",
    "You make deadlines look like suggestions you're ahead of.",
    "You grind quietly and let the results do the talking.",
    "You're the definition of showing up and doing the work.",
    "You've built momentum most people only dream about.",
    "You don't wait for motivation — you just start, and it follows.",
    "You take feedback and actually use it. That's a rare skill.",
    "You're relentless in the most respectable way possible.",
    "You've earned every bit of progress you've made.",
    "You treat obstacles like plot points, not stop signs.",
    "Your follow-through is honestly impressive.",
    "You've got that 'get it done, then celebrate' mindset.",
    "You make hard work look like second nature.",
    "You don't cut corners, and people notice — even when they don't say it.",
    "You're the person a team can count on without asking twice.",
    "You've mastered the art of doing the unglamorous stuff well.",
    "You keep showing up for your goals, even when no one's clapping.",
    "You're proof that steady beats flashy every time.",
  ],

  creativity: [
    "Your brain works in a way that makes ordinary things interesting.",
    "You see angles other people completely miss.",
    "You've got a genuinely original way of putting things together.",
    "Your ideas have a way of sticking with people.",
    "You make 'thinking outside the box' look effortless.",
    "You've got a knack for turning nothing into something great.",
    "Your imagination clearly didn't get the memo about limits.",
    "You bring a flavor to your work that's unmistakably you.",
    "You take risks with your ideas that most people are too scared to try.",
    "You've got the kind of creativity that can't be taught, only nurtured.",
    "Your work has fingerprints — nobody else could've made it.",
    "You connect dots that seem completely unrelated, and somehow it works.",
    "You make things that didn't need to be beautiful, beautiful anyway.",
    "You've got an eye for detail most people scroll right past.",
    "Your creative instincts are sharper than you give them credit for.",
    "You turn constraints into some of your best ideas.",
    "You make weird ideas sound brilliant, because sometimes they are.",
    "You've got a style that's genuinely hard to copy.",
    "Your brainstorms are chaotic in the best possible way.",
    "You make art out of things people usually rush past.",
    "You're not afraid to make something that hasn't been made before.",
    "You bring color to things that used to be black and white.",
    "You've got a curiosity that makes everything you touch more interesting.",
    "You reinvent instead of repeat, and it shows.",
    "Your ideas deserve way more credit than they get.",
]
,

  devCode: [
    "Your code actually reads like it was written by someone who cares — because it was.",
    "You debugged that like it owed you money, and you won.",
    "That refactor was *chef's kiss* — cleaner, faster, and way less scary to touch.",
    "You named your variables like a responsible adult. Respect.",
    "Your commit history tells a story, and it's a good one.",
    "You found the bug in the one line nobody else even looked at. Legend.",
    "That function is doing exactly one thing, and doing it beautifully.",
    "Your PR description is so clear even future-you will thank you.",
    "You wrote tests before anyone had to ask. Absolute professional.",
    "You turned a 200-line mess into something that actually makes sense.",
    "Your error handling isn't an afterthought — it's a whole strategy.",
    "That edge case would've slipped past most people. Not you.",
    "You made that API feel intuitive, and that's genuinely hard to do.",
    "Your code review comments make people better developers, not worse.",
    "You shipped it, it worked, and you didn't even need to panic-deploy a fix.",
    "That's a clean git history. Someone's been rebasing responsibly.",
    "You solved it with less code, not more. That's the real skill.",
    "Your documentation exists AND makes sense. Certified rare.",
    "You caught that race condition before it caught you. Nice.",
    "That architecture decision is going to save future-you so much pain.",
    "You made the hard problem look like a Tuesday afternoon.",
    "Your function signatures are self-explanatory. Beautiful, honestly.",
    "You optimized that loop and it's now doing laps around the old version.",
    "You didn't just fix the bug, you figured out why it happened. That's next level.",
    "Your code is proof that you can be both fast and careful. Rare combo.",
  ],
};


/**
 *
 * @param {string} str
 * @returns string
 */

function camelToSentenceCase(str) {
  const trimmed = str.trim() // prevents a bug where the first alphanumeric character is removed when there are one or more spaces at the beginning of the string
  const capitalizedChars = Array.from(trimmed.matchAll(/[A-Z]/g));
  const indices = capitalizedChars.map((item) => item.index) // the indices of the capitalized letters
  let result = "" // for reconstructing the string in sentence case

  for (let i = 0; i < trimmed.length; i++) {
    if (indices.includes(i)) {
      result += ` ${trimmed[i].toLowerCase()}`
    } else {
      result += trimmed[i]
    }
  }

  const lastIndex = result.length - 1;

  result = result.replace(result[0], result[0].toUpperCase()); // turn the first character to lowercase
  result = result.replace(result[lastIndex], result[lastIndex].toLowerCase()); // turn the last character to lowercase

  return result;
}

/**
 *
 * @param {string} str
 * @returns string
 *
 */

function sentenceToCamelCase(str) {
  const trimmed = str.trim() // prevents a bug where the first alphanumeric character is removed when there are one or more spaces at the beginning of the string
  const capitalizedChars = Array.from(trimmed.matchAll(/\s+[a-z]/g));
  const indices = capitalizedChars.map((item) => item.index) // the indices of the capitalized letters
  let result = "" // for reconstructing the string in camelCase

  for (let i = 0; i < trimmed.length; i++) {
    if (indices.includes(i) && i !== 0) { // remove the space, capitalize the next character and add it
      result += trimmed[i + 1].toUpperCase();
    } else if (trimmed[i-1] !== " ") { // skip the character since it was already added
      result += trimmed[i];
    }
  }

  const lastIndex = result.length - 1;

  result = result.replace(result[0], result[0].toLowerCase()); // turn the first character to lowercase
  result = result.replace(result[lastIndex], result[lastIndex].toLowerCase()); // turn the last character to lowercase
  return result;
}

const categories = Array.from(Object.keys(complimentsList)).map((item) => camelToSentenceCase(item));

export { complimentsList, categories, sentenceToCamelCase };
