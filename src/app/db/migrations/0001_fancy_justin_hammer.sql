CREATE TYPE "public"."status" AS ENUM('todo', 'inprogress', 'done');--> statement-breakpoint
CREATE TABLE "task" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" "status" NOT NULL,
	"duration" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"project_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;