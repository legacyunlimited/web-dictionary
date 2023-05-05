const data = [
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
];

// Group data by partOfSpeech
const groupedData = data.reduce((acc, item) => {
	if (acc[item.partOfSpeech]) {
		acc[item.partOfSpeech] = {
			...acc[item.partOfSpeech],
			definitions: [...acc[item.partOfSpeech].definitions, ...item.definitions],
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

Object.keys(groupedData).forEach((partOfSpeech) => {
	const item = groupedData[partOfSpeech];
	html += `<h2>${partOfSpeech}</h2>`;

	item.definitions.forEach((definition, index) => {
		html += `<p><strong>Definition ${index + 1}:</strong> ${
			definition.definition
		}</p>`;
		if (definition.synonyms && definition.synonyms.length > 0) {
			html += `<p><strong>Synonyms:</strong> ${definition.synonyms.join(
				', '
			)}</p>`;
		}
		if (definition.antonyms && definition.antonyms.length > 0) {
			html += `<p><strong>Antonyms:</strong> ${definition.antonyms.join(
				', '
			)}</p>`;
		}
		if (definition.example) {
			html += `<p><strong>Example:</strong> ${definition.example}</p>`;
		}
	});

	if (item.synonyms && item.synonyms.length > 0) {
		html += `<p><strong>Overall Synonyms:</strong> ${item.synonyms.join(
			', '
		)}</p>`;
	}
	if (item.antonyms && item.antonyms.length > 0) {
		html += `<p><strong>Overall Antonyms:</strong> ${item.antonyms.join(
			', '
		)}</p>`;
	}
});

// Now, you can insert the 'html' string into your desired DOM element
document.getElementById('test').innerHTML = html;
