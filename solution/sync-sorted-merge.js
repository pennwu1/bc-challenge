'use strict'

// Time Complexity: O(M * N), Space Complexity: O(N)
// N = # of log Sources, M = depth of log Source

module.exports = (logSources, printer) => {
  // store latest log Entries
  let latestEntries = logSources.map(addIndex).sort(byDate);

  // continue until no logEntries left
  while (latestEntries.length > 0) {
    let logEntry = latestEntries.pop();
    let currIndex = logEntry.index;
    printer.print(logEntry);

    // replace with new log Entry
    let newEntry = addIndex(logSources[currIndex], currIndex);
    if (newEntry) {
      // merge new log Entry into list
      latestEntries = merge(latestEntries, newEntry);
    }
  }
  printer.done();
}

// sort from newest (largest) to oldest (smallest)
const byDate = (a, b) => {
  return b.date - a.date;
};

// add index to logEntry
const addIndex = (logSource, index) => {
  let logEntry = logSource.pop();
  return logEntry ? Object.assign({index}, logEntry) : false;
}

// merge new logEntry with latest logEntries
const merge = (latestEntries, newEntry, start = 0, end = latestEntries.length - 1) => {
  const newEntryArr = [newEntry];
  const merged = [];
  let k = 0;
  let i = 0;
  let j = 0;
  while (i < latestEntries.length && j < newEntryArr.length) {
    if (latestEntries[i].date > newEntryArr[j].date) {
      merged[k++] = latestEntries[i++];
    } else {
      merged[k++] = newEntryArr[j++];
    }
  }
  while (i < latestEntries.length) {
    merged[k++] = latestEntries[i++];
  }
  while (j < newEntryArr.length) {
    merged[k++] = newEntryArr[j++];
  }
  return merged;
}