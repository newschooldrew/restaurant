import EditMealContainer from "./components/EditMealContainer/EditMealContainer";
import InputMeals from "./components/InputMeals/InputMeals";
import EditProfile from "./components/EditProfile/EditProfile";

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
        component: EditProfile,
        layout: "/admin",
      }
    ],
  },  {
    path: "/edit-meal",
    name: "Edit Meal",
    icon: "now-ui-icons design_app",
    component: EditMealContainer,
    layout: "/admin",
  }, {
    path: "/input-meals",
    name: "Input Meals",
    icon: "now-ui-icons design_app",
    component: InputMeals,
    layout: "/admin",
  },
];

export default routes;
