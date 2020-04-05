const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

const getLinks = "select * from link_list";
const insertLink = "insert into link_list (uuid, link) values ($1, $2)";
const deleteLink = "delete link_list where uuid = $1";

module.exports = {
	query: (async function (text, params, callback){
		const res = await pool.query(text, params, callback);
		return res;
		await pool.end();
	}),
  getLinks,
  insertLink,
  deleteLink
}