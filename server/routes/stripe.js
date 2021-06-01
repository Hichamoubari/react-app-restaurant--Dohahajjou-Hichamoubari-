import express from 'express'
const router = express.Router();
//middleware
import { requireSignin } from '../middlewares';

//controllers
//import { ShowMessage ,register} from '../controllers/auth'
import { createConnectAccount , getAccountStatus , getAccountBalance , payoutSetting , stripeSessionId , stripeSuccess, } from '../controllers/stripe'


// 3. so this server gives us a lot of properties and methods which will help us build up our server
//router.get('/:message', ShowMessage) 
// créez un point de terminaison et assurez-vous que le message n'est pas reçu car nous réenregistrerons les requêtes et les ressources de l'extérieur
router.post('/create-connect-account', requireSignin, createConnectAccount);
router.post('/get-account-status', requireSignin, getAccountStatus);
router.post('/get-account-balance', requireSignin, getAccountBalance);
router.post('/payout-setting', requireSignin, payoutSetting);
router.post("/stripe-session-id", requireSignin, stripeSessionId);
// order
router.post("/stripe-success", requireSignin, stripeSuccess);

module.exports = router;