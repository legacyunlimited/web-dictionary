// let searchForm = document.getElementByTagName('form');
let searchForm = document.querySelector('.search-form');
const searchInputEl = document.getElementById('word-search');
const wordEl = document.querySelector('.word');
const playButtonEl = document.querySelector('.play-button');
const nounContainer = document.querySelector('.noun__meaning');
const synonymsList = document.querySelector('.synonyms__list');
const wordPronouceEl = document.querySelector('.word__pronounce');

const PARTS_OF_SPEECH_CONTAINER = document.querySelector('.parts-of-speech');
const playButtonContainerEl = document.querySelector('.play-button-container');
const toggleTheme = document.querySelector('.toggle-theme');

// The seardch Form event listener

searchForm.addEventListener('submit', async function (event) {
	PARTS_OF_SPEECH_CONTAINER.innerHTML = `<h2 style="text-align:center;">Searching...</h2>`;
	event.preventDefault();
	const value = searchInputEl.value;

	const searchUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;

	const resopnse = await fetch(searchUrl);
	const jsonResponse = await resopnse.json();

	// console.log(jsonResponse);

	const content = jsonResponse[0];

	PARTS_OF_SPEECH_CONTAINER.innerHTML = '';
	playButtonContainerEl.classList.remove('hide');
	composeHTML(content);
});

// compose HTML

function composeHTML(content) {
	wordEl.innerText = content.word;

	// phonetic logic
	const { phonetics } = content;
	let foundPhonetic = null;

	if (phonetics.length > 0) {
		// find the phonetics object with audio
		foundPhonetic = phonetics.find((phonetic) =>
			phonetic.audio && phonetic.text ? phonetic : null
		);
		if (foundPhonetic) {
			// compose audio the text
			wordPronouceEl.innerText = foundPhonetic.text;
		}
	} else {
		// return;
		console.log('no audio and text found');
	}
	playButtonEl.addEventListener('click', function (e) {
		if (foundPhonetic) {
			playAudio(foundPhonetic.audio);
		} else {
			console.log('no audio and text found');
		}
	});

	// parts of speech compoistion

	const { meanings } = content;

	// Group data by partOfSpeech
	const groupedMeanings = meanings.reduce((acc, item) => {
		if (acc[item.partOfSpeech]) {
			acc[item.partOfSpeech] = {
				...acc[item.partOfSpeech],
				definitions: [
					...acc[item.partOfSpeech].definitions,
					...item.definitions,
				],
				synonyms: [...acc[item.partOfSpeech].synonyms, ...item.synonyms],
				antonyms: [...acc[item.partOfSpeech].antonyms, ...item.antonyms],
			};
		} else {
			acc[item.partOfSpeech] = item;
		}
		return acc;
	}, {});

	// Create your HTML
	let html = '';

	Object.keys(groupedMeanings).forEach((partOfSpeech) => {
		const item = groupedMeanings[partOfSpeech];
		html += `<div class="part-of-speech__iner">
    <div class="parts-speech__content container">
      <div class="flex gap-sm ${partOfSpeech}">
        <h3 class="noun__title title">${partOfSpeech}</h3>
        <div class="bar"></div>
      </div>
      <div class="noun__meaning">
        <h3 class="meaning__title muted">Meaning</h3>
        <ul class="noun-meanings meaning__list">`;

		item.definitions.forEach((definition) => {
			html += `<li class="verb__meanig-item">${
				definition.definition
			}<span class="verb__meaning-help">"${
				definition.example ? definition.example : ''
			}"</span></li>`;
		});

		html += `</ul>
      </div>
    </div>
    <div class="synonyms flex gap-md container">
      <h3 class="synonyms__title">Synonyms</h3>
      <p class="synonyms__list">${item.synonyms.join(' ')}</p>
    </div>
  </div>`;
	});

	PARTS_OF_SPEECH_CONTAINER.innerHTML = html;
}

// compose Audio Player

function playAudio(url) {
	const audio = new Audio(url);
	audio.play(url);
}

// clear existing data
function clear() {
	nounContainer.innerHTML = '';
}

// theme functionality
toggleTheme.addEventListener('change', themeToggler);

function themeToggler(e) {
	e.target.checked
		? document.body.classList.add('dark')
		: document.body.classList.remove('dark');
}

const HappyObject = {
	word: 'happy',
	phonetics: [
		{
			audio:
				'https://api.dictionaryapi.dev/media/pronunciations/en/happy-au.mp3',
			sourceUrl: 'https://commons.wikimedia.org/w/index.php?curid=75797241',
			license: {
				name: 'BY-SA 4.0',
				url: 'https://creativecommons.org/licenses/by-sa/4.0',
			},
		},
		{
			text: '/ˈhæpiː/',
			audio:
				'https://api.dictionaryapi.dev/media/pronunciations/en/happy-uk.mp3',
			sourceUrl: 'https://commons.wikimedia.org/w/index.php?curid=9021973',
			license: {
				name: 'BY 3.0 US',
				url: 'https://creativecommons.org/licenses/by/3.0/us',
			},
		},
		{
			text: '/ˈhæpi/',
			audio:
				'https://api.dictionaryapi.dev/media/pronunciations/en/happy-us.mp3',
			sourceUrl: 'https://commons.wikimedia.org/w/index.php?curid=545617',
			license: {
				name: 'BY-SA 3.0',
				url: 'https://creativecommons.org/licenses/by-sa/3.0',
			},
		},
	],
	meanings: [
		{
			partOfSpeech: 'noun',
			definitions: [
				{
					definition: 'A happy event, thing, person, etc.',
					synonyms: [],
					antonyms: [],
				},
			],
			synonyms: [],
			antonyms: [],
		},
		{
			partOfSpeech: 'noun',
			definitions: [
				{
					definition: 'Preceded by the: happy people as a group.',
					synonyms: [],
					antonyms: [],
				},
			],
			synonyms: [],
			antonyms: [],
		},
		{
			partOfSpeech: 'verb',
			definitions: [
				{
					definition:
						'Often followed by up: to become happy; to brighten up, to cheer up.',
					synonyms: [],
					antonyms: [],
				},
				{
					definition:
						'Often followed by up: to make happy; to brighten, to cheer, to enliven.',
					synonyms: [],
					antonyms: [],
				},
			],
			synonyms: ['happify'],
			antonyms: [],
		},
		{
			partOfSpeech: 'adjective',
			definitions: [
				{
					definition:
						'Having a feeling arising from a consciousness of well-being or of enjoyment; enjoying good of any kind, such as comfort, peace, or tranquillity; blissful, contented, joyous.',
					synonyms: [],
					antonyms: [],
					example: 'Music makes me feel happy.',
				},
				{
					definition:
						'Experiencing the effect of favourable fortune; favored by fortune or luck; fortunate, lucky, propitious.',
					synonyms: [],
					antonyms: [],
				},
				{
					definition:
						'Content, satisfied (with or to do something); having no objection (to something).',
					synonyms: [],
					antonyms: [],
					example: 'Are you happy to pay me back by the end of the week?',
				},
				{
					definition: '(Of acts, speech, etc.) Appropriate, apt, felicitous.',
					synonyms: [],
					antonyms: [],
					example: 'a happy coincidence',
				},
				{
					definition: '(in combination) Favoring or inclined to use.',
					synonyms: [],
					antonyms: [],
					example: 'slaphappy, trigger-happy',
				},
				{
					definition:
						'(of people, often followed by "at" or "in") Dexterous, ready, skilful.',
					synonyms: [],
					antonyms: [],
				},
			],
			synonyms: [
				'cheerful',
				'content',
				'delighted',
				'elated',
				'exultant',
				'glad',
				'joyful',
				'jubilant',
				'merry',
				'orgasmic',
				'fortunate',
				'lucky',
				'propitious',
			],
			antonyms: [
				'inappropriate',
				'inapt',
				'unfelicitous',
				'disenchanted',
				'dissatisfied',
				'blue',
				'depressed',
				'down',
				'miserable',
				'moody',
				'morose',
				'sad',
				'unhappy',
				'unfortunate',
				'unlucky',
				'unpropitious',
			],
		},
	],
	license: {
		name: 'CC BY-SA 3.0',
		url: 'https://creativecommons.org/licenses/by-sa/3.0',
	},
	sourceUrls: ['https://en.wiktionary.org/wiki/happy'],
};
