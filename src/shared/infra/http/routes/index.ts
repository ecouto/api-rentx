import { Router } from 'express';
import { authenticateRoutes } from '@shared/infra/http/routes/authenticate.routes';

import { categoriesRoutes } from '@shared/infra/http/routes/categories.routes';
import { specificationsRoutes } from '@shared/infra/http/routes/specifications.routes';
import { usersRoutes } from '@shared/infra/http/routes/users.routes';
import { carsRoutes } from '@shared/infra/http/routes/cars.routes';
import { rentalRoutes } from './rental.routes';
import { passwordRoutes } from './password.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use('/cars', carsRoutes);
router.use('/rentals', rentalRoutes);
router.use('/password', passwordRoutes);
router.use(authenticateRoutes);

export { router };