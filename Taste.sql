CREATE TABLE `Subscribtion` (
  `user_id` integer,
  `subscriber_id` integer
);

CREATE TABLE `User` (
  `id` integer PRIMARY KEY,
  `username` varchar(255),
  `email` varchar(255),
  `avatar_url` varchar(255),
  `first_name` varchar(255),
  `last_name` varchar(255),
  `blog_description` varchar(255),
  `role_id` integer
);

CREATE TABLE `Role` (
  `id` integer PRIMARY KEY,
  `name` varchar(255)
);

CREATE TABLE `UserPost` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `post_id` integer
);

CREATE TABLE `Favourite` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `post_id` integer
);

CREATE TABLE `Post` (
  `id` integer PRIMARY KEY,
  `title` varchar(255),
  `user_id` integer,
  `status` varchar(255)
);

CREATE TABLE `Ingredient` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `post_id` integer,
  `measurement_id` integer,
  `quantity` integer
);

CREATE TABLE `MeasurmentType` (
  `id` integer PRIMARY KEY,
  `name` varchar(255)
);

CREATE TABLE `Step` (
  `id` integer PRIMARY KEY,
  `post_id` integer,
  `number` integer,
  `body` varchar(255),
  `image_url` varchar(255)
);

ALTER TABLE `Role` ADD FOREIGN KEY (`id`) REFERENCES `User` (`role_id`);

ALTER TABLE `Subscribtion` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

ALTER TABLE `Subscribtion` ADD FOREIGN KEY (`subscriber_id`) REFERENCES `User` (`id`);

ALTER TABLE `UserPost` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

ALTER TABLE `UserPost` ADD FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`);

ALTER TABLE `Favourite` ADD FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`);

ALTER TABLE `Favourite` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

ALTER TABLE `Ingredient` ADD FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`);

ALTER TABLE `Ingredient` ADD FOREIGN KEY (`measurement_id`) REFERENCES `MeasurmentType` (`id`);

ALTER TABLE `Step` ADD FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`);
