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
      latestEntries = merge(latestEntries, newEntry);
    }
  }
  printer.done();
}

// sort from oldest to newest
function byDate(a, b) {
  return b.date - a.date;
};

// add index to logEntry
function addIndex(logSource, index) {
  let logEntry = logSource.pop();
  return logEntry ? Object.assign({index}, logEntry) : false;
}

// merge new logEntry with latest logEntries
function merge(latestEntries, newEntry, start = 0, end = latestEntries.length - 1) {
  let newEntryArr = [newEntry];
  let merged = [];
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