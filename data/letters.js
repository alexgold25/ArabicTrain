/*
MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

export const ARABIC_LETTERS = [
  {
    base: "ا",
    name_ar: "ألف",
    name_en: "alif",
    translit: "a",
    joinsLeft: false,
    joinsRight: true,
    forms: { isolated: "\uFE8D", initial: "\uFE8D", medial: "\uFE8D", final: "\uFE8E" },
    sample_words: [{ ar: "ابن", en: "son" }]
  },
  {
    base: "ب",
    name_ar: "باء",
    name_en: "baa",
    translit: "b",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFE8F", initial: "\uFE91", medial: "\uFE92", final: "\uFE90" },
    sample_words: [{ ar: "بيت", en: "house" }]
  },
  {
    base: "ت",
    name_ar: "تاء",
    name_en: "taa",
    translit: "t",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFE95", initial: "\uFE97", medial: "\uFE98", final: "\uFE96" },
    sample_words: [{ ar: "تاج", en: "crown" }]
  },
  {
    base: "ث",
    name_ar: "ثاء",
    name_en: "thaa",
    translit: "th",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFE99", initial: "\uFE9B", medial: "\uFE9C", final: "\uFE9A" },
    sample_words: [{ ar: "ثوب", en: "garment" }]
  },
  {
    base: "ج",
    name_ar: "جيم",
    name_en: "jeem",
    translit: "j",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFE9D", initial: "\uFE9F", medial: "\uFEA0", final: "\uFE9E" },
    sample_words: [{ ar: "جمل", en: "camel" }]
  },
  {
    base: "ح",
    name_ar: "حاء",
    name_en: "haa",
    translit: "h",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFEA1", initial: "\uFEA3", medial: "\uFEA4", final: "\uFEA2" },
    sample_words: [{ ar: "حب", en: "love" }]
  },
  {
    base: "خ",
    name_ar: "خاء",
    name_en: "khaa",
    translit: "kh",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFEA5", initial: "\uFEA7", medial: "\uFEA8", final: "\uFEA6" },
    sample_words: [{ ar: "خبز", en: "bread" }]
  },
  {
    base: "د",
    name_ar: "دال",
    name_en: "dal",
    translit: "d",
    joinsLeft: false,
    joinsRight: true,
    forms: { isolated: "\uFEA9", initial: "\uFEA9", medial: "\uFEA9", final: "\uFEAA" },
    sample_words: [{ ar: "دب", en: "bear" }]
  },
  {
    base: "ذ",
    name_ar: "ذال",
    name_en: "dhal",
    translit: "dh",
    joinsLeft: false,
    joinsRight: true,
    forms: { isolated: "\uFEAB", initial: "\uFEAB", medial: "\uFEAB", final: "\uFEAC" },
    sample_words: [{ ar: "ذيل", en: "tail" }]
  },
  {
    base: "ر",
    name_ar: "راء",
    name_en: "ra",
    translit: "r",
    joinsLeft: false,
    joinsRight: true,
    forms: { isolated: "\uFEAD", initial: "\uFEAD", medial: "\uFEAD", final: "\uFEAE" },
    sample_words: [{ ar: "رأس", en: "head" }]
  },
  {
    base: "ز",
    name_ar: "زاي",
    name_en: "zay",
    translit: "z",
    joinsLeft: false,
    joinsRight: true,
    forms: { isolated: "\uFEAF", initial: "\uFEAF", medial: "\uFEAF", final: "\uFEB0" },
    sample_words: [{ ar: "زيت", en: "oil" }]
  },
  {
    base: "س",
    name_ar: "سين",
    name_en: "seen",
    translit: "s",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFEB1", initial: "\uFEB3", medial: "\uFEB4", final: "\uFEB2" },
    sample_words: [{ ar: "سماء", en: "sky" }]
  },
  {
    base: "ش",
    name_ar: "شين",
    name_en: "sheen",
    translit: "sh",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFEB5", initial: "\uFEB7", medial: "\uFEB8", final: "\uFEB6" },
    sample_words: [{ ar: "شمس", en: "sun" }]
  },
  {
    base: "ص",
    name_ar: "صاد",
    name_en: "saad",
    translit: "s",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFEB9", initial: "\uFEBB", medial: "\uFEBC", final: "\uFEBA" },
    sample_words: [{ ar: "صبر", en: "patience" }]
  },
  {
    base: "ض",
    name_ar: "ضاد",
    name_en: "daad",
    translit: "d",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFEBD", initial: "\uFEBF", medial: "\uFEC0", final: "\uFEBE" },
    sample_words: [{ ar: "ضوء", en: "light" }]
  },
  {
    base: "ط",
    name_ar: "طاء",
    name_en: "taa",
    translit: "t",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFEC1", initial: "\uFEC3", medial: "\uFEC4", final: "\uFEC2" },
    sample_words: [{ ar: "طين", en: "clay" }]
  },
  {
    base: "ظ",
    name_ar: "ظاء",
    name_en: "thaa",
    translit: "dh",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFEC5", initial: "\uFEC7", medial: "\uFEC8", final: "\uFEC6" },
    sample_words: [{ ar: "ظرف", en: "envelope" }]
  },
  {
    base: "ع",
    name_ar: "عين",
    name_en: "ain",
    translit: "\u02bf",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFEC9", initial: "\uFECB", medial: "\uFECC", final: "\uFECA" },
    sample_words: [{ ar: "عين", en: "eye" }]
  },
  {
    base: "غ",
    name_ar: "غين",
    name_en: "ghain",
    translit: "gh",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFECD", initial: "\uFECF", medial: "\uFED0", final: "\uFECE" },
    sample_words: [{ ar: "غيم", en: "clouds" }]
  },
  {
    base: "ف",
    name_ar: "فاء",
    name_en: "fa",
    translit: "f",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFED1", initial: "\uFED3", medial: "\uFED4", final: "\uFED2" },
    sample_words: [{ ar: "فم", en: "mouth" }]
  },
  {
    base: "ق",
    name_ar: "قاف",
    name_en: "qaf",
    translit: "q",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFED5", initial: "\uFED7", medial: "\uFED8", final: "\uFED6" },
    sample_words: [{ ar: "قمر", en: "moon" }]
  },
  {
    base: "ك",
    name_ar: "كاف",
    name_en: "kaf",
    translit: "k",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFED9", initial: "\uFEDB", medial: "\uFEDC", final: "\uFEDA" },
    sample_words: [{ ar: "كتاب", en: "book" }]
  },
  {
    base: "ل",
    name_ar: "لام",
    name_en: "lam",
    translit: "l",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFEDD", initial: "\uFEDF", medial: "\uFEE0", final: "\uFEDE" },
    sample_words: [{ ar: "لبن", en: "milk" }]
  },
  {
    base: "م",
    name_ar: "ميم",
    name_en: "meem",
    translit: "m",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFEE1", initial: "\uFEE3", medial: "\uFEE4", final: "\uFEE2" },
    sample_words: [{ ar: "ماء", en: "water" }]
  },
  {
    base: "ن",
    name_ar: "نون",
    name_en: "noon",
    translit: "n",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFEE5", initial: "\uFEE7", medial: "\uFEE8", final: "\uFEE6" },
    sample_words: [{ ar: "نور", en: "light" }]
  },
  {
    base: "ه",
    name_ar: "هاء",
    name_en: "ha",
    translit: "h",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFEE9", initial: "\uFEEB", medial: "\uFEEC", final: "\uFEEA" },
    sample_words: [{ ar: "هاتف", en: "phone" }]
  },
  {
    base: "و",
    name_ar: "واو",
    name_en: "waw",
    translit: "w",
    joinsLeft: false,
    joinsRight: true,
    forms: { isolated: "\uFEED", initial: "\uFEED", medial: "\uFEED", final: "\uFEEE" },
    sample_words: [{ ar: "ورد", en: "rose" }]
  },
  {
    base: "ي",
    name_ar: "ياء",
    name_en: "ya",
    translit: "y",
    joinsLeft: true,
    joinsRight: true,
    forms: { isolated: "\uFEF1", initial: "\uFEF3", medial: "\uFEF4", final: "\uFEF2" },
    sample_words: [{ ar: "يد", en: "hand" }]
  }
];

export const FORM_MAP = ARABIC_LETTERS.reduce((acc, l) => {
  acc[l.base] = l.forms;
  return acc;
}, {});
