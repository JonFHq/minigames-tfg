// Screens
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Game from '../screens/Game';
import LeaderBoard from '../screens/LeaderBoard';
import Login from '../screens/Login';

// Icons
import { MaterialCommunityIcons, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default [
    {
        name:'Home',
        iconType:MaterialCommunityIcons,
        iconName:'home', 
        component:Home,
    },
    {
        name:'Settings',
        iconType:MaterialIcons,
        iconName:'settings',
        component:Settings,
    },
    {
        name:'Game',
        iconType:MaterialCommunityIcons,
        iconName:'gamepad-square',
        component:Game,
    },
    {
        name:'Leaderboard',
        iconType:MaterialIcons,
        iconName:'leaderboard',
        component:LeaderBoard,
    },
    {
        name:'Change Account',
        iconType:MaterialCommunityIcons,
        iconName:'account-reactivate',
        component:Login,
    },
 ]