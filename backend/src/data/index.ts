const stops = [
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'but',
  'by',
  'for',
  'if',
  'in',
  'into',
  'is',
  'it',
  'no',
  'not',
  'of',
  'on',
  'or',
  'such',
  'that',
  'the',
  'their',
  'then',
  'there',
  'these',
  'they',
  'this',
  'to',
  'was',
  'will',
  'with',
];

const transitions = [
  'about',
  'above all',
  'absolutely',
  'accordingly',
  'additionally',
  'after',
  'after all',
  'afterward',
  'afterwards',
  'again',
  'albeit',
  'all in all',
  'all of a sudden',
  'all things considered',
  'also',
  'although',
  'although this may be true',
  'altogether',
  'analogous to',
  'another',
  'another key point',
  'as',
  'as a matter of fact',
  'as a result',
  'as an illustration',
  'as can be seen',
  'as has been noted',
  'as I have noted',
  'as I have said',
  'as I have shown',
  'as long as',
  'as much as',
  'as shown above',
  'as soon as',
  'as well as',
  'at any rate',
  'at first',
  'at last',
  'at least',
  'at length',
  'at the present time',
  'at the same time',
  'at this instant',
  'at this point',
  'at this time',
  'balanced against',
  'basically',
  'be that as it may',
  'because',
  'before',
  'being that',
  'besides',
  'but',
  'by all means',
  'by and large',
  'by comparison',
  'by the same token',
  'by the time',
  'certainly',
  'chiefly',
  'comparatively',
  'compared to',
  'concurrently',
  'consequently',
  'contrarily',
  'conversely',
  'correspondingly',
  'coupled with',
  'definitely',
  'despite',
  'different from',
  'doubtedly',
  'due to',
  'during',
  'e.g.',
  'earlier',
  'emphatically',
  'equally',
  'equally important',
  'especially',
  'eternally',
  'even if',
  'even more',
  'even so',
  'even though',
  'eventually',
  'evidently',
  'explicitly',
  'expressively',
  'expressly',
  'extremely',
  'finally',
  'first',
  'first thing to remember',
  'firstly',
  'following',
  'for example',
  'for fear that',
  'for instance',
  'for one thing',
  'for that reason',
  'for the most part',
  'for the purpose of',
  'for the same reason',
  'for this purpose',
  'for this reason',
  'formerly',
  'forthwith',
  'fourth',
  'fourthly',
  'from time to time',
  'further',
  'furthermore',
  'generally',
  'given that',
  'given these points',
  'granted',
  'hence',
  'henceforth',
  'however',
  'i.e.',
  'identically',
  'immediately',
  'important to realize',
  'in a word',
  'in addition',
  'in another case',
  'in any case',
  'in any event',
  'in brief',
  'in case',
  'in conclusion',
  'in contrast',
  'in detail',
  'in due time',
  'in effect',
  'in either case',
  'in essence',
  'in fact',
  'in general',
  'in light of',
  'in like fashion',
  'in like manner',
  'in order that',
  'in order to',
  'in other words',
  'in particular',
  'in reality',
  'in short',
  'in similar fashion',
  'in spite of',
  'in sum',
  'in summary',
  'in that case',
  'in the event that',
  'in the final analysis',
  'in the first place',
  'in the fourth place',
  'in the hope that',
  'in the light of',
  'in the long run',
  'in the meantime',
  'in the same fashion',
  'in the same way',
  'in the second place',
  'in the third place',
  'in this case',
  'in this situation',
  'in time',
  'in truth',
  'in view of',
  'inasmuch as',
  'including',
  'indeed',
  'instantly',
  'instead',
  'last',
  'lastly',
  'later',
  'lest',
  'likewise',
  'markedly',
  'meanwhile',
  'moreover',
  'most compelling evidence',
  'most important',
  'must be remembered',
  'namely',
  'naturally',
  'nevertheless',
  'next',
  'nonetheless',
  'nor',
  'not only',
  'not to mention',
  'notably',
  'notwithstanding',
  'now',
  'now that',
  'obviously',
  'occasionally',
  'of course',
  'on account of',
  'on balance',
  'on condition that',
  'on one hand',
  'on the condition that',
  'on the contrary',
  'on the negative side',
  'on the other hand',
  'on the positive side',
  'on the whole',
  'on this occasion',
  'once',
  'once in a while',
  'only if',
  'or',
  'ordinarily',
  'otherwise',
  'overall',
  'owing to',
  'particularly',
  'point often overlooked',
  'positively',
  'presently',
  'previously',
  'prior to',
  'provided that',
  'rather',
  'regardless',
  'second',
  'secondly',
  'seeing that',
  'shortly',
  'significantly',
  'similarly',
  'simultaneously',
  'since',
  'so',
  'so as to',
  'so far',
  'so long as',
  'so that',
  'soon',
  'sooner or later',
  'specifically',
  'still',
  'straightaway',
  'subsequently',
  'such as',
  'summing up',
  'surely',
  'surprisingly',
  'take the case of',
  'than',
  'that is',
  'that is to say',
  'then',
  'then again',
  'thereafter',
  'therefore',
  'thereupon',
  'third',
  'thirdly',
  'this time',
  'though',
  'thus',
  'till',
  'to be sure',
  'to begin with',
  'to clarify',
  'to conclude',
  'to demonstrate',
  'to emphasize',
  'to enumerate',
  'to explain',
  'to illustrate',
  'to list',
  'to point out',
  'to put it another way',
  'to put it differently',
  'to repeat',
  'to rephrase it',
  'to say nothing of',
  'to sum up',
  'to summarize',
  'to that end',
  'to the end that',
  'to this end',
  'together with',
  'too',
  'truly',
  'ultimately',
  'undeniably',
  'under those circumstances',
  'undoubtedly',
  'uniquely',
  'unless',
  'unlike',
  'unquestionably',
  'until',
  'until now',
  'up against',
  'up to the present time',
  'usually',
  'vis a vis',
  "what's more",
  'when',
  'whenever',
  'where',
  'whereas',
  'while',
  'while it may be true',
  'while this may be true',
  'with attention to',
  'with the result that',
  'with this in mind',
  'with this intention',
  'with this purpose in mind',
  'without a doubt',
  'without delay',
  'without doubt',
  'without reservation',
];

const conjunctions = [
  'for',
  'and',
  'nor',
  'but',
  'or',
  'yet',
  'so',
  'after',
  'although',
  'as',
  'as if',
  'as long as',
  'as much as',
  'as soon as',
  'as far as',
  'as though',
  'by the time',
  'in as much as',
  'inasmuch',
  'in order to',
  'in order that',
  'in case',
  'lest',
  'though',
  'now that',
  'now since',
  'now when',
  'now',
  'even if',
  'even',
  'even though',
  'provided',
  'provide that',
  'if',
  'if then',
  'if when',
  'if only',
  'just as',
  'where',
  'wherever',
  'whereas',
  'where if',
  'whether',
  'since',
  'because',
  'whose',
  'whoever',
  'unless',
  'while',
  'before',
  'why',
  'so that',
  'until',
  'how',
  'since',
  'than',
  'till',
  'whenever',
  'supposing',
  'when',
  'or not',
  'what',
];

const pronouns = [
  'all',
  'another',
  'any',
  'anybody',
  'anyone',
  'anything',
  'as',
  'aught',
  'both',
  'each',
  'each other',
  'either',
  'enough',
  'everybody',
  'everyone',
  'everything',
  'few',
  'he',
  'her',
  'hers',
  'herself',
  'him',
  'himself',
  'his',
  'I',
  'idem',
  'it',
  'its',
  'itself',
  'many',
  'me',
  'mine',
  'most',
  'my',
  'myself',
  'naught',
  'neither',
  'no one',
  'nobody',
  'none',
  'nothing',
  'nought',
  'one',
  'one another',
  'other',
  'others',
  'ought',
  'our',
  'ours',
  'ourself',
  'ourselves',
  'several',
  'she',
  'some',
  'somebody',
  'someone',
  'something',
  'somewhat',
  'such',
  'suchlike',
  'that',
  'thee',
  'their',
  'theirs',
  'theirself',
  'theirselves',
  'them',
  'themself',
  'themselves',
  'there',
  'these',
  'they',
  'thine',
  'this',
  'those',
  'thou',
  'thy',
  'thyself',
  'us',
  'we',
  'what',
  'whatever',
  'whatnot',
  'whatsoever',
  'whence',
  'where',
  'whereby',
  'wherefrom',
  'wherein',
  'whereinto',
  'whereof',
  'whereon',
  'wheresoever',
  'whereto',
  'whereunto',
  'wherever',
  'wherewith',
  'wherewithal',
  'whether',
  'which',
  'whichever',
  'whichsoever',
  'who',
  'whoever',
  'whom',
  'whomever',
  'whomso',
  'whomsoever',
  'whose',
  'whosesoever',
  'whosever',
  'whoso',
  'whosoever',
  'ye',
  'yon',
  'yonder',
  'you',
  'you',
  'your',
  'yours',
  'yourself',
  'yourselves',
];

export const wordsToFilter = [
  ...stops,
  ...transitions,
  ...conjunctions,
  ...pronouns,
];
