import Homepage from "../Homepage"
import Login from "../Login"
import Admin from '../Admin'
import Student from '../Student'
import Teacher from '../Teacher'
import Dashboard from '../Dashboard'
import Gteachers from "../Gteachers"
import Gstudent from "../Gstudent"
import Gpromos from "../Gpromos"
import Gniveaus from "../Gniveaus"
import Gmodule from "../Gmodule"
import ModuleDetail from "../ModuleDetail"
import ChapiterDetail from "../ChapiterDetail"
import ForgotPassword from "../ForgotPassword"
import DashboardTeacher from "../Teacher/DashboardTeacher"
import Course from "../Teacher/Course"
import Moocs from "../Teacher/Moocs"
import Resources from "../Teacher/Resources"
import Quizze from "../Teacher/Quizze"
import Assignment from "../Teacher/Assignment"
import Inbox from "../Teacher/Inbox"
import HomePageStudent from "../HomePageStudent"
export const routesConfig = {
    public :[
        {path:'/',element:<Homepage/>},
        {path:'/Login',element:<Login/>},
        {path:'/forgot-password',element:<ForgotPassword/>}
    ],
    admin:[
        {path:'/admin',element:<Admin/>, children: [
        {path:'Dashboard',element:<Dashboard/>},
        {path:'Gteachers',element:<Gteachers/>},
        {path:'Gstudents',element:<Gstudent/>},
        {path:'Gpromo',element:<Gpromos/>},
        {path:'Gniveau',element:<Gniveaus/>},
        {path:'Gmodule',element:<Gmodule/>}
    ]}
    ],
    student:[
        {path:'/student',element:<Student/>, children:[
            {path:'Home',element:<HomePageStudent/>},
            {path:'module/:id',element:<ModuleDetail/>},
            {path:'chapiter/:id',element:<ChapiterDetail/>}
        ]}
    ],
    teacher:[
        {path:'/teacher',element:<Teacher/>, children:[
            {path:'Dashboard',element:<DashboardTeacher/>},
            {path:'Course',element:<Course/>},
            {path:'Moocs',element:<Moocs/>},
            {path:'Resources',element:<Resources/>},
            {path:'Quizze',element:<Quizze/>},
            {path:'Assignment',element:<Assignment/>},
            {path:'Inbox',element:<Inbox/>}
        ]}
    ]
}