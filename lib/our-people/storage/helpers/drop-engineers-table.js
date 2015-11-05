

export default function (database) {

  return () => database.query(`drop table if exists engineers`);

}