create table movies (
  id serial primary key,
  title varchar,
  rating integer
);

insert into movies (title, rating)
values ('Master & Commander', 10), ('TMNT', 5), ('Avengers', 8);
