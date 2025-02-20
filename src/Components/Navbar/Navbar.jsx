import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { label } from "framer-motion/client";
import { authContext } from "../../contexts/authContext";

export default function MyNav() {
  const {IsLoggedIn,setIsLoggedIn} = useContext(authContext);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    {label:"Home",href:"/"},
    {label:"Catgories",href:"/catgories"},
    {label:"Brands",href:"/brands"},
    {label:"Cart",href:"/cart"},
    {label:"Orders",href:"/allorders"},
    {label:"Wishlist",href:"/Wishlist"},
  ];
  const Navigate = useNavigate();
  function logOut(){
    localStorage.removeItem("Token");
    setIsLoggedIn(false);
    Navigate("/login");
  }
  return (
    <>
    
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className="border border-divider">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">fresh cart</p>
        </NavbarBrand>
      </NavbarContent>

     {IsLoggedIn&&
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="w-full"
              color={
                 "foreground"
              }
              to={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarContent>}
      {IsLoggedIn?
        <NavbarContent justify="end">
        <NavbarItem>
        <Button onPress={logOut} type="button" color="danger" variant="flat">
        Log Out
        </Button>
        </NavbarItem>
      </NavbarContent>
      :
        <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link to="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
        <Button color="primary" variant="flat">
        <Link to="/register">
            Sign Up
           </Link>
        </Button>
        </NavbarItem>
      </NavbarContent>
}

{     IsLoggedIn&&
 <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                 "foreground"
              }
              to={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      }
    </Navbar>
    </>
  )
}
