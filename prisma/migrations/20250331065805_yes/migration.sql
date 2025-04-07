/*
  Warnings:

  - You are about to drop the column `definition` on the `ExecutionPhase` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExecutionPhase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "node" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "inputs" TEXT,
    "outputs" TEXT,
    "creditsConsumed" INTEGER,
    "workflowExecutionId" TEXT NOT NULL,
    CONSTRAINT "ExecutionPhase_workflowExecutionId_fkey" FOREIGN KEY ("workflowExecutionId") REFERENCES "WorkflowExecution" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ExecutionPhase" ("completedAt", "creditsConsumed", "id", "inputs", "name", "node", "number", "outputs", "startedAt", "status", "userId", "workflowExecutionId") SELECT "completedAt", "creditsConsumed", "id", "inputs", "name", "node", "number", "outputs", "startedAt", "status", "userId", "workflowExecutionId" FROM "ExecutionPhase";
DROP TABLE "ExecutionPhase";
ALTER TABLE "new_ExecutionPhase" RENAME TO "ExecutionPhase";
CREATE TABLE "new_WorkflowExecution" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workflowId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "definition" TEXT NOT NULL DEFAULT '{}',
    "creditsConsumed" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "WorkflowExecution_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WorkflowExecution" ("completedAt", "createdAt", "creditsConsumed", "id", "startedAt", "status", "trigger", "userId", "workflowId") SELECT "completedAt", "createdAt", "creditsConsumed", "id", "startedAt", "status", "trigger", "userId", "workflowId" FROM "WorkflowExecution";
DROP TABLE "WorkflowExecution";
ALTER TABLE "new_WorkflowExecution" RENAME TO "WorkflowExecution";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
