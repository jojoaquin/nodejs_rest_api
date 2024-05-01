-- CreateTable
CREATE TABLE `books` (
    `id` VARCHAR(100) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `author` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `pages` INTEGER NOT NULL,
    `released_date` DATE NOT NULL,
    `user_id` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
