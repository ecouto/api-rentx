import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/createSpecificationController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";



const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post('/', ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

export { specificationsRoutes }