const textElements = document.querySelectorAll(
  'h1, h2, h3, h4, h5, p, li, td, caption, span, a, em, div, b'
);

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

const pairs = [
  ['Barbie', 'Oppenheimer'],
  ['Greta Gerwig', 'Christopher Nolan'],
  ['Greta', 'Christopher'],
  ['Gerwig', 'Nolan'],
  ['Margot Robbie', 'Cillian Murphy'],
  ['Robbie', 'Murphy'],
  ['physicist', 'doll'],
];

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

  textElements[i].innerHTML = replaceAll(text, {
    'J. Robert Oppenheimer': 'Oppenheimer',
    'Julius Robert Oppenheimer': 'Oppenheimer',
  });
}

for (let i = 0; i < textElements.length; i++) {
  const text = textElements[i].innerHTML;

  const firstPass = replaceAll(text, intermediaries);
  textElements[i].innerHTML = replaceAll(firstPass, cipher);
}
