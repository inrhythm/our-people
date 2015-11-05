

export default function (database) {

  return () => database.query(`create table engineers(
    id integer primary key,
    name text,
    phone text,
    gravatar text,
    twitter text,
    github text,
    linkedin text,
    updatedAt text,
    createdAt text
  )`);

}