 create database Smart_Pick;
 
 use Smart_Pick;
 
 
 create table user(
	id_user 		int auto_increment,
    name_user 		varchar(100),
    email			varchar(50),
    password		varchar(20),
    
    constraint pk_user primary key (id_user)
    
 );
 
 insert into user(name_user, email,password ) values ('Lucas', 'testEmail@gmail.com', '12345');
 
 select * from user;
 
 drop table user;
 
 
 
 create table raffle(
	id_raflle 	int auto_increment,
    id_user		int,
    name		varchar(50),
    constraint pk_raffle primary key (id_raflle),
    constraint fk_user foreign key(id_user) references user(id_user)
    
 );
 
insert into raffle(id_user, name) values(1, 'Sorteio Test');

select * from raffle;
  
drop table raffle;



create table category(

	id_category 	int auto_increment,
	title			varchar(50),
    id_raflle		int,
    
    constraint pk_category primary key(id_category),
    constraint fk_raflle foreign key(id_raflle) references raffle(id_raflle)
);

insert into category(title, id_raflle) values ('Categoria Teste', 1);

select * from category;

drop table category;


create table items(
	id_item			int auto_increment,
    id_raffle		int,
    id_category		int,
    name			varchar(50),
    
    constraint pk_items primary key(id_item),
    constraint fk_category foreign key(id_category) references category(id_category),
    constraint fk_raffle foreign key(id_raffle) references raffle(id_raflle)
);

insert into items(id_raffle, id_category, name) values(1, 1, '1 item teste');

insert into items(id_raffle, id_category, name) values(1, 1, '2 item teste');

select * from items;

drop table items;

SELECT 
  raffle.name AS raffle,
  category.title AS category,
  items.name as items
FROM pedidos
INNER JOIN clientes ON pedidos.id_cliente = clientes.id_cliente
INNER JOIN produtos ON pedidos.id_produto = produtos.id_produto;

