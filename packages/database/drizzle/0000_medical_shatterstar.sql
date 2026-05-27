CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(40) NOT NULL,
	"last_name" varchar(40),
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false,
	"hashed_password" text,
	"salt" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
