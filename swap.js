const pairs = [
  ['Barbies', 'nuclear physicists'],
  ['Barbie', 'Oppenheimer'],
  ['Greta Gerwig', 'Christopher Nolan'],
  ['Greta', 'Christopher'],
  ['Gerwig', 'Nolan'],
  ['Margot Robbie', 'Cillian Murphy'],
  ['Robbie', 'Murphy'],
  ['physicist', 'doll'],
];

function replaceAll(sentence, wordsToReplace) {
  return Object.keys(wordsToReplace).reduce(
    (f, s) => `${f}`.replace(new RegExp(s, 'g'), wordsToReplace[s]),
    sentence
  );
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

// Naively replaces gendered pronouns with neutral they/them variants
// Credit: https://github.com/amity/gender-neutralize/blob/master/replacement.js
function neutralize(text) {
  let neutral = text.slice();
  neutral = neutral.replace(/\b(s)?he was\b/g, 'they were');
  neutral = neutral.replace(/\bShe was\b/g, 'They were');
  neutral = neutral.replace(/\bHe was\b/g, 'They were');
  neutral = neutral.replace(/\b(s)?he has\b/g, 'they have');
  neutral = neutral.replace(/\bShe has\b/g, 'They have');
  neutral = neutral.replace(/\bHe has\b/g, 'They have');
  neutral = neutral.replace(/\bHe's\b/g, "They're");
  neutral = neutral.replace(/\bShe's\b/g, "They're");
  neutral = neutral.replace(/\b(s)?he's/g, "they're");
  neutral = neutral.replace(/\bhe has\b/g, 'they have');
  neutral = neutral.replace(/\bHe has\b/g, 'They have');
  neutral = neutral.replace(/\bHe is\b/g, 'They are');
  neutral = neutral.replace(/\bShe is\b/g, 'They are');
  neutral = neutral.replace(/\b(s)?he is\b/g, 'they are');
  neutral = neutral.replace(/\b(she )([^ ]+)(s\b)/, 'they $2');
  neutral = neutral.replace(/\b(he )([^ ]+)(s\b)/, 'they $2');
  neutral = neutral.replace(/\b(She )([^ ]+)(s\b)/, 'They $2');
  neutral = neutral.replace(/\b(He )([^ ]+)(s\b)/, 'They $2');
  neutral = neutral.replace(/\bher$/g, 'them');
  neutral = neutral.replace(/ing her\b/g, 'ing them');
  neutral = neutral.replace(/\b(s)?he\b/g, 'they');
  neutral = neutral.replace(/\b(s)?he\b/g, 'they');
  neutral = neutral.replace(/\bHe\b/g, 'They');
  neutral = neutral.replace(/\bShe\b/g, 'They');
  neutral = neutral.replace(/\bhers\b/g, 'theirs');
  neutral = neutral.replace(/\bHers\b/g, 'Theirs');
  neutral = neutral.replace(/\bhim\b/g, 'them');
  neutral = neutral.replace(/\bHim\b/g, 'Them');
  neutral = neutral.replace(/\bHis\b/g, 'Their');
  neutral = neutral.replace(/\bhis\b/g, 'their');
  neutral = neutral.replace(/\bher\b/g, 'their');
  neutral = neutral.replace(/\bHer\b/g, 'Their');
  neutral = neutral.replace(/\bhimself\b/g, 'themselves');
  neutral = neutral.replace(/\bherself\b/g, 'themselves');
  return neutral;
}

function swap() {
  const textElements = document.querySelectorAll(
    'h1, h2, h3, h4, h5, p, li, td, caption, span, a, em, div, b'
  );

  const intermediaries = {};
  const cipher = {};

  pairs.forEach(([a, b]) => {
    const idA = uuidv4();
    const idB = uuidv4();

    intermediaries[a] = idA;
    cipher[idB] = a;

    intermediaries[a] = idA;
    intermediaries[b] = idB;

    cipher[idA] = b;
    cipher[idB] = a;
  });

  for (let i = 0; i < textElements.length; i++) {
    const text = textElements[i].innerHTML;

    if (
      text.includes('J. Robert Oppenheimer') ||
      text.includes('Julius Robert Oppenheimer')
    ) {
      textElements[i].innerHTML = replaceAll(text, {
        'J. Robert Oppenheimer': 'Oppenheimer',
        'Julius Robert Oppenheimer': 'Oppenheimer',
      });
    }
  }

  for (let i = 0; i < textElements.length; i++) {
    const text = textElements[i].innerHTML;

    if (text.includes('Barbie') || text.includes('Oppenheimer')) {
      const firstPass = replaceAll(text, intermediaries);
      textElements[i].innerHTML = neutralize(replaceAll(firstPass, cipher));
    }
  }
}

swap();
