import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/listCategoriesController";
import { Router } from "express";
import multer from 'multer';
import { ensureAdmin } from '../middlewares/ensureAdmin';



const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp'
});

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post('/', ensureAuthenticated, ensureAdmin, createCategoryController.handle);

categoriesRoutes.get('/', listCategoryController.handle);

categoriesRoutes.post('/import', ensureAuthenticated, ensureAdmin, upload.single('file'), importCategoryController.handle);


export { categoriesRoutes };