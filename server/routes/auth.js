import express from 'express'
const router = express.Router();

//controllers
//import { ShowMessage ,register} from '../controllers/auth'
import { register , login } from '../controllers/auth'


// 3. donc ce serveur nous donne beaucoup de propriétés et de méthodes qui nous aideront à construire notre serveur
//router.get('/:message', ShowMessage) 
// créez un point de terminaison et assurez-vous que le message n'est pas reçu car nous réenregistrerons les requêtes et les ressources de l'extérieur
router.post("/register",register);
router.post('/login', login);

module.exports = router;
