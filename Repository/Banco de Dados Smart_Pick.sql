create database Smart_Pick;
use Smart_Pick;

create table raffle(

	id_raffle 	int auto_increment,
    name		varchar(50),
    constraint pk_raffle primary key (id_raffle)
    
 );
 
insert into raffle(name) values(1, 'Sorteio Test');

select * from raffle;

select name from raffle where id_raffle = "1";
  
drop table raffle;

create table category(

	id_category 	int auto_increment,
	title			varchar(50),
    id_raffle		int,
    
    constraint pk_category primary key(id_category),
    constraint fk_raflle foreign key(id_raffle) references raffle(id_raffle)
);

insert into category(title, id_raflle) values ('Categoria Teste', 1);

select * from category;

select title, id_category from category where id_raffle = 2;

drop table category;

create table items(
	id_item			int auto_increment,
    id_category		int,
    name			varchar(50),
    
    constraint pk_items primary key(id_item),
    constraint fk_category foreign key(id_category) references category(id_category)
    
);

insert into items(id_raffle, id_category, name) values(1, 1, '1 item teste');

insert into items(id_raffle, id_category, name) values(1, 1, '2 item teste');

select * from items;

select id_category, name from items where id_category = 1 or id_category = 2;

drop table items;

