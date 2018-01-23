export default (items, generator) => items.reduce((p, i, index) => (index > 1 ? p : generator(p)) + generator(i))
