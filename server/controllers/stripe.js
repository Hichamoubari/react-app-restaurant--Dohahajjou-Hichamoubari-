import User from '../models/user'
import Stripe from 'stripe'
import queryString from 'query-string'
import Restaurant from '../models/restaurant'
import Order from "../models/order";

const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req , res) => {
    // 1. trouver un utilisateur à partir de la base de données
    const user = await User.findById(req.user._id).exec();
    console.log("USER ==> ", user);
    // 2. si l'utilisateur n'a pas encore stripe_account_id, créez-le maintenant
     if(!user.stripe_account_id) {
        const account =  await stripe.accounts.create({
         type: 'express',
        });
        console.log("ACCOUNT ==> ",account);
        user.stripe_account_id = account.id ;
        user.save();
    }
    // 3. créer un lien de connexion basé sur l'identifiant du compte (pour que le frontend termine l'intégration)
    let accountLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: process.env.STRIPE_REDIRECT_URL,
        return_url: process.env.STRIPE_REDIRECT_URL,
        type: 'account_onboarding',
    });
    // pré-remplir toutes les informations telles que les e-mails
    accountLink = Object.assign(accountLink ,{
        "stripe_user[email]": user.email || undefined,
    });
    //console.log("ACCOUNT LINK", accountLink);
    let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
    console.log("LOGIN LINK", link)
    res.send(link)
}
const updateDelayDays = async (accountId) => {
    const account = await stripe.accounts.update(accountId,{
        settings: {
            payouts: {
                schedule: {
                    delay_days: 7,
                },
            },
        },
    });
    return account;
};

export  const getAccountStatus = async (req, res) => {
       const user = await User.findById(req.user._id).exec();
       const account = await stripe.accounts.retrieve(user.stripe_account_id);
       //console.log("USER ACCOUNT RETRIEVE", account);
       // update delay days
       const updatedAccount = await updateDelayDays(account.id);
       const updatedUser = await User.findByIdAndUpdate(
           user.id,
           {
               stripe_seller: updatedAccount,
           },
           { new: true }
       ).select("-password").exec();
       //console.log(updatedUser);
       res.json(updatedUser);
};

export const getAccountBalance = async (req, res) => {
    const user = await User.findById(req.user._id).exec();

    try{
        const balance = await stripe.balance.retrieve({
            stripeAccount: user.stripe_account_id,
        });
        //console.log("BALANCE ===>", balance);
        res.json(balance);
    }catch(err) {
        console.log(err);
    }
}

export const payoutSetting = async (req, res) => {

    try{
        const user = await User.findById(req.user._id).exec();

        const loginLink = await stripe.accounts.createLoginLink(user.stripe_account_id ,{
            redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL,
        })
        //console.log("LOGIN LINK FOR PAYOUT SETTING",loginLink);
        res.json(loginLink);
    }
    catch(err){
        console.log("STRIPE PAYOUT SETTING ERR",err);
    }
}






export const stripeSessionId = async (req, res) => {
  // console.log("you hit stripe session id", req.body.hotelId);
  // 1 obtenir l'identifiant de restaurant auprès de req.body
  const { restaurantId } = req.body;
  // 2 trouver restaurant sur la base de l'identifiant de restaurant de db
  const item = await Restaurant.findById(restaurantId).populate("postedBy").exec();
  // 3 20% de frais comme frais de dossier
  const fee = (item.price * 20) / 100;
  // 4 créer une session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // 5 achat des détails de l'article, il sera montré à l'utilisateur lors du paiement
    line_items: [
      {
        name: item.title,
        amount: item.price * 100, // in cents
        currency: "usd",
        quantity: 1,
      },
    ],
    // 6 créer une intention de paiement avec des frais de dossier et des frais de destination de 80%
    payment_intent_data: {
      application_fee_amount: fee * 100,
      // ce vendeur peut voir son solde dans notre tableau de bord frontend
      transfer_data: {
        destination: item.postedBy.stripe_account_id,
      },
    },
    // URL de succès et de calcel
    success_url: `${process.env.STRIPE_SUCCESS_URL}/${item._id}`,
    cancel_url: process.env.STRIPE_CANCEL_URL,
  });

  // 7 ajouter cet objet de session à l'utilisateur dans la base de données
  await User.findByIdAndUpdate(req.user._id, { stripeSession: session }).exec();
  // 8 envoyer l'identifiant de session comme resposne au frontend
  res.send({
    sessionId: session.id,
  });
};


export const stripeSuccess = async (req, res) => {
    try {
        // 1 obtenir l'identifiant de restaurant auprès de req.body
        const { restaurantId } = req.body;
        // 2 trouver l'utilisateur actuellement connecté
        const user = await User.findById(req.user._id).exec();
        // vérifier si l'utilisateur a stripeSession
        if (!user.stripeSession) return;
        // 3 récupérer la session Stripe, en fonction de l'ID de session que nous avons précédemment enregistré dans la base de données de l'utilisateur
        const session = await stripe.checkout.sessions.retrieve(
          user.stripeSession.id
        );
        // 4 si le statut de paiement de la session est payé, créez la commande
        if (session.payment_status === "paid") {
          // 5 vérifier si la commande avec cet identifiant de session existe déjà en interrogeant la collecte des commandes
          const orderExist = await Order.findOne({
            "session.id": session.id,
          }).exec();
          if (orderExist) {
            // 6 si la commande existe, envoyer le succès vrai
            res.json({ success: true });
          } else {
            // 7 sinon créer une nouvelle commande et envoyer le succès vrai
            let newOrder = await new Order({
              restaurant: restaurantId,
              session,
              orderedBy: user._id,
            }).save();
            // 8 supprimer stripeSession de l'utilisateur
            await User.findByIdAndUpdate(user._id, {
              $set: { stripeSession: {} },
            });
            res.json({ success: true });
          }
        }
      } catch (err) {
        console.log("STRIPE SUCCESS ERR", err);
      }
  };
  