 create database Smart_Pick;
 
 use Smart_Pick;
 
 create table user(
	id_user 		int auto_increment,
    name_user 		varchar(100),
    email			varchar(50),
    password		varchar(20),
    
    constraint pk_user primary key (id_user)
    
 );
 
 drop table user;
 
 create table raffle(
	id_raflle 	int auto_increment,
    id_user		int,
    name		varchar(50),
    
    constraint pk_raffle primary key (id_raflle),
    constraint fk_user foreign key(id_user) references user(id_user)
    
 );
 
 drop table raffle;
 
create table category(

	id_category 	int auto_increment,
	title			varchar(50),
    id_raflle		int,
    
    constraint pk_category primary key(id_category),
    constraint fk_raflle foreign key(id_raflle) references raffle(id_raflle)
);

drop table category;

create table items(
	id_item			int auto_increment,
    id_category		int,
    name			varchar(50),
    
    constraint pk_items primary key(id_item),
    constraint fk_category foreign key(id_category) references category(id_category)
);