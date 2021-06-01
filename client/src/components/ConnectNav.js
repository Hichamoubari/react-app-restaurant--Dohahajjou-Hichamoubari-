import { useEffect , useState } from 'react'
import { useSelector } from 'react-redux'
import { Card , Avatar ,Badge } from 'antd'
import moment from 'moment'
import { getAccountBalance ,currencyFormatter , payoutSetting} from '../actions/stripe'
import { SettingOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
const { Meta } = Card;
const {Ribbon} = Badge;
const ConnectNav = () => {
    const [loading , setloading] = useState(false);
    const [balance, setBalance] = useState(0);
    const {auth} = useSelector((state) => ({...state}));
    const {user , token} = auth;

    useEffect(() => {
      getAccountBalance(auth.token).then((res) => {
          setBalance(res.data);
      });        
    }, []);
    const handlePayoutSettings = async () => {
    setloading(true);
    try{
      const res = await payoutSetting(token);
      //console.log("RES FOR PAYOUT SETTING LINK", res);
      window.location.href = res.data.url
      setloading(false);
    }catch(err){
        console.log(err);
        setloading(false);
        toast.error("unable to acces to settinng , try again");
    } 
    }

    return (

        <div className="d-flex justify-content-around" >
            {/*<Card className="bg-dark">
                <Meta avatar={<Avatar className="bg-danger">{user.name[0]}</Avatar>} title={<p className="text-white">{user.name}</p>} description={<p className="text-white">{`Joined ${moment(user.createdAt).fromNow()}`}</p>} />
            </Card>*/}
            {auth && auth.user && auth.user.stripe_seller && (
                <>
                   <Ribbon text="Avaliable" className="bg-danger" style={{top:'-109px'}}>
                      <Card className="bg-dark pt-1 text-white" style={{top: '-120px' , height: '72px' , padding: '0px'}}>
                          {balance && balance.pending && balance.pending.map((ba ,i) => (
                              <span key={i} className="lead">
                                {currencyFormatter(ba)}
                              </span>
                          ))}
                      </Card>
                   </Ribbon>
                   {/*<Ribbon text="Payouts" className="bg-danger">
                        <Card  onClick={handlePayoutSettings} className="bg-dark text-white pointer">
                            <SettingOutlined  className="h5 pt-2" />
                        </Card>
                   </Ribbon>*/}
                </>
            )}

        </div>
    )
}

export default ConnectNav;