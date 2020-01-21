DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS weapon_types;
DROP TABLE IF EXISTS factions;

CREATE TABLE weapon_types
(
    id BIGSERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL
);

CREATE TABLE factions
(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    thumbnail_url TEXT NOT NULL,
    group_ability VARCHAR(150) NOT NULL,
    story TEXT NOT NULL
);

create table characters
(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    weaponTypeId INT REFERENCES weapon_types(id),
    quote TEXT NOT NULL,
    factionId INT REFERENCES factions(id) NOT NULL,
    story TEXT DEFAULT ''
);

INSERT INTO weapon_types
    (type)
VALUES
    ('slash'),
    ('punch'),
    ('throw'),
    ('shoot'),
    ('hack'),
    ('stomp');

INSERT INTO factions
    (name, thumbnail_url, group_ability, story)
VALUES
    ('Church of Main',
        'sjdlaskjdasljd',
        'Concentrates on manipulating the effects of drugs and tech',
        'The church of main are fervient believers in that reality is a computer program designed by
their deity the main. Acolytes of this religion are usually introduced very early in life, and slowly
technologically enhanced until they are 100% machine'),

    ('Brotherhood',
        'djalkdjsalkdjsalkjdaslk',
        'Strengthen freelancers of the same group.',
        'The brotherhood was born after the death of the king when all the distinct illicit groups operating in NY
and other parts of the world united under on single banner. Altought it came with a lot of conflicts
and bickering, the brotherhood believes every member is a integral part of a family and that a family 
united has nothing to fear'),

    ('Clitz',
        'sldjasldjalsdjasljdaslkjdlaskjd',
        'Concentrates on manipulating the setting. 
Make come with side effects to freelancers around',
        'After the king death, all the people in the 1% with assets in the country became worried of
what it may happen to their properties and united as on single voice, the Clitz a group pationately
in love with money and the idea of Laissez-faire'
),
    ('Children of Anarch',
        'sdsajdlasjdaslkjdlkasjdlkasjls',
        'Their effects focus on buffing allies or weaking enemies',
        'The death of the king didn''t meant college students where good and free to go. Filled with debts, 
college students with no rich families joined together to create the children of Anarch. A political
party that look to equalize things for everybody.'
),
    ('Crows',
        'dsasdasdasdasdasdas',
        'They usually modify other''s freelancers',
        'With the crow as their symbol of freedom. The Crows only political idea is to issue government control
over things that regards the people and to help everybody get what they need without having to be destroyed
by the wealthy');


insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Berky', 3, 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', 4, 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Silva', 1, 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 3, 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Genni', 2, 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 4, 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Bondie', 1, 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', 4, 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Francisco', 2, 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 1, null);
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Geraldine', 6, 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 1, 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Melania', 2, 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 5, 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Jared', 1, 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 5, null);
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Sterling', 2, 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 4, null);
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Andrei', 4, 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 5, 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Katalin', 3, 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 2, 'Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Adah', 6, 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 5, 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Hetti', 4, 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 4, null);
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Aaron', 6, 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 5, 'In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Quintina', 3, 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 1, null);
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Sonia', 2, 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 5, null);
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Aldric', 2, 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', 4, 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Mart', 1, 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 3, 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Carey', 5, 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 2, 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Melba', 6, 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', 4, null);
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Judye', 6, 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 2, null);
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Enid', 1, 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 4, null);
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Anabel', 2, 'In congue. Etiam justo. Etiam pretium iaculis justo.', 4, 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.

Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Yoshi', 3, 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 1, 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Cart', 6, 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 4, 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Roderic', 5, 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 2, 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Farleigh', 2, 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 3, 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Emmott', 1, 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 5, 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Lotti', 5, 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 4, 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Meaghan', 5, 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 2, 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Eugenius', 4, 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 2, 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Standford', 5, 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 5, 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.

In congue. Etiam justo. Etiam pretium iaculis justo.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Bret', 3, 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 4, 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Angela', 1, 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', 1, 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Rand', 3, 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 1, null);
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Karla', 5, 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 2, 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Christyna', 1, 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 2, 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.

Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Georgeta', 1, 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 2, 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.');
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Zitella', 3, 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 2, null);
insert into characters
    (name, weaponTypeId, quote, factionId, story)
values
    ('Agnese', 1, 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 5, 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.

Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.');

