-- get a certain group name based on group id....kind of useless tbh 
SELECT groups.group_name
FROM `groups`
INNER JOIN player_groups ON groups.id = player_groups.id
WHERE player_groups.id = 2;
-- team voldemort

SELECT first_name, last_name
FROM players
INNER JOIN player_groups ON player_groups.player_id = players.id
WHERE player_groups.group_id = 1; 

SELECT groups.id
FROM `groups`
WHERE group_name = 'Team Voldemort';
-- this returns the group id of team Voldemort

SELECT first_name, last_name
FROM players
INNER JOIN player_groups ON player_groups.player_id = players.id
WHERE player_groups.group_id IN
(SELECT groups.id
FROM `groups`
WHERE group_name = 'Team Voldemort');
-- this returns all players on team Voldemort (id 2)

SELECT groups.group_name, first_name, last_name
FROM players
INNER JOIN groups ON players.id = groups.player_id;

SELECT * FROM players;

SELECT * FROM games;

SELECT * FROM groups;