CREATE TABLE `Subscribtion` (
  `id` integer PRIMARY KEY,
  `user_id` integer NOT NULL,
  `subscriber_id` integer
);

CREATE TABLE `User` (
  `id` integer PRIMARY KEY,
  `username` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `avatar_url` varchar(255),
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `blog_description` varchar(255),
  `role_id` integer NOT NULL
);

CREATE TABLE `Role` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) NOT NULL
);

CREATE TABLE `UserPost` (
  `id` integer PRIMARY KEY,
  `user_id` integer NOT NULL,
  `post_id` integer NOT NULL
);

CREATE TABLE `Favourite` (
  `id` integer PRIMARY KEY,
  `user_id` integer NOT NULL,
  `post_id` integer NOT NULL
);

CREATE TABLE `Post` (
  `id` integer PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `likes` integer NOT NULL,
  `views` integer NOT NULL
);

CREATE TABLE `Ingredient` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `post_id` integer NOT NULL,
  `measurement_id` integer NOT NULL,
  `quantity` integer NOT NULL
);

CREATE TABLE `MeasurmentType` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `small_name` varchar(10) NOT NULL
);

CREATE TABLE `Step` (
  `id` integer PRIMARY KEY,
  `post_id` integer NOT NULL,
  `number` integer NOT NULL,
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
