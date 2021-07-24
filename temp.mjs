import sqlite3 from 'sqlite3';
const Map = {
  "k": {
    "base": "40",
    "lower": "90"
  },
  "kh": {
    "base": "41",
    "lower": "91"
  },
  "g": {
    "base": "42",
    "lower": "92"
  },
  "ng": {
    "base": "44",
    "lower": "94"
  },
  "c": {
    "base": "45",
    "lower": "95"
  },
  "ch": {
    "base": "46",
    "lower": "96"
  },
  "j": {
    "base": "47",
    "lower": "97"
  },
  "ny": {
    "base": "49",
    "lower": "99"
  },
  "t": {
    "base": "4f",
    "lower": "9f"
  },
  "th": {
    "base": "50",
    "lower": "a0"
  },
  "d": {
    "base": "51",
    "lower": "a1"
  },
  "n": {
    "base": "53",
    "lower": "a3"
  },
  "p": {
    "base": "54",
    "lower": "a4"
  },
  "ph": {
    "base": "55",
    "lower": "a5"
  },
  "b": {
    "base": "56",
    "lower": "a6"
  },
  "m": {
    "base": "58",
    "lower": "a8"
  },
  "ts": {
    "base": "59",
    "lower": "a9"
  },
  "tsh": {
    "base": "5a",
    "lower": "aa"
  },
  "dz": {
    "base": "5b",
    "lower": "ab"
  },
  "w": {
    "base": "5d",
    "lower": "ad"
  },
  "zh": {
    "base": "5e",
    "lower": "ae"
  },
  "z": {
    "base": "5f",
    "lower": "af"
  },
  "'": {
    "base": "60",
    "lower": "b0"
  },
  "y": {
    "base": "61",
    "lower": "b1"
  },
  "r": {
    "base": "62",
    "lower": "b2"
  },
  "l": {
    "base": "63",
    "lower": "b3"
  },
  "sh": {
    "base": "64",
    "lower": "b4"
  },
  "s": {
    "base": "66",
    "lower": "b6"
  },
  "h": {
    "base": "67",
    "lower": "b7"
  },
  "a": {
    "base": "68",
    "lower": ""
  },
  "e": {
    "base": "7a",
    "lower": ""
  },
  "i": {
    "base": "72",
    "lower": ""
  },
  "u": {
    "base": "74",
    "lower": ""
  },
  "o": {
    "base": "7c",
    "lower": ""
  },
};

class Tibetan {
  constructor(string) {
    this.front = null
    this.up = null;
    this.main = null;
    this.down = null;
    this.vowel = null;
    this.back = null;
    this.last = null;
    this.valid = true;
    this.source = string;

    if (string) {
      this.parse(string);
    }
  }

  parse(s) {
    const r = s.split(' ')[0].trim();

    if(['a', 'e', 'i', 'o', 'u'].includes(r)) {
      this.main = '';
      this.vowel = r;
      return (
        String.fromCharCode(Number("0xf" + Map['a'].base)) +
        (r === 'a' ? '' : String.fromCharCode(Number("0xf" + Map[r].base)))
      );
    } else {
      const re = /(g\.|d\.|b\.|m\.|'\.){0,1}(r|l|s(?!h)){0,1}(kh|k|g|ng|ch|c|j|ny|tsh|th|t|dz|n|ph|p|b|m|ts|d|w|zh|z|'|y|r|l|sh|s|h)(y|l|r|w){0,1}(a|e|i|o|u)(ng|g|d|n|b|m|'|r|l|s){0,1}(d|s){0,1}/;
      if (!re.test(s)) {
        this.valid = false;
        return '';
      }
      this.valid = true;
      const result = re.exec(r);
      if(result) {
        const [_, front, up, main, down, vowel, back, last] = result;
        this.front = front ? front[0] : null;
        this.up = up;
        this.main = main;
        this.down = down;
        this.vowel = vowel;
        this.back = back;
        this.last = last;

        return this.toString();
      }
    }
  }

  toString() {
    if (!this.valid || this.source === '') return '';
    const temp = [this.up, this.main, this.down]
      .filter(x => x)
      .reduce((acc, curr, idx) => acc += (curr in Map) ? String.fromCharCode(Number("0xf" + Map[curr][idx ? 'lower' : 'base'])) : '', '');
    return (
      (this.front ? String.fromCharCode(Number("0xf" + Map[this.front].base)) : '') +
      temp +
      (this.vowel === 'a' ? '' : String.fromCharCode(Number("0xf" + Map[this.vowel].base))) +
      (this.back ? String.fromCharCode(Number("0xf" + Map[this.back].base)) : '') +
      (this.last ? String.fromCharCode(Number("0xf" + Map[this.last].base)) : '')
    );
  }

}

const parser = (s) => {
  const r = s.split(' ').map(x => x.trim());
  const arr = r.map(x => {
    return x.split('-').map(y => new Tibetan(y).toString()).join('')
  });
  return arr.join(String.fromCharCode(0xf0b));
}

const sqlite = sqlite3.verbose();
const dbPath = "C:\\Users\\warre\\OneDrive\\Documents\\voc.db"
const database = new sqlite.Database(dbPath, (err) => {
  if (err) console.error('Database opening error: ', err);
});

const update = (id, vocab) => new Promise((resolve) => {
  database.exec(`
    update vocabulary set vocabulary = "${vocab}" where id = ${id}
    `, (err, rows) => {
      if(err) console.log(id, vocab);
      else resolve(rows);
  });
});

database.all(`
  select * from vocabulary
`, (err, rows) => {
  if (err) return console.log(err);
  rows.forEach(async (item, i) => {
    console.log(item.id, parser(item.vocabulary));
    await update(item.id, parser(item.vocabulary));
  });

});
