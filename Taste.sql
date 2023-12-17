CREATE TABLE `Role` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `User` (
  `id` integer PRIMARY KEY,
  `username` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar_url` varchar(255),
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `blog_description` varchar(255),
  `role_id` integer,
  CONSTRAINT `role`
  FOREIGN KEY (`role_id`) REFERENCES `Role` (`id`)
  ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Subscribtion` (
  `id` integer PRIMARY KEY,
  `user_id` integer NOT NULL,
  `subscriber_id` integer,
  CONSTRAINT `subscribtion_in`
  FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
  ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `subscribtion_out`
  FOREIGN KEY (`subscriber_id`) REFERENCES `User` (`id`)
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Post` (
  `id` integer PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `likes` integer NOT NULL,
  `views` integer NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `UserPost` (
  `id` integer PRIMARY KEY,
  `user_id` integer NOT NULL,
  `post_id` integer NOT NULL,
  CONSTRAINT `author`
  FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
  ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `item`
  FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`)
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Favourite` (
  `id` integer PRIMARY KEY,
  `user_id` integer NOT NULL,
  `post_id` integer NOT NULL,
  CONSTRAINT `author_fav`
  FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
  ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `item_fav`
  FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`)
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `MeasurmentType` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `small_name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Ingredient` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `post_id` integer NOT NULL,
  `measurement_id` integer NOT NULL,
  `quantity` integer NOT NULL,
  CONSTRAINT `parent`
  FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`)
  ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `measure`
  FOREIGN KEY (`measurement_id`) REFERENCES `MeasurmentType` (`id`)
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Step` (
  `id` integer PRIMARY KEY,
  `post_id` integer NOT NULL,
  `number` integer NOT NULL,
  `body` varchar(255),
  `image_url` varchar(255),
  CONSTRAINT `step_parent`
  FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`)
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
