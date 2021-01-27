# Migration `20210126183016-adds-name-to-project`

This migration has been generated by Nirmalya Ghosh at 1/27/2021, 12:00:16 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Project" ADD COLUMN     "name" TEXT NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210108165653-adds-project-model..20210126183016-adds-name-to-project
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgres"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -38,7 +38,8 @@
 }
 model Project {
   id        Int      @id @default(autoincrement())
+  name      String
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
 }
```

