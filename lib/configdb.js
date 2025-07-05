const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'botdata.db'));

// Ensure table exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`).run();

module.exports = {
  getConfig: (key) => {
    const row = db.prepare("SELECT value FROM config WHERE key = ?").get(key);
    return row ? row.value : null;
  },
  setConfig: (key, value) => {
    db.prepare("INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)").run(key, value);
  },
  getAllConfig: () => {
    const rows = db.prepare("SELECT * FROM config").all();
    return Object.fromEntries(rows.map(row => [row.key, row.value]));
  }
};
