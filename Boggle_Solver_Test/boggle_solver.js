/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */


exports.findAllSolutions = function(grid, dictionary) {
  let solutions = [];

  // Check if the input parameters are valid (return empty grid [] if incorrect)


  // Check if any empty input
  if (grid == null || dictionary == null) {
    return solutions;
  }


  // Check if NXN
  const N = grid.length;
  for (let i = 0; i < N; i++) {
    if (grid[i].length != N) {
      return solutions;
    }
  }


  // Convert input data into the same case to keep on same page
  convertToLowerCase(grid, dictionary);

  // Check if Grid is valid at the point its in
  if (!gridValidCheck(grid)) {
    return solutions;
  }

  // Setup all data structures (we are using hashmaps and sets and dicts)
  const solutionSet = new Set();
  const hash = createHashMap(dictionary);

  // Iterate over the NXN grid and find all words that begin with the grid[y][x]
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const word = '';
      const visited = new Array(N).
          fill(false).map(() => new Array(N).fill(false));
      findWords(word, y, x, grid, visited, hash, solutionSet);
    }
  }
  solutions = Array.from(solutionSet);

  return solutions;
};

// function used to turn all cap letters to uppercase using this function
convertToLowerCase = function(grid, dict) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j <grid[i].length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
    }
  }

  for (let i = 0; i < dict.length; i++) {
    dict[i] = dict[i].toLowerCase();
  }
};

// call find words and set if checks for the boggle solver
findWords = function(word, y, x, grid, visited, hash, solutionSet) {
  const adjLocation = [[-1, -1],
    [-1, 0], [-1, 1],
    [0, 1], [1, 1],
    [1, 0], [1, -1],
    [0, -1]];

  if (y < 0 || x < 0) {
    return;
  }
  if ( y >= grid.length || x >= grid.length) {
    return;
  }
  if (visited[y][x] == true) {
    return;
  }


  // append the grid to the word
  word += grid[y][x]; // word = word + grid

  // check if word is a prefix OR/AND word
  if (isPrefix(word, hash)) {
    visited[y][x] = true;

    // test if word is valid and if it is add the word to solutionset
    if (isWord(word, hash)) {
      if (word.length >= 3) {
        solutionSet.add(word);
      }
    }

    for (let i = 0; i < 8; i++) {
      findWords(word, y + adjLocation[i][0], x +
      adjLocation[i][1], grid, visited, hash, solutionSet);
    }
  }

  visited[y][x] = false;
};


// hashmap created for the dictionary function
createHashMap = function(dictionary) {
  const dict = {};
  for (let i = 0; i < dictionary.length; i++) {
    dict[dictionary[i]] = 1;
    let wordlength = dictionary[i].length;
    let str = dictionary[i];
    for (let j = wordlength; wordlength > 1; wordlength--) {
      str = str.substr(0, j-1);
      if (str in dict) {
        if (str == 1) {
          dict[str] = 1;
        }
      } else {
        dict[str] = 0;
      }
    }
  }
  return dict;
};

// call the prefix and word functions and return hash once defined
isPrefix = function(word, hash) {
  return hash[word] != undefined;
};

isWord = function(word, hash) {
  return hash[word] == 1;
};

/*
  Will check if the grid is valid
*/
gridValidCheck = function(grid) {
  regex = /(st|qu)|[a-prt-z]/;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!grid[i][j].match(regex)) {
        return false;
      }
    }
  }
  return true;
};

const grid = [['T', 'W', 'Y', 'R'],
  ['E', 'N', 'P', 'H'],
  ['G', 'Z', 'Qu', 'R'],
  ['St', 'N', 'T', 'A']];
const dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
  'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
  'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];

console.log(exports.findAllSolutions(grid, dictionary));

// console log to check my solution and confirm it runs

