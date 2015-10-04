export const SEARCH = 'SEARCH';

function search (term) {
  return {
    type: SEARCH,
    term: term
  };
}