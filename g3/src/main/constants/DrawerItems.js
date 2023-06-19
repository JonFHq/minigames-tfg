// Screens
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Game from '../screens/Game';
import LeaderBoard from '../screens/LeaderBoard';
import Login from '../screens/Login';
import Register from '../screens/Register';

// Icons
import { MaterialCommunityIcons, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default [
    {
        name:'Home',
        header: true,
        iconType:MaterialCommunityIcons,
        iconName:'home', 
        component:Home,
    },
    {
        name:'Settings',
        header: true,
        iconType:MaterialIcons,
        iconName:'settings',
        component:Settings,
    },
    {
        name:'Game',
        header: true,
        iconType:MaterialCommunityIcons,
        iconName:'gamepad-square',
        component:Game,
    },
    {
        name:'Leaderboard',
        header: true,
        iconType:MaterialIcons,
        iconName:'leaderboard',
        component:LeaderBoard,
    },
    {
        name:'Change Account',
        header: false,
        iconType:MaterialCommunityIcons,
        iconName:'account-reactivate',
        component:Login,
        style: { marginTop: 'auto' },
        swipeEnabled: false,
    },
    {
        name:'Register',
        header: false,
        iconType:FontAwesome5,
        iconName:'user-plus',
        component:Register,
        style: { display: 'none' },
        swipeEnabled: false,
    },
 ]