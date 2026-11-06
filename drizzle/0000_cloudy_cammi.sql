CREATE TABLE `enquiries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`business` text,
	`phone` text,
	`need` text NOT NULL,
	`message` text NOT NULL,
	`created_at` text NOT NULL
);
