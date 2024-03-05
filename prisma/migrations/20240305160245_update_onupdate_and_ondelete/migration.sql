-- DropForeignKey
ALTER TABLE "component" DROP CONSTRAINT "component_dashboard_id_fkey";

-- DropForeignKey
ALTER TABLE "component" DROP CONSTRAINT "component_model_id_fkey";

-- DropForeignKey
ALTER TABLE "dashboard" DROP CONSTRAINT "dashboard_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "model" DROP CONSTRAINT "model_owner_id_fkey";

-- AlterTable
ALTER TABLE "component" ALTER COLUMN "type" SET DEFAULT 'TEXT';

-- AddForeignKey
ALTER TABLE "dashboard" ADD CONSTRAINT "dashboard_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "component" ADD CONSTRAINT "component_dashboard_id_fkey" FOREIGN KEY ("dashboard_id") REFERENCES "dashboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "component" ADD CONSTRAINT "component_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "model" ADD CONSTRAINT "model_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
