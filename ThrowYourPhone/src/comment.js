
const bSearch = (l, r, v, arr) => {
  if (l === r) {
    return l;
  }
  const mid = Math.ceil((l + r) / 2);
  if (v > arr[mid].v) {
    return bSearch(mid, r, v, arr);
  }
  return bSearch(l, mid - 1, v, arr);
};

const comments = [
  {
    v: 0.1,
    c: 'Less than 10cm, you sucks! ',
  },
  {
    v: 0.3,
    c: 'You need some more courage. ',
  },
  {
    v: 0.6,
    c: 'The first step to the addiction of throwing your phone. ',
  },
  {
    v: 1.2,
    c: 'Ordinary. ',
  },
  {
    v: 1.5,
    c: 'Fine, I see your effort. ',
  },
  {
    v: 15,
    c: 'You must be crazy',
  },
];

const getComment = height => comments[bSearch(0, comments.length - 1, height, comments)].c;

export { getComment as default };
