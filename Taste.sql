-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Дек 17 2023 г., 14:20
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `taste`
--

-- --------------------------------------------------------

--
-- Структура таблицы `favourite`
--

CREATE TABLE `favourite` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `favourite`
--

INSERT INTO `favourite` (`id`, `user_id`, `post_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 6);

-- --------------------------------------------------------

--
-- Структура таблицы `ingredient`
--

CREATE TABLE `ingredient` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `post_id` int(11) NOT NULL,
  `measurment_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `ingredient`
--

INSERT INTO `ingredient` (`id`, `name`, `post_id`, `measurment_id`, `quantity`) VALUES
(1, 'Пшеничная мука', 1, 1, 500),
(2, 'Говяжий фарш', 1, 1, 500),
(3, 'Лук', 1, 2, 1),
(4, 'Вода', 1, 3, 300),
(5, 'Куриное яйцо', 1, 2, 1),
(6, 'Соль', 1, 4, 2),
(7, 'Молотый чёрный перец', 1, 7, 1),
(8, 'Свинина', 1, 1, 200),
(9, 'Яйцо', 2, 2, 3),
(10, 'Молоко', 2, 3, 100),
(11, 'Соль', 2, 7, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `measurmenttype`
--

CREATE TABLE `measurmenttype` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `small_name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `measurmenttype`
--

INSERT INTO `measurmenttype` (`id`, `name`, `small_name`) VALUES
(1, 'грамм', 'г'),
(2, 'штук', 'шт'),
(3, 'Миллилитр', 'мл'),
(4, 'Чайная ложка', 'ч.л.'),
(5, 'Литр', 'л'),
(6, 'Киллограмм', 'кг'),
(7, 'Щепотка', 'щепотка'),
(8, 'Столовая ложка', 'ст. л'),
(9, 'Стакан', 'ст'),
(10, 'По вкусу', 'по вкусу');

-- --------------------------------------------------------

--
-- Структура таблицы `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `title_image_url` varchar(255) DEFAULT NULL,
  `likes` int(11) NOT NULL DEFAULT 0,
  `views` int(11) NOT NULL DEFAULT 1,
  `time` int(11) DEFAULT NULL,
  `portion` int(11) DEFAULT NULL COMMENT 'koef for ingredient'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `post`
--

INSERT INTO `post` (`id`, `title`, `title_image_url`, `likes`, `views`, `time`, `portion`) VALUES
(1, 'Буузы по-бурятски', NULL, 0, 1, 60, 1),
(2, 'Омлет', NULL, 0, 1, 15, 1),
(5, 'test', 'test', 0, 0, 0, 0),
(6, 'test2', NULL, 0, 1, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'Администратор');

-- --------------------------------------------------------

--
-- Структура таблицы `step`
--

CREATE TABLE `step` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `body` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `step`
--

INSERT INTO `step` (`id`, `post_id`, `number`, `body`, `image_url`) VALUES
(1, 1, 1, 'Делаем тесто', NULL),
(2, 1, 2, 'Делаем фарш', NULL),
(3, 1, 3, 'Лепим епта', NULL),
(4, 1, 4, 'Варим епта', NULL),
(5, 2, 1, 'Яйцо разбиват', NULL),
(6, 2, 2, 'Взбиват', NULL),
(7, 2, 3, 'Молоко добавлят', NULL),
(8, 2, 4, 'Жарум', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `subscribtion`
--

CREATE TABLE `subscribtion` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `subscriber_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `subscribtion`
--

INSERT INTO `subscribtion` (`id`, `user_id`, `subscriber_id`) VALUES
(1, 1, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `blog_description` varchar(255) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `tg` varchar(127) DEFAULT NULL,
  `youtube` varchar(127) DEFAULT NULL,
  `vk` varchar(127) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `avatar_url`, `first_name`, `last_name`, `blog_description`, `role_id`, `tg`, `youtube`, `vk`) VALUES
(1, 'test', 'test@test.com', '$2a$10$hGvmYx0Hi12yHeYiDrJQAep0lBOrND8CXGh0nepLFTf94NyARZKWe', NULL, 'Andrey', 'Ochirov', NULL, 1, NULL, NULL, NULL),
(4, 'test4', 'test3@test.com', '$2a$10$EocWdVke/r2yTuTsADlkqOoUsHNs1PJmdF8/rDLiOwRcv744SLfNW', NULL, 'Andrey', 'Ochirov', NULL, 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `userpost`
--

CREATE TABLE `userpost` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `userpost`
--

INSERT INTO `userpost` (`id`, `user_id`, `post_id`) VALUES
(2, 1, 5),
(3, 4, 2),
(4, 1, 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `favourite`
--
ALTER TABLE `favourite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_fav` (`user_id`),
  ADD KEY `item_fav` (`post_id`);

--
-- Индексы таблицы `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent` (`post_id`),
  ADD KEY `measure` (`measurment_id`);

--
-- Индексы таблицы `measurmenttype`
--
ALTER TABLE `measurmenttype`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `step`
--
ALTER TABLE `step`
  ADD PRIMARY KEY (`id`),
  ADD KEY `step_parent` (`post_id`);

--
-- Индексы таблицы `subscribtion`
--
ALTER TABLE `subscribtion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscribtion_in` (`user_id`),
  ADD KEY `subscribtion_out` (`subscriber_id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role` (`role_id`);

--
-- Индексы таблицы `userpost`
--
ALTER TABLE `userpost`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author` (`user_id`),
  ADD KEY `item` (`post_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `favourite`
--
ALTER TABLE `favourite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `measurmenttype`
--
ALTER TABLE `measurmenttype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `step`
--
ALTER TABLE `step`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `subscribtion`
--
ALTER TABLE `subscribtion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `userpost`
--
ALTER TABLE `userpost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `favourite`
--
ALTER TABLE `favourite`
  ADD CONSTRAINT `author_fav` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `item_fav` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `ingredient`
--
ALTER TABLE `ingredient`
  ADD CONSTRAINT `measure` FOREIGN KEY (`measurment_id`) REFERENCES `measurmenttype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `parent` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `step`
--
ALTER TABLE `step`
  ADD CONSTRAINT `step_parent` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `subscribtion`
--
ALTER TABLE `subscribtion`
  ADD CONSTRAINT `subscribtion_in` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subscribtion_out` FOREIGN KEY (`subscriber_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `userpost`
--
ALTER TABLE `userpost`
  ADD CONSTRAINT `author` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `item` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
