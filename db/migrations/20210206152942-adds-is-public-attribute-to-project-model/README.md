# Migration `20210206152942-adds-is-public-attribute-to-project-model`

This migration has been generated by Nirmalya Ghosh at 2/6/2021, 8:59:42 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Project" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210206071341-fixes-attribute-naming-in-project-model..20210206152942-adds-is-public-attribute-to-project-model
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
@@ -48,8 +48,9 @@
   updatedAt DateTime @updatedAt
   files     File[]
   team      Team?    @relation(fields: [teamId], references: [id])
   teamId    Int?
+  isPublic  Boolean  @default(false)
 }
 model File {
   id        Int       @id @default(autoincrement())
```


