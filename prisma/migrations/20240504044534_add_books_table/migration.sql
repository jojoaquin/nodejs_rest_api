-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `token` VARCHAR(100) NULL,
    `expired_at` BIGINT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `books` (
    `id` VARCHAR(100) NOT NULL,
    `user_id` VARCHAR(100) NULL,
    `last_borrowed_at` DATETIME NULL,
    `image` VARCHAR(100) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `author` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `pages` INTEGER NOT NULL,
    `released_date` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
