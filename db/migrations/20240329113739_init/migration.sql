-- CreateTable
CREATE TABLE "job_description" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "has_responsibilities" BOOLEAN NOT NULL,
    "has_benefits" BOOLEAN NOT NULL,
    "require_education" BOOLEAN NOT NULL,
    "require_experience" BOOLEAN NOT NULL,
    "is_soft" BOOLEAN NOT NULL,
    "is_tech" BOOLEAN NOT NULL
);
