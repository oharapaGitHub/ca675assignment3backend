drop table if exists clickdata;
create table clickdata (
  wikipage text primary key,
  from text not null,
  to text not null
);