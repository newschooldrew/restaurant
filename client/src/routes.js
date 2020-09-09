import ViewMealContainer from "./components/ViewMealContainer/ViewMealContainer";
import EditMealContainer from "./components/EditMealContainer/EditMealContainer";
import DeleteMeal from "./components/DeleteMeal/DeleteMeal";
import InputMeals from "./components/InputMeals/InputMeals";
import EditProfile from "./components/EditProfile/EditProfile";
import ViewProfile from "./components/ViewProfile/ViewProfile";
import AddMeal from "./components/AddMeal/AddMeal";

let routes = [
  {
    collapse: true,
    name: "Profile",
    state: "openPages",
    icon: "now-ui-icons design_image",
    views: [
      {
        path: "/edit-profile",
        name: "Edit Profile",
        icon: "now-ui-icons design_app",
        component: EditProfile,
        layout: "/admin",
      },{
        path: "/view-profile",
        name: "View Profile",
        icon: "now-ui-icons design_app",
        component: ViewProfile,
        layout: "/admin",
      }
    ],
  },    {
    collapse: true,
    name: "Meals",
    state: "openMeals",
    icon: "now-ui-icons design_image",
    views: [
    {
      path: "/add-meal",
      name: "Add Meal",
      icon: "now-ui-icons design_app",
      component: AddMeal,
      layout: "/admin",
    },    
  {
    path: "/view-meal",
    name: "View Meal",
    icon: "now-ui-icons design_app",
    component: ViewMealContainer,
    layout: "/admin",
  },{
    path: "/edit-meal",
    name: "Edit Meals",
    icon: "now-ui-icons design_app",
    component: EditMealContainer,
    layout: "/admin",
  }, {
    path: "/input-meals",
    name: "Input Meals",
    icon: "now-ui-icons design_app",
    component: InputMeals,
    layout: "/admin",
  }]
}
];

export default routes;
